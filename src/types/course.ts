export type QuestStatus = 'locked' | 'unlocked' | 'in_progress' | 'completed';

export type QuestType = 'lesson' | 'checkpoint' | 'final_review' | 'project';

export interface QuizOption {
  id: string;
  text_id: string;
  text_en: string;
  is_correct: boolean;
}

export interface QuizQuestion {
  id: string;
  question_id: string;
  question_en: string;
  type: 'multiple_choice' | 'drag_drop' | 'interactive';
  options: QuizOption[];
  explanation_id?: string;
  explanation_en?: string;
}

export interface Quest {
  id: string;
  level_id: string;
  module_id: string;
  order: number;
  type: QuestType;
  title_id: string;
  title_en: string;
  description_id: string;
  description_en: string;
  content_id?: string;
  content_en?: string;
  xp_reward: number;
  source_references?: string[];
  quiz_questions?: QuizQuestion[];
}

export interface Module {
  id: string;
  level_id: string;
  order: number;
  title_id: string;
  title_en: string;
  description_id: string;
  description_en: string;
  quests: Quest[];
}

export interface Level {
  id: string;
  order: number;
  emoji: string;
  title_id: string;
  title_en: string;
  theme_id: string;
  theme_en: string;
  badge_name_id: string;
  badge_name_en: string;
  badge_icon: string;
  modules: Module[];
}

export interface UserProfile {
  id: string;
  username: string;
  avatar_url?: string;
  xp: number;
  streak_count: number;
  last_active_date: string;
  preferred_lang: 'id' | 'en';
}

export interface UserProgress {
  user_id: string;
  quest_id: string;
  status: QuestStatus;
  quiz_score?: number;
  completed_at?: string;
}

export interface UserBadge {
  user_id: string;
  level_id: string;
  earned_at: string;
}
