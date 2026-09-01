import { createClient } from '@supabase/supabase-js';
import { courseData } from '../src/data/courseData';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// Use service role key for seeding (admin access bypasses RLS)
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('🚀 Seeding ODYSSEY database...\n');

  // 1. Insert levels
  console.log('📚 Inserting levels...');
  for (const level of courseData) {
    const { error } = await supabase.from('levels').upsert({
      id: level.id,
      order: level.order,
      emoji: level.emoji,
      title_id: level.title_id,
      title_en: level.title_en,
      theme_id: level.theme_id,
      theme_en: level.theme_en,
      badge_name_id: level.badge_name_id,
      badge_name_en: level.badge_name_en,
      badge_icon: level.badge_icon
    }, { onConflict: 'id' });

    if (error) {
      console.error(`  ❌ Error inserting level ${level.id}:`, error.message);
    } else {
      console.log(`  ✅ Level ${level.emoji} ${level.title_en}`);
    }
  }

  // 2. Insert modules
  console.log('\n📦 Inserting modules...');
  for (const level of courseData) {
    for (const mod of level.modules) {
      const { error } = await supabase.from('modules').upsert({
        id: mod.id,
        level_id: mod.level_id,
        order: mod.order,
        title_id: mod.title_id,
        title_en: mod.title_en,
        description_id: mod.description_id,
        description_en: mod.description_en
      }, { onConflict: 'id' });

      if (error) {
        console.error(`  ❌ Error inserting module ${mod.id}:`, error.message);
      } else {
        console.log(`  ✅ Module ${mod.order}: ${mod.title_en}`);
      }
    }
  }

  // 3. Insert quests
  console.log('\n⚔️  Inserting quests...');
  for (const level of courseData) {
    for (const mod of level.modules) {
      for (const quest of mod.quests) {
        const { error } = await supabase.from('quests').upsert({
          id: quest.id,
          level_id: quest.level_id,
          module_id: quest.module_id,
          order: quest.order,
          type: quest.type,
          title_id: quest.title_id,
          title_en: quest.title_en,
          description_id: quest.description_id,
          description_en: quest.description_en,
          content_id: quest.content_id,
          content_en: quest.content_en,
          xp_reward: quest.xp_reward,
          source_references: quest.source_references ?? []
        }, { onConflict: 'id' });

        if (error) {
          console.error(`  ❌ Error inserting quest ${quest.id}:`, error.message);
        } else {
          console.log(`  ✅ Quest ${quest.order}: ${quest.title_en}`);
        }
      }
    }
  }

  // 4. Insert quiz questions and options
  console.log('\n📝 Inserting quiz questions & options...');
  for (const level of courseData) {
    for (const mod of level.modules) {
      for (const quest of mod.quests) {
        if (!quest.quiz_questions) continue;

        for (let qi = 0; qi < quest.quiz_questions.length; qi++) {
          const q = quest.quiz_questions[qi];
          const questionId = `${quest.id}-q${qi + 1}`;

          const { error: qError } = await supabase.from('quiz_questions').upsert({
            id: questionId,
            quest_id: quest.id,
            question_id: q.question_id,
            question_en: q.question_en,
            type: q.type,
            explanation_id: q.explanation_id,
            explanation_en: q.explanation_en,
            order: qi + 1
          }, { onConflict: 'id' });

          if (qError) {
            console.error(`  ❌ Error inserting question ${questionId}:`, qError.message);
            continue;
          }

          console.log(`  ✅ Question ${qi + 1} for ${quest.title_en}`);

          // Insert options
          for (let oi = 0; oi < q.options.length; oi++) {
            const opt = q.options[oi];
            const optionId = `${questionId}-opt${oi + 1}`;

            const { error: oError } = await supabase.from('quiz_options').upsert({
              id: optionId,
              question_id: questionId,
              text_id: opt.text_id,
              text_en: opt.text_en,
              is_correct: opt.is_correct,
              order: oi + 1
            }, { onConflict: 'id' });

            if (oError) {
              console.error(`  ❌ Error inserting option ${optionId}:`, oError.message);
            }
          }
        }
      }
    }
  }

  console.log('\n🎉 Seed complete!');
  console.log('   Course data is now live in your Supabase database.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
