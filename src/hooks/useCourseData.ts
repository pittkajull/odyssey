import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { courseData } from '../data/courseData';
import type { Level, Module, Quest, QuizQuestion } from '../types/course';

interface CourseDataState {
  levels: Level[];
  loading: boolean;
  error: string | null;
  source: 'supabase' | 'local';
}

export function useCourseData(): CourseDataState {
  const [state, setState] = useState<CourseDataState>({
    levels: [],
    loading: true,
    error: null,
    source: 'local'
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchCourseData() {
      try {
        // Try fetching from Supabase
        const { data: levels, error: levelsError } = await supabase
          .from('levels')
          .select('*')
          .order('order');

        if (levelsError || !levels || levels.length === 0) {
          // Fallback to local data
          if (!cancelled) {
            setState({
              levels: courseData,
              loading: false,
              error: null,
              source: 'local'
            });
          }
          return;
        }

        // Fetch modules for each level
        const levelsWithModules: Level[] = await Promise.all(
          levels.map(async (level) => {
            const { data: modules } = await supabase
              .from('modules')
              .select('*')
              .eq('level_id', level.id)
              .order('order');

            const modulesWithQuests: Module[] = await Promise.all(
              (modules ?? []).map(async (mod) => {
                const { data: quests } = await supabase
                  .from('quests')
                  .select('*')
                  .eq('module_id', mod.id)
                  .order('order');

                const questsWithQuiz: Quest[] = await Promise.all(
                  (quests ?? []).map(async (quest) => {
                    const { data: questions } = await supabase
                      .from('quiz_questions')
                      .select('*')
                      .eq('quest_id', quest.id)
                      .order('order');

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

                    return {
                      id: quest.id,
                      level_id: quest.level_id,
                      module_id: quest.module_id,
                      order: quest.order,
                      type: quest.type as Quest['type'],
                      title_id: quest.title_id,
                      title_en: quest.title_en,
                      description_id: quest.description_id,
                      description_en: quest.description_en,
                      content_id: quest.content_id,
                      content_en: quest.content_en,
                      xp_reward: quest.xp_reward,
                      source_references: quest.source_references,
                      quiz_questions: questionsWithOpts.length > 0 ? questionsWithOpts : undefined
                    };
                  })
                );

                return {
                  id: mod.id,
                  level_id: mod.level_id,
                  order: mod.order,
                  title_id: mod.title_id,
                  title_en: mod.title_en,
                  description_id: mod.description_id,
                  description_en: mod.description_en,
                  quests: questsWithQuiz
                };
              })
            );

            return {
              id: level.id,
              order: level.order,
              emoji: level.emoji,
              title_id: level.title_id,
              title_en: level.title_en,
              theme_id: level.theme_id,
              theme_en: level.theme_en,
              badge_name_id: level.badge_name_id,
              badge_name_en: level.badge_name_en,
              badge_icon: level.badge_icon,
              modules: modulesWithQuests
            };
          })
        );

        if (!cancelled) {
          setState({
            levels: levelsWithModules,
            loading: false,
            error: null,
            source: 'supabase'
          });
        }
      } catch (err) {
        // Fallback to local data on any error
        if (!cancelled) {
          setState({
            levels: courseData,
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to fetch from Supabase',
            source: 'local'
          });
        }
      }
    }

    fetchCourseData();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
