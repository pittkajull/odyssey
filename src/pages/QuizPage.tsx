import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { useCourseData } from '../hooks/useCourseData';

interface QuizOption {
  id: string;
  text_id: string;
  text_en: string;
  is_correct: boolean;
}

interface QuizQuestion {
  id: string;
  question_id: string;
  question_en: string;
  type: string;
  explanation_id?: string;
  explanation_en?: string;
  options: QuizOption[];
}

interface QuizData {
  questId: string;
  titleId: string;
  titleEn: string;
  xpReward: number;
  questions: QuizQuestion[];
}

interface Answer {
  questionId: string;
  optionId: string;
  isCorrect: boolean;
}

export function QuizPage() {
  const { questId } = useParams<{ questId: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';
  const { user, refreshProfile } = useAuth();
  const { levels } = useCourseData();

  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [elapsed, setElapsed] = useState(0);

  // Fetch quiz data
  useEffect(() => {
    if (!questId) return;

    async function fetchQuiz() {
      // Get quest info
      const { data: quest } = await supabase
        .from('quests')
        .select('*')
        .eq('id', questId)
        .single();

      if (!quest) {
        setLoading(false);
        return;
      }

      // Get questions
      const { data: questions } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('quest_id', questId)
        .order('order');

      // Get options for each question
      const questionsWithOpts: QuizQuestion[] = await Promise.all(
        (questions ?? []).map(async (q) => {
          const { data: options } = await supabase
            .from('quiz_options')
            .select('*')
            .eq('question_id', q.id)
            .order('order');

          return {
            id: q.id,
            question_id: q.question_id,
            question_en: q.question_en,
            type: q.type,
            explanation_id: q.explanation_id,
            explanation_en: q.explanation_en,
            options: (options ?? []).map((o) => ({
              id: o.id,
              text_id: o.text_id,
              text_en: o.text_en,
              is_correct: o.is_correct
            }))
          };
        })
      );

      setQuiz({
        questId: quest.id,
        titleId: quest.title_id,
        titleEn: quest.title_en,
        xpReward: quest.xp_reward,
        questions: questionsWithOpts
      });
      setLoading(false);
    }

    fetchQuiz();
  }, [questId]);

  // Timer
  useEffect(() => {
    if (phase !== 'quiz') return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [phase]);

  const handleStart = () => {
    setPhase('quiz');
    setCurrentQ(0);
    setAnswers([]);
    setElapsed(0);
  };

  const handleSelect = (optionId: string) => {
    if (showExplanation) return;
    setSelected(optionId);
  };

  const handleSubmit = () => {
    if (!selected || !quiz) return;

    const q = quiz.questions[currentQ];
    const opt = q.options.find((o) => o.id === selected);
    const isCorrect = opt?.is_correct ?? false;

    setAnswers([...answers, { questionId: q.id, optionId: selected, isCorrect }]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (!quiz) return;
    setSelected(null);
    setShowExplanation(false);

    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setPhase('result');
      saveResult();
    }
  };

  const saveResult = async () => {
    if (!quiz || !user) return;

    const correct = answers.filter((a) => a.isCorrect).length;
    const score = Math.round((correct / quiz.questions.length) * 100);

    // Save progress
    await supabase.from('user_progress').upsert({
      user_id: user.id,
      quest_id: quiz.questId,
      status: 'completed',
      quiz_score: score,
      completed_at: new Date().toISOString()
    }, { onConflict: 'user_id,quest_id' });

    // Add XP
    const { data: prof } = await supabase.from('profiles').select('xp').eq('id', user.id).single();
    if (prof) {
      await supabase.from('profiles').update({ xp: prof.xp + quiz.xpReward }).eq('id', user.id);
    }

    // Update streak
    const today = new Date().toISOString().split('T')[0];
    const { data: profile } = await supabase.from('profiles').select('streak_count, last_active_date').eq('id', user.id).single();
    if (profile) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      let newStreak = profile.streak_count;
      if (profile.last_active_date === today) {
        // already active
      } else if (profile.last_active_date === yesterday) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
      await supabase.from('profiles').update({ streak_count: newStreak, last_active_date: today }).eq('id', user.id);
    }

    // Unlock next quest
    const allQuests = levels.flatMap((l) => l.modules.flatMap((m) => m.quests));
    const idx = allQuests.findIndex((q) => q.id === quiz.questId);
    if (idx < allQuests.length - 1) {
      const next = allQuests[idx + 1];
      await supabase.from('user_progress').upsert({
        user_id: user.id,
        quest_id: next.id,
        status: 'unlocked'
      }, { onConflict: 'user_id,quest_id' });
    }

    // Check badge
    const quest = allQuests.find((q) => q.id === quiz.questId);
    if (quest?.level_id) {
      const level = levels.find((l) => l.id === quest.level_id);
      if (level) {
        const lvlQuests = level.modules.flatMap((m) => m.quests.map((q) => q.id));
        const { data: prog } = await supabase.from('user_progress').select('quest_id, status').eq('user_id', user.id);
        const completedIds = (prog ?? []).filter((p) => p.status === 'completed').map((p) => p.quest_id);
        const allDone = lvlQuests.every((id) => completedIds.includes(id));
        if (allDone && lvlQuests.length > 0) {
          await supabase.from('user_badges').upsert({
            user_id: user.id,
            level_id: quest.level_id,
            earned_at: new Date().toISOString()
          }, { onConflict: 'user_id,level_id' });
        }
      }
    }

    await refreshProfile();
  };

  const getScore = () => {
    if (!quiz) return 0;
    const correct = answers.filter((a) => a.isCorrect).length;
    return Math.round((correct / quiz.questions.length) * 100);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className="text-5xl mb-4" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>📝</motion.div>
          <p className="text-odyssey-muted font-mono text-sm">Loading quiz...</p>
        </motion.div>
      </div>
    );
  }

  if (!quiz || quiz.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🤔</div>
          <h2 className="text-xl font-bold text-odyssey-text mb-2">No questions available</h2>
          <p className="text-odyssey-muted text-sm mb-4">This quiz doesn&apos;t have any questions yet.</p>
          <button onClick={() => navigate('/')} className="px-4 py-2 rounded-xl bg-odyssey-accent text-odyssey-bg font-semibold text-sm">
            Back to Journey
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Intro Phase */}
        {phase === 'intro' && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="text-7xl mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              🎯
            </motion.div>
            <h1 className="text-3xl font-bold font-display text-odyssey-text mb-2">
              {lang === 'en' ? quiz.titleEn : quiz.titleId}
            </h1>
            <p className="text-odyssey-muted mb-6">
              {quiz.questions.length} {lang === 'en' ? 'questions' : 'pertanyaan'} · +{quiz.xpReward} XP
            </p>

            <div className="bg-odyssey-panel border border-odyssey-border rounded-2xl p-6 mb-8 text-left">
              <h3 className="text-sm font-mono uppercase text-odyssey-muted mb-3">
                {lang === 'en' ? 'Before you start' : 'Sebelum mulai'}
              </h3>
              <ul className="space-y-2 text-sm text-odyssey-text/80">
                <li className="flex items-start gap-2">
                  <span className="text-odyssey-accent mt-0.5">✓</span>
                  {lang === 'en' ? 'Read each question carefully' : 'Baca setiap pertanyaan dengan teliti'}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-odyssey-accent mt-0.5">✓</span>
                  {lang === 'en' ? 'Select one answer per question' : 'Pilih satu jawaban per pertanyaan'}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-odyssey-accent mt-0.5">✓</span>
                  {lang === 'en' ? 'Review explanations after each answer' : 'Tinjau penjelasan setelah setiap jawaban'}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-odyssey-accent mt-0.5">✓</span>
                  {lang === 'en' ? 'Score 70%+ to earn full XP' : 'Skor 70%+ untuk mendapatkan XP penuh'}
                </li>
              </ul>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 rounded-xl border border-odyssey-border text-odyssey-muted text-sm hover:border-odyssey-text transition-colors"
              >
                {lang === 'en' ? 'Back' : 'Kembali'}
              </button>
              <button
                onClick={handleStart}
                className="px-8 py-3 rounded-xl bg-odyssey-accent text-odyssey-bg font-bold text-sm hover:brightness-110 transition-all"
              >
                {lang === 'en' ? 'Start Quiz' : 'Mulai Quiz'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Quiz Phase */}
        {phase === 'quiz' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigate(-1)}
                className="text-odyssey-muted hover:text-odyssey-text text-sm"
              >
                ✕ {lang === 'en' ? 'Quit' : 'Keluar'}
              </button>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-odyssey-muted">⏱ {formatTime(elapsed)}</span>
                <span className="text-xs font-mono text-odyssey-gold">
                  {currentQ + 1}/{quiz.questions.length}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-odyssey-bg rounded-full overflow-hidden mb-8">
              <motion.div
                className="h-full bg-odyssey-accent rounded-full"
                animate={{ width: `${((currentQ) / quiz.questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-odyssey-panel border border-odyssey-border rounded-2xl p-6 mb-6">
                  <p className="text-[10px] font-mono uppercase text-odyssey-muted mb-3">
                    {lang === 'en' ? 'Question' : 'Pertanyaan'} {currentQ + 1}
                  </p>
                  <h2 className="text-lg font-semibold leading-relaxed">
                    {lang === 'en' ? quiz.questions[currentQ].question_en : quiz.questions[currentQ].question_id}
                  </h2>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {quiz.questions[currentQ].options.map((opt) => {
                    const isSelected = selected === opt.id;
                    const answered = showExplanation;
                    const isCorrect = opt.is_correct;

                    let style = 'bg-odyssey-bg border-odyssey-border hover:border-odyssey-muted';
                    if (answered && isCorrect) style = 'bg-odyssey-accent/10 border-odyssey-accent';
                    else if (answered && isSelected && !isCorrect) style = 'bg-odyssey-coral/10 border-odyssey-coral';
                    else if (isSelected) style = 'bg-odyssey-panel-light border-odyssey-accent';

                    return (
                      <motion.button
                        key={opt.id}
                        onClick={() => handleSelect(opt.id)}
                        disabled={showExplanation}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${style}`}
                        whileHover={!showExplanation ? { scale: 1.01 } : {}}
                        whileTap={!showExplanation ? { scale: 0.99 } : {}}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-mono shrink-0">
                            {opt.id.toUpperCase()}
                          </span>
                          <span className="text-sm flex-1">{lang === 'en' ? opt.text_en : opt.text_id}</span>
                          {answered && isCorrect && <span className="text-odyssey-accent text-lg">✓</span>}
                          {answered && isSelected && !isCorrect && <span className="text-odyssey-coral text-lg">✗</span>}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      className="p-5 rounded-xl bg-odyssey-panel-light border border-odyssey-border mb-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p className="text-xs font-mono uppercase text-odyssey-muted mb-2">
                        {t('explanation')}
                      </p>
                      <p className="text-sm text-odyssey-text/90 leading-relaxed">
                        {lang === 'en'
                          ? quiz.questions[currentQ].explanation_en
                          : quiz.questions[currentQ].explanation_id}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  {!showExplanation && selected && (
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-3 rounded-xl bg-odyssey-accent text-odyssey-bg font-bold text-sm hover:brightness-110 transition-all"
                    >
                      {t('submit_answer')}
                    </button>
                  )}
                  {showExplanation && (
                    <button
                      onClick={handleNext}
                      className="px-6 py-3 rounded-xl bg-odyssey-accent text-odyssey-bg font-bold text-sm hover:brightness-110 transition-all"
                    >
                      {currentQ < quiz.questions.length - 1 ? t('next_question') : t('finish')}
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Result Phase */}
        {phase === 'result' && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="text-8xl mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.2 }}
            >
              {getScore() >= 70 ? '🎉' : '📚'}
            </motion.div>

            <h2 className="text-3xl font-bold font-display text-odyssey-accent mb-2">
              {i18n.t('quiz_complete')}
            </h2>

            <motion.div
              className="text-6xl font-mono font-bold text-odyssey-gold my-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {getScore()}%
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex justify-center gap-8 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-odyssey-accent">
                  {answers.filter((a) => a.isCorrect).length}
                </div>
                <div className="text-[10px] font-mono text-odyssey-muted uppercase">
                  {lang === 'en' ? 'Correct' : 'Benar'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-odyssey-coral">
                  {answers.filter((a) => !a.isCorrect).length}
                </div>
                <div className="text-[10px] font-mono text-odyssey-muted uppercase">
                  {lang === 'en' ? 'Wrong' : 'Salah'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-odyssey-gold">
                  {formatTime(elapsed)}
                </div>
                <div className="text-[10px] font-mono text-odyssey-muted uppercase">
                  {lang === 'en' ? 'Time' : 'Waktu'}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="text-sm text-odyssey-accent font-mono mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              +{quiz.xpReward} {i18n.t('xp_earned')}
            </motion.div>

            {/* Answer review */}
            <motion.div
              className="bg-odyssey-panel border border-odyssey-border rounded-2xl p-6 mb-8 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <h3 className="text-sm font-mono uppercase text-odyssey-muted mb-4">
                {lang === 'en' ? 'Answer Review' : 'Tinjauan Jawaban'}
              </h3>
              <div className="space-y-3">
                {quiz.questions.map((q, i) => {
                  const ans = answers[i];
                  return (
                    <div key={q.id} className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                        ans?.isCorrect ? 'bg-odyssey-accent/20 text-odyssey-accent' : 'bg-odyssey-coral/20 text-odyssey-coral'
                      }`}>
                        {ans?.isCorrect ? '✓' : '✗'}
                      </span>
                      <p className="text-xs text-odyssey-text/70 leading-relaxed">
                        {lang === 'en' ? q.question_en : q.question_id}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* XP earned */}
              <motion.div
                className="mt-8 p-4 rounded-xl bg-odyssey-accent/10 border border-odyssey-accent/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-odyssey-gold font-mono font-bold">+{quiz.xpReward} {i18n.t('xp_earned')}</span>
              </motion.div>

              {/* Actions */}
              <motion.div
                className="mt-8 flex gap-3 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <button
                  onClick={() => navigate('/')}
                  className="px-8 py-3 rounded-xl bg-odyssey-accent text-odyssey-bg font-bold text-sm hover:brightness-110 transition-all"
                >
                  {lang === 'en' ? 'Back to Journey' : 'Kembali ke Perjalanan'}
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
