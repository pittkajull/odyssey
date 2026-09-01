import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { Quest } from '../types/course';
import { CompassRoseFull, Treasure } from './MapIllustrations';

interface QuestModalProps {
  quest: Quest;
  onClose: () => void;
  onComplete: (questId: string, score?: number) => void;
}

export function QuestModal({ quest, onClose, onComplete }: QuestModalProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  const [currentStep, setCurrentStep] = useState<'content' | 'quiz' | 'result'>('content');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [showXpPopup, setShowXpPopup] = useState(false);

  const content = lang === 'en' ? quest.content_en : quest.content_id;
  const hasQuiz = quest.quiz_questions && quest.quiz_questions.length > 0;
  const isCheckpoint = quest.type === 'checkpoint' || quest.type === 'final_review';

  // Track reading progress
  useEffect(() => {
    const el = contentRef.current;
    if (!el || currentStep !== 'content') return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const progress = Math.min((scrollTop / (scrollHeight - clientHeight)) * 100, 100);
      setReadingProgress(progress);
      if (progress > 85) {
        setShowComplete(true);
      }
    };

    el.addEventListener('scroll', handleScroll);
    // If content is short, show complete immediately
    if (el.scrollHeight <= el.clientHeight + 20) {
      setShowComplete(true);
    }
    return () => el.removeEventListener('scroll', handleScroll);
  }, [currentStep]);

  const handleComplete = async () => {
    setIsCompleting(true);
    setShowXpPopup(true);
    // Delay to show XP animation
    setTimeout(() => {
      onComplete(quest.id);
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 600);
  };

  const handleStartQuiz = () => {
    if (isCheckpoint && hasQuiz) {
      navigate(`/quiz/${quest.id}`);
      onClose();
      return;
    }
    if (hasQuiz) {
      setCurrentStep('quiz');
      setCurrentQuestion(0);
      setSelectedAnswer(null);
    }
  };

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswer(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !quest.quiz_questions) return;
    const question = quest.quiz_questions[currentQuestion];
    setAnswers({ ...answers, [question.id]: selectedAnswer });
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (!quest.quiz_questions) return;
    setSelectedAnswer(null);
    setShowExplanation(false);

    if (currentQuestion < quest.quiz_questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const correctAnswers = quest.quiz_questions.filter((q) => {
        const selectedOption = q.options.find((o) => o.id === answers[q.id]);
        return selectedOption?.is_correct;
      }).length;
      const score = Math.round((correctAnswers / quest.quiz_questions.length) * 100);
      setCurrentStep('result');
      onComplete(quest.id, score);
    }
  };

  const getScore = () => {
    if (!quest.quiz_questions) return 0;
    const correctAnswers = quest.quiz_questions.filter((q) => {
      const selectedOption = q.options.find((o) => o.id === answers[q.id]);
      return selectedOption?.is_correct;
    }).length;
    return Math.round((correctAnswers / quest.quiz_questions.length) * 100);
  };

  // Render content with proper formatting
  const renderContent = () => {
    if (!content) return <p className="text-[var(--color-ink-muted)] italic">Konten belum tersedia.</p>;

    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-xl font-display font-bold mt-8 mb-3 text-[var(--color-ocean)] italic border-b border-[var(--color-ocean)]/10 pb-2">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-lg font-display font-semibold mt-6 mb-2 text-[var(--color-ink)]">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('> 💡')) {
        elements.push(
          <div key={i} className="my-4 p-4 bg-[var(--color-ocean)]/5 border-l-3 border-[var(--color-ocean)] rounded-r-sm">
            <p className="text-sm text-[var(--color-ocean)] font-body leading-relaxed">
              <span className="font-bold">💡</span> {line.replace('> 💡 ', '')}
            </p>
          </div>
        );
      } else if (line.startsWith('> ⚠️')) {
        elements.push(
          <div key={i} className="my-4 p-4 bg-[var(--color-stamp-red)]/5 border-l-3 border-[var(--color-stamp-red)] rounded-r-sm">
            <p className="text-sm text-[var(--color-stamp-red)] font-body leading-relaxed">
              <span className="font-bold">⚠️</span> {line.replace('> ⚠️ ', '')}
            </p>
          </div>
        );
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={i} className="my-3 pl-4 border-l-2 border-[var(--color-ink-faded)] text-[var(--color-ink-muted)] italic font-body text-sm">
            {line.replace('> ', '')}
          </blockquote>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={i} className="ml-5 list-disc text-[var(--color-ink-light)] font-body text-sm leading-relaxed py-0.5">
            {line.replace('- ', '')}
          </li>
        );
      } else if (line.startsWith('```')) {
        // Skip code fences
        continue;
      } else if (line.startsWith('|') && !line.startsWith('|---')) {
        const cells = line.split('|').filter(Boolean).map((c) => c.trim());
        elements.push(
          <div key={i} className="grid grid-cols-2 gap-px my-2 bg-[var(--color-ink-faded)]/10 border border-[var(--color-ink-faded)]/15 rounded-sm overflow-hidden">
            {cells.map((cell, j) => (
              <div key={j} className={`px-3 py-2 text-xs ${j === 0 ? 'bg-[var(--color-parchment)] text-[var(--color-ink-muted)] font-handwritten' : 'bg-[var(--color-parchment-light)] text-[var(--color-ink)] font-body'}`}>
                {cell}
              </div>
            ))}
          </div>
        );
      } else if (line.trim() === '') {
        elements.push(<div key={i} className="h-3" />);
      } else {
        elements.push(
          <p key={i} className="text-[15px] leading-[1.75] text-[var(--color-ink-light)] font-body my-1.5">
            {line}
          </p>
        );
      }
    }

    return elements;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-[var(--color-ink)]/50 backdrop-blur-sm"
          onClick={!isCompleting ? onClose : undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-3xl h-[90vh] sm:h-[85vh] bg-[var(--color-parchment-light)] border-2 border-[var(--color-ink-faded)]/30 rounded-sm overflow-hidden flex flex-col"
          style={{
            boxShadow: '4px 6px 24px rgba(44, 24, 16, 0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
          }}
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
        >
          {/* Header with reading progress */}
          <div className="relative border-b border-[var(--color-ink-faded)]/15 bg-[var(--color-parchment)]">
            {/* Reading progress bar */}
            {currentStep === 'content' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-ink-faded)]/10">
                <motion.div
                  className="h-full bg-[var(--color-ocean)]"
                  style={{ width: `${readingProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            )}

            <div className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3 min-w-0">
                {/* Type badge */}
                <div className={`shrink-0 w-8 h-8 rounded-sm flex items-center justify-center ${
                  quest.type === 'checkpoint' ? 'bg-[var(--color-ocean)]/10 text-[var(--color-ocean)]' :
                  quest.type === 'final_review' ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)]' :
                  'bg-[var(--color-sepia)]/10 text-[var(--color-sepia)]'
                }`}>
                  {quest.type === 'checkpoint' || quest.type === 'final_review' ? (
                    <CompassRoseFull size={20} />
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="font-display text-base sm:text-lg text-[var(--color-ink)] italic truncate">
                    {lang === 'en' ? quest.title_en : quest.title_id}
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-handwritten text-[9px] text-[var(--color-gold)]">
                      +{quest.xp_reward} XP
                    </span>
                    <span className="font-handwritten text-[8px] text-[var(--color-ink-muted)] uppercase">
                      {quest.type === 'checkpoint' ? 'Quiz' : quest.type === 'final_review' ? 'Final Review' : 'Lesson'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={!isCompleting ? onClose : undefined}
                className="shrink-0 w-8 h-8 rounded-sm flex items-center justify-center text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-parchment-dark)]/50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content area */}
          <div
            ref={contentRef}
            className="flex-1 overflow-y-auto px-5 sm:px-8 py-6"
          >
            {currentStep === 'content' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
              >
                {renderContent()}
              </motion.div>
            )}

            {currentStep === 'quiz' && quest.quiz_questions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
              >
                {/* Quiz progress */}
                <div className="mb-8">
                  <div className="flex justify-between font-handwritten text-[10px] text-[var(--color-ink-muted)] mb-2">
                    <span>Pertanyaan {currentQuestion + 1} / {quest.quiz_questions.length}</span>
                    <span>{Math.round(((currentQuestion) / quest.quiz_questions.length) * 100)}%</span>
                  </div>
                  <div className="trail-track h-1.5">
                    <motion.div
                      className="trail-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion) / quest.quiz_questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                {(() => {
                  const q = quest.quiz_questions[currentQuestion];
                  return (
                    <>
                      <h3 className="text-lg font-display italic mb-6 text-[var(--color-ink)] leading-relaxed">
                        {lang === 'en' ? q.question_en : q.question_id}
                      </h3>

                      <div className="space-y-3">
                        {q.options.map((option, oi) => {
                          const isSelected = selectedAnswer === option.id;
                          const isAnswered = showExplanation;
                          const isCorrect = option.is_correct;

                          const labels = ['A', 'B', 'C', 'D'];

                          let baseStyle = 'bg-[var(--color-parchment)] border-[var(--color-ink-faded)]/20 hover:border-[var(--color-ink-muted)]/40 hover:bg-[var(--color-parchment-dark)]/30';
                          if (isAnswered && isCorrect) {
                            baseStyle = 'bg-[var(--color-stamp-green)]/8 border-[var(--color-stamp-green)]/40';
                          } else if (isAnswered && isSelected && !isCorrect) {
                            baseStyle = 'bg-[var(--color-stamp-red)]/5 border-[var(--color-stamp-red)]/30';
                          } else if (isSelected) {
                            baseStyle = 'bg-[var(--color-ocean)]/8 border-[var(--color-ocean)]/40';
                          }

                          return (
                            <button
                              key={option.id}
                              onClick={() => !showExplanation && handleAnswerSelect(option.id)}
                              disabled={showExplanation}
                              className={`w-full p-4 rounded-sm border-2 text-left transition-all duration-200 ${baseStyle}`}
                            >
                              <div className="flex items-start gap-3">
                                <span className={`shrink-0 w-7 h-7 rounded-sm flex items-center justify-center text-xs font-handwritten border ${
                                  isAnswered && isCorrect ? 'border-[var(--color-stamp-green)] text-[var(--color-stamp-green)] bg-[var(--color-stamp-green)]/10' :
                                  isAnswered && isSelected && !isCorrect ? 'border-[var(--color-stamp-red)] text-[var(--color-stamp-red)] bg-[var(--color-stamp-red)]/10' :
                                  isSelected ? 'border-[var(--color-ocean)] text-[var(--color-ocean)] bg-[var(--color-ocean)]/10' :
                                  'border-[var(--color-ink-faded)]/30 text-[var(--color-ink-muted)]'
                                }`}>
                                  {labels[oi]}
                                </span>
                                <span className="text-sm font-body text-[var(--color-ink)] leading-relaxed pt-0.5">
                                  {lang === 'en' ? option.text_en : option.text_id}
                                </span>
                                {isAnswered && isCorrect && (
                                  <span className="ml-auto shrink-0 text-[var(--color-stamp-green)] text-lg">✓</span>
                                )}
                                {isAnswered && isSelected && !isCorrect && (
                                  <span className="ml-auto shrink-0 text-[var(--color-stamp-red)] text-lg">✗</span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      {showExplanation && q.explanation_id && (
                        <motion.div
                          className="mt-6 p-5 rounded-sm border border-[var(--color-ink-faded)]/15 bg-[var(--color-parchment)]"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              selectedAnswer && q.options.find(o => o.id === selectedAnswer)?.is_correct
                                ? 'bg-[var(--color-stamp-green)]/15 text-[var(--color-stamp-green)]'
                                : 'bg-[var(--color-stamp-red)]/10 text-[var(--color-stamp-red)]'
                            }`}>
                              {selectedAnswer && q.options.find(o => o.id === selectedAnswer)?.is_correct ? '✓' : '✗'}
                            </div>
                            <span className="font-handwritten text-[10px] uppercase tracking-wider text-[var(--color-ink-muted)]">
                              Penjelasan
                            </span>
                          </div>
                          <p className="text-sm text-[var(--color-ink-light)] font-body leading-relaxed">
                            {lang === 'en' ? q.explanation_en : q.explanation_id}
                          </p>
                        </motion.div>
                      )}
                    </>
                  );
                })()}
              </motion.div>
            )}

            {currentStep === 'result' && (
              <motion.div
                className="flex flex-col items-center text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.2 }}
                >
                  <Treasure size={80} className="text-[var(--color-gold)] mb-6" />
                </motion.div>
                <h2 className="text-2xl font-display italic text-[var(--color-ink)] mb-3">
                  Kuis Selesai!
                </h2>
                <div className="text-5xl font-handwritten font-bold text-[var(--color-gold)] mb-3">
                  {getScore()}%
                </div>
                <p className="text-[var(--color-ink-muted)] font-body mb-2">
                  {getScore() >= 70 ? 'Bagus! Kamu sudah menguasai materi ini.' : 'Terus belajar, kamu pasti bisa!'}
                </p>
                <div className="font-handwritten text-sm text-[var(--color-gold)] mt-4">
                  +{quest.xp_reward} XP
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-[var(--color-ink-faded)]/15 bg-[var(--color-parchment)] px-5 py-3">
            {currentStep === 'content' && (
              <div className="flex items-center justify-between">
                <button
                  onClick={onClose}
                  className="btn-parchment text-xs"
                >
                  Tutup
                </button>

                <div className="flex items-center gap-3">
                  {/* Checkpoint → go to quiz page */}
                  {isCheckpoint && hasQuiz && (
                    <button
                      onClick={handleStartQuiz}
                      className="btn-adventure text-xs"
                    >
                      Mulai Kuis →
                    </button>
                  )}

                  {/* Lesson → complete button */}
                  {!isCheckpoint && (
                    <AnimatePresence mode="wait">
                      {showComplete ? (
                        <motion.button
                          key="complete"
                          onClick={handleComplete}
                          disabled={isCompleting}
                          className="btn-adventure text-xs relative overflow-hidden"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                        >
                          {isCompleting ? (
                            <span className="flex items-center gap-2">
                              <motion.div
                                className="w-4 h-4 border-2 border-[var(--color-parchment)]/30 border-t-[var(--color-parchment)] rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                              />
                              Selesai...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              Tandai Selesai
                            </span>
                          )}
                        </motion.button>
                      ) : (
                        <motion.div
                          key="scroll"
                          className="flex items-center gap-2 text-[var(--color-ink-muted)]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div className="w-16 h-1 bg-[var(--color-ink-faded)]/15 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[var(--color-ocean)]/40 rounded-full transition-all duration-300"
                              style={{ width: `${readingProgress}%` }}
                            />
                          </div>
                          <span className="font-handwritten text-[9px]">Gulir ke bawah</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </div>
            )}

            {currentStep === 'quiz' && !showExplanation && selectedAnswer && (
              <div className="flex justify-end">
                <button onClick={handleSubmitAnswer} className="btn-adventure text-xs">
                  Jawab
                </button>
              </div>
            )}

            {currentStep === 'quiz' && showExplanation && (
              <div className="flex justify-end">
                <button onClick={handleNextQuestion} className="btn-adventure text-xs">
                  {currentQuestion < (quest.quiz_questions?.length ?? 0) - 1 ? 'Pertanyaan Berikutnya →' : 'Selesai'}
                </button>
              </div>
            )}

            {currentStep === 'result' && (
              <div className="flex justify-end">
                <button onClick={onClose} className="btn-adventure text-xs">
                  Kembali ke Peta
                </button>
              </div>
            )}
          </div>

          {/* XP Popup Animation */}
          <AnimatePresence>
            {showXpPopup && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: [0, 1, 1, 0], y: [20, -10, -20, -40], scale: [0.8, 1.1, 1, 0.9] }}
                  transition={{ duration: 1.2, times: [0, 0.2, 0.7, 1] }}
                >
                  <div className="bg-[var(--color-gold)] text-[var(--color-parchment)] px-6 py-3 rounded-sm font-handwritten text-xl font-bold shadow-lg"
                    style={{ boxShadow: '0 4px 20px rgba(184, 134, 11, 0.4)' }}
                  >
                    +{quest.xp_reward} XP
                  </div>
                </motion.div>

                {/* Confetti particles */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: ['var(--color-gold)', 'var(--color-ocean)', 'var(--color-stamp-green)', 'var(--color-stamp-red)'][i % 4],
                    }}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: (Math.random() - 0.5) * 200,
                      y: (Math.random() - 0.5) * 200 - 50,
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.1 + Math.random() * 0.3,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
