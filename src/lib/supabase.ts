import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. ' +
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

export const supabase = createClient(
  supabaseUrl ?? '',
  supabaseAnonKey ?? ''
);

// ============================================
// Profile helpers
// ============================================

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: {
  username?: string;
  preferred_lang?: 'id' | 'en';
}) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// Course data helpers (public read-only)
// ============================================

export async function getLevels() {
  const { data, error } = await supabase
    .from('levels')
    .select('*')
    .order('order');

  if (error) throw error;
  return data;
}

export async function getModulesForLevel(levelId: string) {
  const { data, error } = await supabase
    .from('modules')
    .select('*')
    .eq('level_id', levelId)
    .order('order');

  if (error) throw error;
  return data;
}

export async function getQuestsForModule(moduleId: string) {
  const { data, error } = await supabase
    .from('quests')
    .select('*')
    .eq('module_id', moduleId)
    .order('order');

  if (error) throw error;
  return data;
}

export async function getQuizForQuest(questId: string) {
  const { data: questions, error: qError } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('quest_id', questId)
    .order('order');

  if (qError) throw qError;

  // Fetch options for each question
  const questionsWithOptions = await Promise.all(
    (questions ?? []).map(async (q) => {
      const { data: options, error: oError } = await supabase
        .from('quiz_options')
        .select('*')
        .eq('question_id', q.id)
        .order('order');

      if (oError) throw oError;
      return { ...q, options: options ?? [] };
    })
  );

  return questionsWithOptions;
}

// ============================================
// User progress helpers
// ============================================

export async function getUserProgress(userId: string) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data;
}

export async function upsertProgress(userId: string, questId: string, status: string, quizScore?: number) {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      quest_id: questId,
      status,
      quiz_score: quizScore,
      completed_at: status === 'completed' ? new Date().toISOString() : null
    }, { onConflict: 'user_id,quest_id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// User badges helpers
// ============================================

export async function getUserBadges(userId: string) {
  const { data, error } = await supabase
    .from('user_badges')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data;
}

export async function awardBadge(userId: string, levelId: string) {
  const { data, error } = await supabase
    .from('user_badges')
    .upsert({
      user_id: userId,
      level_id: levelId,
      earned_at: new Date().toISOString()
    }, { onConflict: 'user_id,level_id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// Streak helpers
// ============================================

export async function updateStreak(userId: string) {
  // Get current profile
  const profile = await getProfile(userId);
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  let newStreak = profile.streak_count;

  if (profile.last_active_date === today) {
    // Already active today, no change
    return profile;
  } else if (profile.last_active_date === yesterday) {
    // Active yesterday, increment streak
    newStreak += 1;
  } else {
    // Missed a day, reset streak
    newStreak = 1;
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({
      streak_count: newStreak,
      last_active_date: today
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
