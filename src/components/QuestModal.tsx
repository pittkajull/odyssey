import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { Quest } from '../types/course';

interface Props {
  quest: Quest;
  onClose: () => void;
  onComplete: (questId: string, score?: number) => void;
}

export function QuestModal({ quest, onClose, onComplete }: Props) {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';
  const [step, setStep] = useState<'info' | 'quiz' | 'done'>('info');
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const content = lang === 'en' ? quest.content_en : quest.content_id;
  const hasQuiz = quest.quiz_questions && quest.quiz_questions.length > 0;
  const isCP = quest.type === 'checkpoint' || quest.type === 'final_review';

  const handleStart = () => {
    if (isCP && hasQuiz) { window.location.href = `/quiz/${quest.id}`; return; }
    if (hasQuiz) setStep('quiz');
    else onComplete(quest.id);
  };

  const handleAnswer = (optId: string, _correct: boolean) => {
    setSelected(optId);
    setShowFeedback(true);
    setAnswers(a => ({ ...a, [quest.quiz_questions![currentQ].id]: optId }));
  };

  const handleNext = () => {
    setSelected(null);
    setShowFeedback(false);
    if (currentQ < (quest.quiz_questions?.length ?? 0) - 1) {
      setCurrentQ(c => c + 1);
    } else {
      const correct = quest.quiz_questions!.filter(q => {
        const opt = q.options.find(o => o.id === answers[q.id]);
        return opt?.is_correct;
      }).length;
      setScore(Math.round((correct / quest.quiz_questions!.length) * 100));
      setStep('done');
    }
  };

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-sheet"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-sheet__icon">{isCP ? '🎯' : '📘'}</div>
        <h3 className="modal-sheet__title">{lang === 'en' ? quest.title_en : quest.title_id}</h3>
        <p className="modal-sheet__desc">
          {content ? content.split('\n').filter(l => l.trim() && !l.startsWith('#')).slice(0, 2).join(' ') : 'Materi belum tersedia.'}
        </p>
        <div className="modal-sheet__meta">
          <span>⭐ +{quest.xp_reward} XP</span>
          <span>{isCP ? 'Quiz' : 'Pelajaran'}</span>
        </div>

        {step === 'quiz' && quest.quiz_questions && (
          <div className="quiz-box">
            <p className="quiz-box__q">
              {lang === 'en' ? quest.quiz_questions[currentQ].question_en : quest.quiz_questions[currentQ].question_id}
            </p>
            {quest.quiz_questions[currentQ].options.map(opt => {
              const isSel = selected === opt.id;
              const isCorrect = opt.is_correct;
              let cls = 'quiz-box__opt';
              if (showFeedback && isSel) cls += isCorrect ? ' quiz-box__opt--correct' : ' quiz-box__opt--wrong';
              if (showFeedback && isCorrect) cls += ' quiz-box__opt--correct';
              return (
                <button key={opt.id} className={cls} disabled={showFeedback}
                  onClick={() => !showFeedback && handleAnswer(opt.id, isCorrect)}>
                  {lang === 'en' ? opt.text_en : opt.text_id}
                </button>
              );
            })}
            {showFeedback && (
              <p className="mt-2 text-xs font-bold" style={{ color: selected && quest.quiz_questions[currentQ].options.find(o => o.id === selected)?.is_correct ? 'var(--island-green)' : 'var(--flag)' }}>
                {selected && quest.quiz_questions[currentQ].options.find(o => o.id === selected)?.is_correct ? 'Tepat sekali! 🎉' : 'Belum tepat, coba lagi ya.'}
              </p>
            )}
          </div>
        )}

        {step === 'done' && (
          <div className="text-center py-4">
            <div className="text-4xl mb-2">🎉</div>
            <div className="font-display font-extrabold text-2xl" style={{ color: 'var(--gold)' }}>{score}%</div>
            <p className="text-sm mt-1" style={{ color: 'var(--ink-soft)' }}>
              {score >= 70 ? 'Bagus! Kamu sudah menguasai materi ini.' : 'Terus belajar, kamu pasti bisa!'}
            </p>
          </div>
        )}

        <div className="btn-row">
          <button className="btn btn--ghost" onClick={onClose}>
            {step === 'quiz' ? 'Kembali' : 'Nanti dulu'}
          </button>
          {step === 'info' && (
            <button className="btn btn--primary" onClick={handleStart}>
              {isCP && hasQuiz ? 'Mulai Quiz' : 'Mulai belajar'}
            </button>
          )}
          {step === 'quiz' && showFeedback && (
            <button className="btn btn--primary" onClick={handleNext}>
              {currentQ < (quest.quiz_questions?.length ?? 0) - 1 ? 'Berikutnya →' : 'Selesai'}
            </button>
          )}
          {step === 'done' && (
            <button className="btn btn--primary" onClick={() => onComplete(quest.id, score)}>
              Selesai ✓
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
