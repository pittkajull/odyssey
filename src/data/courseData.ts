import type { Level } from '../types/course';

export const courseData: Level[] = [
  // =============================================
  // BASIC — Getting to Know AI (20 quests)
  // =============================================
  {
    id: 'basic',
    order: 1,
    emoji: '🌱',
    title_id: 'Dasar',
    title_en: 'Basic',
    theme_id: 'Mengenal AI',
    theme_en: 'Getting to Know AI',
    badge_name_id: 'Penjelajah AI',
    badge_name_en: 'AI Explorer',
    badge_icon: '🔍',
    modules: [
      {
        id: 'basic-m1',
        level_id: 'basic',
        order: 1,
        title_id: 'Fundamental AI',
        title_en: 'AI Fundamentals',
        description_id: 'Pelajari dasar-dasar apa itu AI dan mengapa ini penting.',
        description_en: 'Learn the fundamentals of what AI is and why it matters.',
        quests: [
          {
            id: 'basic-m1-q1',
            level_id: 'basic',
            module_id: 'basic-m1',
            order: 1,
            type: 'lesson',
            title_id: 'Apa itu Kecerdasan Buatan?',
            title_en: 'What is Artificial Intelligence?',
            description_id: 'Mengenal definisi dan ruang lingkup AI.',
            description_en: 'Understanding the definition and scope of AI.',
            content_id: '**Kecerdasan Buatan (AI)** adalah bidang ilmu komputer yang berusaha membuat mesin dapat melakukan tugas yang biasanya membutuhkan kecerdasan manusia.\n\n## Contoh AI dalam Kehidupan Sehari-hari\n- **Asisten virtual** seperti Siri, Google Assistant\n- **Rekomendasi konten** di Netflix, Spotify, YouTube\n- **Filter spam** di email\n- **Kecerdasan buatan untuk mengemudi** (self-driving cars)\n\n## Tiga Kategori Utama AI\n\n### 1. Narrow AI (AI Sempit)\nAI yang dirancang untuk tugas spesifik. Ini adalah bentuk AI yang paling kita kenal saat ini.\n\n### 2. General AI (AI Umum)\nAI yang memiliki kemampuan kognitif setara manusia. Belum ada yang benar-benar terwujud.\n\n### 3. Super AI\nKonsep teoretis di mana AI melampaui kemampuan manusia dalam semua aspek. Masih fiksi ilmiah.\n\n> Yang perlu diingat: Saat ini semua AI yang kita gunakan adalah Narrow AI.',
            content_en: '**Artificial Intelligence (AI)** is a field of computer science that seeks to create machines capable of performing tasks that typically require human intelligence.\n\n## Examples of AI in Everyday Life\n- **Virtual assistants** like Siri, Google Assistant\n- **Content recommendations** on Netflix, Spotify, YouTube\n- **Spam filtering** in email\n- **Self-driving car AI**\n\n## Three Main Categories of AI\n\n### 1. Narrow AI\nAI designed for specific tasks. This is the most common form of AI today.\n\n### 2. General AI\nAI with cognitive abilities comparable to humans. None has truly materialized yet.\n\n### 3. Super AI\nA theoretical concept where AI surpasses human capabilities in all aspects. Still science fiction.\n\n> Key takeaway: Currently, all AI we use is Narrow AI.',
            xp_reward: 20,
            source_references: ['Elements of AI (University of Helsinki)', 'Google AI Essentials']
          },
          {
            id: 'basic-m1-q2',
            level_id: 'basic',
            module_id: 'basic-m1',
            order: 2,
            type: 'lesson',
            title_id: 'AI vs Machine Learning vs Deep Learning',
            title_en: 'AI vs Machine Learning vs Deep Learning',
            description_id: 'Memahami perbedaan antara AI, ML, dan DL.',
            description_en: 'Understanding the differences between AI, ML, and DL.',
            content_id: 'Banyak orang menggunakan istilah AI, Machine Learning, dan Deep Learning secara bergantian. Padahal ketiganya berbeda.\n\n## Hubungan Ketiganya\n- **AI** adalah payung besar — semua upaya membuat mesin "pintar"\n- **Machine Learning** adalah subset dari AI — mesin belajar dari data\n- **Deep Learning** adalah subset dari ML — belajar menggunakan jaringan saraf yang dalam\n\n> Yang perlu diingat: Semua Deep Learning adalah Machine Learning, tetapi tidak semua Machine Learning adalah Deep Learning.',
            content_en: 'Many people use AI, Machine Learning, and Deep Learning interchangeably. In reality, they have different meanings.\n\n## How They Relate\n- **AI** is the big umbrella — all efforts to make machines "smart"\n- **Machine Learning** is a subset of AI — machines learn from data\n- **Deep Learning** is a subset of ML — learning using deep neural networks\n\n> Key takeaway: All Deep Learning is Machine Learning, but not all Machine Learning is Deep Learning.',
            xp_reward: 20,
            source_references: ['Elements of AI (University of Helsinki)', 'DeepLearning.AI (Andrew Ng)']
          },
          {
            id: 'basic-m1-q3',
            level_id: 'basic',
            module_id: 'basic-m1',
            order: 3,
            type: 'lesson',
            title_id: 'Sejarah Singkat AI',
            title_en: 'A Brief History of AI',
            description_id: 'Dari Turing Test hingga boom ChatGPT.',
            description_en: 'From the Turing Test to the ChatGPT boom.',
            content_id: '### Timeline\n- **1950** — Turing Test: Alan Turing menanyakan "Bisakah mesin berpikir?"\n- **1956** — Kelahiran AI: John McCarthy menciptakan istilah "Artificial Intelligence"\n- **1997** — Deep Blue: IBM mengalahkan juara catur Garry Kasparov\n- **2012** — Deep Learning Menerobos: AlexNet memenangkan ImageNet\n- **2017** — Transformer: Google menerbitkan "Attention Is All You Need"\n- **2022** — ChatGPT: OpenAI merilis ChatGPT, 100 juta pengguna dalam 2 bulan\n\n> Yang perlu diingat: AI sudah ada sejak 1950-an, tetapi baru meledak karena data besar, GPU, dan Transformer.',
            content_en: '### Timeline\n- **1950** — Turing Test: Alan Turing asks "Can machines think?"\n- **1956** — Birth of AI: John McCarthy coins "Artificial Intelligence"\n- **1997** — Deep Blue: IBM defeats chess champion Garry Kasparov\n- **2012** — Deep Learning Breakthrough: AlexNet wins ImageNet\n- **2017** — Transformer: Google publishes "Attention Is All You Need"\n- **2022** — ChatGPT: OpenAI releases ChatGPT, 100M users in 2 months\n\n> Key takeaway: AI has existed since the 1950s, but only exploded due to big data, GPUs, and Transformers.',
            xp_reward: 20,
            source_references: ['Stanford CS229', 'IBM Research']
          },
          {
            id: 'basic-m1-q4',
            level_id: 'basic',
            module_id: 'basic-m1',
            order: 4,
            type: 'checkpoint',
            title_id: '🎯 Checkpoint: Spot the AI',
            title_en: '🎯 Checkpoint: Spot the AI',
            description_id: 'Uji pemahamanmu tentang AI!',
            description_en: 'Test your understanding of AI!',
            content_id: 'Jawab pertanyaan berikut.',
            content_en: 'Answer the following questions.',
            xp_reward: 40,
            quiz_questions: [
              {
                id: 'basic-m1-q4-1',
                question_id: 'Netflix memberikan rekomendasi film berdasarkan riwayat tontonanmu. Ini termasuk kategori AI apa?',
                question_en: 'Netflix recommends movies based on your watch history. What category of AI is this?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'General AI', text_en: 'General AI', is_correct: false },
                  { id: 'b', text_id: 'Narrow AI', text_en: 'Narrow AI', is_correct: true },
                  { id: 'c', text_id: 'Super AI', text_en: 'Super AI', is_correct: false }
                ],
                explanation_id: 'Benar! Netflix rekomendasi adalah Narrow AI — dirancang untuk satu tugas spesifik.',
                explanation_en: 'Correct! Netflix recommendations are Narrow AI — designed for one specific task.'
              },
              {
                id: 'basic-m1-q4-2',
                question_id: 'Apa yang menjadi fondasi dari semua LLM modern seperti ChatGPT?',
                question_en: 'What is the foundation of all modern LLMs like ChatGPT?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Decision Trees', text_en: 'Decision Trees', is_correct: false },
                  { id: 'b', text_id: 'Transformer Architecture', text_en: 'Transformer Architecture', is_correct: true },
                  { id: 'c', text_id: 'Linear Regression', text_en: 'Linear Regression', is_correct: false }
                ],
                explanation_id: 'Tepat! Arsitektur Transformer dari makalah "Attention Is All You Need" 2017.',
                explanation_en: 'Correct! The Transformer architecture from the 2017 "Attention Is All You Need" paper.'
              }
            ]
          }
        ]
      },
      {
        id: 'basic-m2',
        level_id: 'basic',
        order: 2,
        title_id: 'Cara AI "Belajar"',
        title_en: 'How AI "Learns"',
        description_id: 'Memahami bagaimana AI memproses data dan membuat prediksi.',
        description_en: 'Understanding how AI processes data and makes predictions.',
        quests: [
          {
            id: 'basic-m2-q1',
            level_id: 'basic',
            module_id: 'basic-m2',
            order: 1,
            type: 'lesson',
            title_id: 'Data dan Mengapa AI Membutuhkannya',
            title_en: 'Data & Why AI Needs It',
            description_id: 'Data adalah bahan bakar AI.',
            description_en: 'Data is the fuel of AI.',
            content_id: 'AI belajar dari **data**.\n\n## Apa itu Data?\n- **Teks:** artikel, chat, review produk\n- **Gambar:** foto, scan dokumen\n- **Angka:** harga saham, suhu\n- **Suara:** rekaman percakapan\n\n> "Garbage in, garbage out." Data yang berkualitas menghasilkan AI yang berkualitas.',
            content_en: 'AI learns from **data**.\n\n## What is Data?\n- **Text:** articles, chats, reviews\n- **Images:** photos, document scans\n- **Numbers:** stock prices, temperatures\n- **Audio:** conversation recordings\n\n> "Garbage in, garbage out." Quality data produces quality AI.',
            xp_reward: 20,
            source_references: ['Elements of AI (University of Helsinki)']
          },
          {
            id: 'basic-m2-q2',
            level_id: 'basic',
            module_id: 'basic-m2',
            order: 2,
            type: 'lesson',
            title_id: 'Konsep Training',
            title_en: 'The Concept of Training',
            description_id: 'Bagaimana AI belajar dari data.',
            description_en: 'How AI learns from data.',
            content_id: '**Training** adalah proses di mana AI belajar dari data.\n\n### Tahapan Training\n1. **Siapkan Data** — kumpulkan data relevan\n2. **Beri Label** — untuk supervised learning\n3. **Mulai Training** — AI mencoba membuat prediksi\n4. **Koreksi Diri** — setiap kali salah, AI menyesuaikan parameter\n5. **Ulangi** — hingga cukup akurat\n\n> Training adalah proses iteratif — AI mencoba, gagal, belajar, dan mengulang.',
            content_en: '**Training** is the process where AI learns from data.\n\n### Training Steps\n1. **Prepare Data** — collect relevant data\n2. **Label** — for supervised learning\n3. **Start Training** — AI tries to make predictions\n4. **Self-Correction** — AI adjusts parameters when wrong\n5. **Repeat** — until accurate enough\n\n> Training is iterative — AI tries, fails, learns, and repeats.',
            xp_reward: 20,
            source_references: ['DeepLearning.AI (Andrew Ng)']
          },
          {
            id: 'basic-m2-q3',
            level_id: 'basic',
            module_id: 'basic-m2',
            order: 3,
            type: 'lesson',
            title_id: 'Model, Prediksi, dan Error',
            title_en: 'Model, Prediction, and Error',
            description_id: 'Apa itu model AI dan bagaimana cara mengukur performanya.',
            description_en: 'What is an AI model and how to measure its performance.',
            content_id: 'Tiga konsep kunci: **Model**, **Prediksi**, dan **Error**.\n\n- **Model** = hasil dari training — "otak kecil" yang sudah terlatih\n- **Prediksi** = output yang dihasilkan model\n- **Error** = selisih antara prediksi dan jawaban benar\n\n> Tujuannya: minimize error.',
            content_en: 'Three key concepts: **Model**, **Prediction**, and **Error**.\n\n- **Model** = result of training — a trained mini-brain\n- **Prediction** = output produced by the model\n- **Error** = difference between prediction and correct answer\n\n> Goal: minimize error.',
            xp_reward: 20,
            source_references: ['Elements of AI (University of Helsinki)']
          },
          {
            id: 'basic-m2-q4',
            level_id: 'basic',
            module_id: 'basic-m2',
            order: 4,
            type: 'checkpoint',
            title_id: '🎯 Checkpoint: Prediction Practice',
            title_en: '🎯 Checkpoint: Prediction Practice',
            description_id: 'Latihan interaktif tentang prediksi AI.',
            description_en: 'Interactive exercise about AI predictions.',
            content_id: 'Jawab pertanyaan berikut.',
            content_en: 'Answer the following questions.',
            xp_reward: 40,
            quiz_questions: [
              {
                id: 'basic-m2-q4-1',
                question_id: 'Istilah "garbage in, garbage out" merujuk pada apa?',
                question_en: 'What does "garbage in, garbage out" refer to?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Kualitas data input menentukan kualitas output AI', text_en: 'Quality of data input determines AI output quality', is_correct: true },
                  { id: 'b', text_id: 'AI hanya bisa memproses data sampah', text_en: 'AI can only process garbage data', is_correct: false },
                  { id: 'c', text_id: 'Data harus dibuang setelah training', text_en: 'Data should be discarded after training', is_correct: false }
                ],
                explanation_id: 'Benar! Jika data input berkualitas buruk, hasil AI juga buruk.',
                explanation_en: 'Correct! If data input is poor quality, AI results will also be poor.'
              },
              {
                id: 'basic-m2-q4-2',
                question_id: 'Apa yang terjadi ketika model AI membuat prediksi yang salah?',
                question_en: 'What happens when an AI model makes a wrong prediction?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Model menyesuaikan parameter internalnya', text_en: 'The model adjusts its internal parameters', is_correct: true },
                  { id: 'b', text_id: 'Training dihentikan', text_en: 'Training is stopped', is_correct: false },
                  { id: 'c', text_id: 'Model dihapus', text_en: 'The model is deleted', is_correct: false }
                ],
                explanation_id: 'Tepat! Setiap kesalahan membuat model belajar.',
                explanation_en: 'Correct! Every mistake makes the model learn.'
              }
            ]
          }
        ]
      },
      {
        id: 'basic-m3',
        level_id: 'basic',
        order: 3,
        title_id: 'Large Language Models',
        title_en: 'Large Language Models',
        description_id: 'Mengenal LLM — mesin di balik ChatGPT, Claude, dan Gemini.',
        description_en: 'Meet LLMs — the engines behind ChatGPT, Claude, and Gemini.',
        quests: [
          {
            id: 'basic-m3-q1',
            level_id: 'basic',
            module_id: 'basic-m3',
            order: 1,
            type: 'lesson',
            title_id: 'Apa itu LLM?',
            title_en: 'What is an LLM?',
            description_id: 'Mengenal Large Language Model dan perbedaannya dengan AI "biasa".',
            description_en: 'Understanding LLMs and how they differ from "regular" AI.',
            content_id: '**Large Language Model (LLM)** adalah AI yang dilatih pada data teks dalam skala sangat besar untuk memahami dan menghasilkan bahasa manusia.\n\n### Perbedaan dengan AI Biasa\n- AI biasa: dirancang untuk satu tugas (misal deteksi spam)\n- LLM: bisa melakukan banyak tugas berbasis bahasa\n\n### Contoh LLM\n- **ChatGPT** (OpenAI)\n- **Claude** (Anthropic)\n- **Gemini** (Google)\n\n> LLM bukan "otak" — mereka adalah pola statistik yang sangat kompleks.',
            content_en: '**Large Language Models (LLMs)** are AIs trained on massive text data to understand and generate human language.\n\n### How They Differ from Regular AI\n- Regular AI: designed for one task (e.g. spam detection)\n- LLM: can perform many language-based tasks\n\n### Examples of LLMs\n- **ChatGPT** (OpenAI)\n- **Claude** (Anthropic)\n- **Gemini** (Google)\n\n> LLMs aren\'t "brains" — they are very complex statistical patterns.',
            xp_reward: 20,
            source_references: ['Google AI Essentials', 'IBM SkillsBuild']
          },
          {
            id: 'basic-m3-q2',
            level_id: 'basic',
            module_id: 'basic-m3',
            order: 2,
            type: 'lesson',
            title_id: 'Konsep Tokens',
            title_en: 'The Concept of Tokens',
            description_id: 'Bagaimana LLM memecah teks menjadi potongan kecil.',
            description_en: 'How LLMs break text into small pieces.',
            content_id: 'LLM tidak membaca kata satu per satu. Mereka memecah teks menjadi **tokens**.\n\n### Apa itu Token?\n- Token bisa berupa kata, bagian kata, atau karakter\n- Contoh: "Learning" bisa jadi 1 token, "un-friend-li-ness" bisa 4 token\n\n### Mengapa Tokens Penting?\n- Harga API dihitung per token\n- Konteks terbatas (misal GPT-4: 128K tokens)\n- Kualitas output dipengaruhi tokenisasi\n\n> Token adalah unit dasar bagaimana LLM memproses teks.',
            content_en: 'LLMs don\'t read words one by one. They break text into **tokens**.\n\n### What is a Token?\n- A token can be a word, part of a word, or a character\n- Example: "Learning" might be 1 token, "un-friend-li-ness" might be 4 tokens\n\n### Why Do Tokens Matter?\n- API pricing is per-token\n- Context is limited (e.g. GPT-4: 128K tokens)\n- Output quality is affected by tokenization\n\n> Tokens are the basic unit of how LLMs process text.',
            xp_reward: 20,
            source_references: ['OpenAI Documentation', 'Anthropic Documentation']
          },
          {
            id: 'basic-m3-q3',
            level_id: 'basic',
            module_id: 'basic-m3',
            order: 3,
            type: 'lesson',
            title_id: 'Kenapa AI Kadang "Bohong"',
            title_en: 'Why AI Sometimes "Makes Things Up"',
            description_id: 'Mengenal fenomena hallucination pada LLM.',
            description_en: 'Understanding hallucination in LLMs.',
            content_id: '**Hallucination** adalah ketika LLM menghasilkan informasi yang terdengar meyakinkan tetapi salah atau tidak ada.\n\n### Kenapa Terjadi?\n- LLM memprediksi kata berikutnya berdasarkan pola, bukan fakta\n- Tidak punya "pengetahuan nyata" — hanya statistik\n- Tidak bisa membedakan fiksi dan fakta secara internal\n\n### Cara Mengurangi\n- RAG (Retrieval-Augmented Generation)\n- Fine-tuning dengan data verified\n- Human review\n\n> Selalu verifikasi informasi penting dari LLM.',
            content_en: '**Hallucination** is when an LLM generates information that sounds convincing but is wrong or fabricated.\n\n### Why Does It Happen?\n- LLMs predict the next word based on patterns, not facts\n- No "real knowledge" — only statistics\n- Can\'t distinguish fiction from fact internally\n\n### How to Reduce It\n- RAG (Retrieval-Augmented Generation)\n- Fine-tuning with verified data\n- Human review\n\n> Always verify important information from LLMs.',
            xp_reward: 20,
            source_references: ['Anthropic Technical Blog', 'OpenAI Documentation']
          },
          {
            id: 'basic-m3-q4',
            level_id: 'basic',
            module_id: 'basic-m3',
            order: 4,
            type: 'lesson',
            title_id: 'Kenali LLM Populer',
            title_en: 'Meet the Popular LLMs',
            description_id: 'Perbandingan ChatGPT, Claude, dan Gemini.',
            description_en: 'Comparing ChatGPT, Claude, and Gemini.',
            content_id: '### ChatGPT (OpenAI)\n- Keunggulan: ekosistem plugin,Coding能力强\n- Cocok untuk: umum, coding, kreatif\n\n### Claude (Anthropic)\n- Keunggulan: analisis panjang, safety focus\n- Cocok untuk: analisis dokumen, writing\n\n### Gemini (Google)\n- Keunggulan: multimodal, integrasi Google\n- Cocok untuk: search, multimodal tasks\n\n> Tidak ada LLM "terbaik" — tergantung use case.',
            content_en: '### ChatGPT (OpenAI)\n- Strength: plugin ecosystem, strong coding\n- Best for: general use, coding, creative\n\n### Claude (Anthropic)\n- Strength: long analysis, safety focus\n- Best for: document analysis, writing\n\n### Gemini (Google)\n- Strength: multimodal, Google integration\n- Best for: search, multimodal tasks\n\n> No "best" LLM — it depends on the use case.',
            xp_reward: 20,
            source_references: ['Official documentation from OpenAI, Anthropic, Google']
          },
          {
            id: 'basic-m3-q5',
            level_id: 'basic',
            module_id: 'basic-m3',
            order: 5,
            type: 'checkpoint',
            title_id: '🎯 Checkpoint: Compare Two LLMs',
            title_en: '🎯 Checkpoint: Compare Two LLMs',
            description_id: 'Bandingkan dua LLM pada prompt yang sama.',
            description_en: 'Compare two LLMs on the same prompt.',
            content_id: 'Jawab pertanyaan berikut.',
            content_en: 'Answer the following questions.',
            xp_reward: 40,
            quiz_questions: [
              {
                id: 'basic-m3-q5-1',
                question_id: 'Mengapa LLM bisa "berbohong" atau menghasilkan informasi palsu?',
                question_en: 'Why can LLMs "lie" or produce false information?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Karena LLM memprediksi kata berikutnya berdasarkan pola, bukan fakta', text_en: 'Because LLMs predict the next word based on patterns, not facts', is_correct: true },
                  { id: 'b', text_id: 'Karena LLM sengaja dibuat untuk berbohong', text_en: 'Because LLMs are deliberately designed to lie', is_correct: false },
                  { id: 'c', text_id: 'Karena internet penuh dengan informasi palsu', text_en: 'Because the internet is full of false information', is_correct: false }
                ],
                explanation_id: 'Benar! LLM memprediksi pola, bukan mengakses fakta secara langsung.',
                explanation_en: 'Correct! LLMs predict patterns, they don\'t access facts directly.'
              }
            ]
          }
        ]
      },
      {
        id: 'basic-m4',
        level_id: 'basic',
        order: 4,
        title_id: 'Prompt Engineering Dasar',
        title_en: 'Prompt Engineering Basics',
        description_id: 'Belajar menulis prompt yang efektif.',
        description_en: 'Learn to write effective prompts.',
        quests: [
          {
            id: 'basic-m4-q1',
            level_id: 'basic',
            module_id: 'basic-m4',
            order: 1,
            type: 'lesson',
            title_id: 'Apa itu Prompt & Mengapa Penting',
            title_en: 'What is a Prompt & Why It Matters',
            description_id: 'Prompt adalah " instruksi" yang kamu berikan ke AI.',
            description_en: 'A prompt is the "instruction" you give to AI.',
            content_id: '**Prompt** adalah teks yang kamu tulis sebagai input ke LLM.\n\n### Mengapa Prompt Penting?\n- Prompt yang baik = output yang baik\n- Prompt yang buruk = output yang tidak berguna\n- Ini adalah skill dasar untuk menggunakan AI\n\n> Prompt engineering bukan programming — ini adalah seni berkomunikasi dengan AI.',
            content_en: '**A prompt** is the text you write as input to an LLM.\n\n### Why Do Prompts Matter?\n- Good prompt = good output\n- Bad prompt = useless output\n- This is a fundamental skill for using AI\n\n> Prompt engineering isn\'t programming — it\'s the art of communicating with AI.',
            xp_reward: 20,
            source_references: ['Google AI Essentials', 'Anthropic Documentation']
          },
          {
            id: 'basic-m4-q2',
            level_id: 'basic',
            module_id: 'basic-m4',
            order: 2,
            type: 'lesson',
            title_id: 'Anatomi Prompt yang Baik',
            title_en: 'Anatomy of a Good Prompt',
            description_id: 'Elemen-elemen yang membuat prompt efektif.',
            description_en: 'Elements that make a prompt effective.',
            content_id: '### Elemen Prompt yang Baik\n1. **Context** — berikan konteks yang relevan\n2. **Task** — jelaskan apa yang harus dilakukan\n3. **Format** — tentukan format output\n4. **Constraints** — batasan yang perlu dipatuhi\n\n### Contoh\nPrompt buruk: "Tulis tentang AI"\nPrompt bagus: "Tulis artikel 500 kata tentang 3 manfaat AI untuk pendidikan di Indonesia, bahasa informal, sertakan contoh nyata"',
            content_en: '### Elements of a Good Prompt\n1. **Context** — provide relevant context\n2. **Task** — explain what to do\n3. **Format** — specify output format\n4. **Constraints** — limitations to follow\n\n### Example\nBad prompt: "Write about AI"\nGood prompt: "Write a 500-word article about 3 benefits of AI for education in Indonesia, informal tone, include real examples"',
            xp_reward: 20,
            source_references: ['Anthropic Documentation', 'OpenAI Prompt Engineering Guide']
          },
          {
            id: 'basic-m4-q3',
            level_id: 'basic',
            module_id: 'basic-m4',
            order: 3,
            type: 'lesson',
            title_id: 'Practice: Fix the Bad Prompt',
            title_en: 'Practice: Fix the Bad Prompt',
            description_id: 'Latihan memperbaiki prompt yang buruk menjadi bagus.',
            description_en: 'Practice turning bad prompts into good ones.',
            content_id: '### Latihan\nUbah prompt buruk ini menjadi bagus:\n\n**Prompt buruk:** "Buatkan artikel"\n\n**Pertanyaan:**\n1. Artikel tentang apa?\n2. Untuk siapa target pembacanya?\n3. Berapa panjang yang dibutuhkan?\n4. Formal atau informal?\n5. Apa tujuan artikelnya?\n\nJawab pertanyaan-pertanyaan itu, lalu gabungkan menjadi prompt yang lengkap.\n\n> Prompt yang baik menjawab pertanyaan: apa, untuk siapa, bagaimana, dan mengapa.',
            content_en: '### Exercise\nTurn this bad prompt into a good one:\n\n**Bad prompt:** "Write an article"\n\n**Questions to answer:**\n1. About what?\n2. Who is the target audience?\n3. How long should it be?\n4. Formal or informal?\n5. What\'s the article\'s purpose?\n\nAnswer these questions, then combine into a complete prompt.\n\n> A good prompt answers: what, for whom, how, and why.',
            xp_reward: 20,
            source_references: ['Google AI Essentials']
          },
          {
            id: 'basic-m4-q4',
            level_id: 'basic',
            module_id: 'basic-m4',
            order: 4,
            type: 'lesson',
            title_id: 'Kesalahan Umum Pemula',
            title_en: 'Common Beginner Mistakes',
            description_id: 'Kesalahan yang sering dilakukan saat menulis prompt.',
            description_en: 'Common mistakes when writing prompts.',
            content_id: '### Kesalahan Umum\n1. **Terlalu pendek** — "Jelaskan AI" tanpa konteks\n2. **Terlalu ambigu** — "Buatkan yang bagus"\n3. **Tidak ada format** — tidak jelas output seperti apa\n4. **Tidak ada contoh** — AI butuh contoh untuk memahami\n5. **Tidak spesifik** — terlalu luas cakupannya\n\n> Tip: Selalu berikan contoh (few-shot) saat meminta format tertentu.',
            content_en: '### Common Mistakes\n1. **Too short** — "Explain AI" without context\n2. **Too vague** — "Make something good"\n3. **No format** — unclear what output looks like\n4. **No examples** — AI needs examples to understand\n5. **Not specific** — scope too broad\n\n> Tip: Always provide examples (few-shot) when requesting a specific format.',
            xp_reward: 20,
            source_references: ['OpenAI Prompt Engineering Guide']
          },
          {
            id: 'basic-m4-q5',
            level_id: 'basic',
            module_id: 'basic-m4',
            order: 5,
            type: 'checkpoint',
            title_id: '🎯 Checkpoint: Prompt Challenge',
            title_en: '🎯 Checkpoint: Prompt Challenge',
            description_id: 'Tantangan prompt: 3 skenario, auto-scored.',
            description_en: 'Prompt challenge: 3 scenarios, auto-scored.',
            content_id: 'Jawab pertanyaan berikut.',
            content_en: 'Answer the following questions.',
            xp_reward: 40,
            quiz_questions: [
              {
                id: 'basic-m4-q5-1',
                question_id: 'Prompt mana yang lebih efektif?',
                question_en: 'Which prompt is more effective?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Tulis tentang kucing', text_en: 'Write about cats', is_correct: false },
                  { id: 'b', text_id: 'Tulis paragraf pendek tentang 3 fakta menarik kucing domestik untuk anak usia 10 tahun, bahasa Indonesia', text_en: 'Write a short paragraph about 3 interesting facts about domestic cats for a 10-year-old, in Indonesian', is_correct: true }
                ],
                explanation_id: 'Benar! Prompt kedua spesifik, punya target, format, dan bahasa yang jelas.',
                explanation_en: 'Correct! The second prompt is specific, has a target, format, and clear language.'
              }
            ]
          }
        ]
      },
      {
        id: 'basic-m5',
        level_id: 'basic',
        order: 5,
        title_id: 'Etika & Penutup',
        title_en: 'Ethics & Wrap-up',
        description_id: 'Etika dalam AI dan review akhir Level Dasar.',
        description_en: 'AI ethics and final review of Basic Level.',
        quests: [
          {
            id: 'basic-m5-q1',
            level_id: 'basic',
            module_id: 'basic-m5',
            order: 1,
            type: 'lesson',
            title_id: 'Etika dan Bias dalam AI',
            title_en: 'Ethics & Bias in AI',
            description_id: 'Mengapa etika AI penting dan apa itu bias.',
            description_en: 'Why AI ethics matter and what bias is.',
            content_id: '### Etika AI\nAI bukan netral — ia mencerminkan data yang digunakan untuk melatihnya.\n\n### Masalah Bias\n- **Data bias** — data training tidak representatif\n- **Algorithmic bias** — algoritma memperkuat diskriminasi\n- **Impact bias** — keputusan AI mempengaruhi hidup nyata\n\n### Contoh Nyata\n- Sistem rekrutmen Amazon yang diskriminatif terhadap perempuan\n- Facial recognition yang kurang akurat untuk kulit gelap\n\n> Sebagai pengguna AI, kita punya tanggung jawab untuk menggunakannya secara etis.',
            content_en: '### AI Ethics\nAI isn\'t neutral — it reflects the data used to train it.\n\n### Bias Issues\n- **Data bias** — training data isn\'t representative\n- **Algorithmic bias** — algorithms reinforce discrimination\n- **Impact bias** — AI decisions affect real lives\n\n### Real Examples\n- Amazon\'s hiring system that discriminated against women\n- Facial recognition less accurate for darker skin\n\n> As AI users, we have a responsibility to use it ethically.',
            xp_reward: 20,
            source_references: ['Elements of AI (University of Helsinki)', 'IBM SkillsBuild']
          },
          {
            id: 'basic-m5-q2',
            level_id: 'basic',
            module_id: 'basic-m5',
            order: 2,
            type: 'final_review',
            title_id: '🏁 Final Review — AI Explorer Badge',
            title_en: '🏁 Final Review — AI Explorer Badge',
            description_id: 'Review kumulatif seluruh Basic Level. Selesaikan untuk mendapatkan lencana AI Explorer!',
            description_en: 'Cumulative review of the entire Basic Level. Complete to earn the AI Explorer badge!',
            content_id: 'Ini adalah review akhir Basic Level. Jawab semua pertanyaan untuk mendapatkan lencana **AI Explorer**!',
            content_en: 'This is the final review of Basic Level. Answer all questions to earn the **AI Explorer** badge!',
            xp_reward: 60,
            quiz_questions: [
              {
                id: 'basic-m5-q2-1',
                question_id: 'AI yang kita gunakan saat ini (ChatGPT, Siri) termasuk kategori apa?',
                question_en: 'What category of AI do we use today (ChatGPT, Siri)?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'General AI', text_en: 'General AI', is_correct: false },
                  { id: 'b', text_id: 'Narrow AI', text_en: 'Narrow AI', is_correct: true },
                  { id: 'c', text_id: 'Super AI', text_en: 'Super AI', is_correct: false }
                ],
                explanation_id: 'Benar! Semua AI saat ini adalah Narrow AI.',
                explanation_en: 'Correct! All AI today is Narrow AI.'
              },
              {
                id: 'basic-m5-q2-2',
                question_id: 'Apa itu hallucination pada LLM?',
                question_en: 'What is hallucination in LLMs?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'LLM menghasilkan informasi yang salah dengan percaya diri', text_en: 'LLM produces wrong information confidently', is_correct: true },
                  { id: 'b', text_id: 'LLM tidak bisa menjawab pertanyaan', text_en: 'LLM can\'t answer questions', is_correct: false },
                  { id: 'c', text_id: 'LLM crashes atau error', text_en: 'LLM crashes or errors', is_correct: false }
                ],
                explanation_id: 'Benar! Hallucination = LLM mengarang informasi yang terdengar meyakinkan.',
                explanation_en: 'Correct! Hallucination = LLM fabricates information that sounds convincing.'
              },
              {
                id: 'basic-m5-q2-3',
                question_id: 'Elemen mana yang TIDAK termasuk dalam prompt yang baik?',
                question_en: 'Which element is NOT part of a good prompt?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Context', text_en: 'Context', is_correct: false },
                  { id: 'b', text_id: 'Random words', text_en: 'Random words', is_correct: true },
                  { id: 'c', text_id: 'Format', text_en: 'Format', is_correct: false }
                ],
                explanation_id: 'Benar! Random words tidak membantu — prompt harus terstruktur.',
                explanation_en: 'Correct! Random words don\'t help — prompts should be structured.'
              }
            ]
          }
        ]
      }
    ]
  },

  // =============================================
  // INTERMEDIATE — Hands-on Practice (24 quests)
  // =============================================
  {
    id: 'intermediate',
    order: 2,
    emoji: '⚙️',
    title_id: 'Menengah',
    title_en: 'Intermediate',
    theme_id: 'Praktik Langsung',
    theme_en: 'Hands-on Practice',
    badge_name_id: 'Ninja Neural',
    badge_name_en: 'Neural Ninja',
    badge_icon: '🥷',
    modules: [
      {
        id: 'intermediate-m1',
        level_id: 'intermediate',
        order: 1,
        title_id: 'Jenis-Jenis Machine Learning',
        title_en: 'Types of Machine Learning',
        description_id: 'Supervised, unsupervised, dan reinforcement learning.',
        description_en: 'Supervised, unsupervised, and reinforcement learning.',
        quests: [
          {
            id: 'intermediate-m1-q1', level_id: 'intermediate', module_id: 'intermediate-m1', order: 1, type: 'lesson',
            title_id: 'Supervised Learning', title_en: 'Supervised Learning',
            description_id: 'Belajar dari data berlabel.', description_en: 'Learning from labeled data.',
            content_id: '**Supervised Learning** adalah metode di mana AI belajar dari data yang sudah diberi label.\n\n### Dua Tipe Utama\n- **Classification** — memprediksi kategori (misal: spam/tidak spam)\n- **Regression** — memprediksi angka (misal: harga rumah)\n\n> Data berlabel = input + jawaban yang benar.',
            content_en: '**Supervised Learning** is a method where AI learns from labeled data.\n\n### Two Main Types\n- **Classification** — predicting categories (e.g. spam/not spam)\n- **Regression** — predicting numbers (e.g. house price)\n\n> Labeled data = input + correct answer.',
            xp_reward: 20
          },
          {
            id: 'intermediate-m1-q2', level_id: 'intermediate', module_id: 'intermediate-m1', order: 2, type: 'lesson',
            title_id: 'Unsupervised Learning', title_en: 'Unsupervised Learning',
            description_id: 'Menemukan pola tanpa label.', description_en: 'Finding patterns without labels.',
            content_id: '**Unsupervised Learning** bekerja tanpa label — AI menemukan pola sendiri dari data.\n\n### Teknik Utama\n- **Clustering** — mengelompokkan data mirip (misal: segmentasi pelanggan)\n- **Dimensionality Reduction** — menyederhanakan data kompleks\n\n> Cocok saat kamu tidak tahu apa yang harus dicari.',
            content_en: '**Unsupervised Learning** works without labels — AI finds patterns on its own.\n\n### Main Techniques\n- **Clustering** — grouping similar data (e.g. customer segmentation)\n- **Dimensionality Reduction** — simplifying complex data\n\n> Useful when you don\'t know what to look for.',
            xp_reward: 20
          },
          {
            id: 'intermediate-m1-q3', level_id: 'intermediate', module_id: 'intermediate-m1', order: 3, type: 'lesson',
            title_id: 'Reinforcement Learning', title_en: 'Reinforcement Learning',
            description_id: 'Belajar melalui reward dan punishment.', description_en: 'Learning through reward and punishment.',
            content_id: '**Reinforcement Learning (RL)** adalah metode di mana AI belajar melalui **trial and error** dengan sistem reward.\n\n### Analogi: Bermain Game\n- **Action** — AI mengambil keputusan\n- **Reward** — dapat poin jika benar\n- **Punishment** — kehilangan nyata jika salah\n\n### Contoh Nyata\n- AlphaGo mengalahkan juara dunia Go\n- Robot yang belajar berjalan\n- AI untuk self-driving cars',
            content_en: '**Reinforcement Learning (RL)** is a method where AI learns through **trial and error** with a reward system.\n\n### Analogy: Playing a Game\n- **Action** — AI makes a decision\n- **Reward** — gets points for correct moves\n- **Punishment** — loses lives for wrong moves\n\n### Real Examples\n- AlphaGo defeating world Go champion\n- Robots learning to walk\n- AI for self-driving cars',
            xp_reward: 20
          },
          {
            id: 'intermediate-m1-q4', level_id: 'intermediate', module_id: 'intermediate-m1', order: 4, type: 'checkpoint',
            title_id: '🎯 Checkpoint: Classify the Case Study', title_en: '🎯 Checkpoint: Classify the Case Study',
            description_id: 'Drag-drop: kelompokkan studi kasus ke jenis ML yang tepat.', description_en: 'Drag-drop: classify case studies to the right ML type.',
            content_id: 'Jawab pertanyaan berikut.', content_en: 'Answer the following questions.',
            xp_reward: 40,
            quiz_questions: [
              {
                id: 'intermediate-m1-q4-1',
                question_id: 'Sistem rekomendasi Netflix yang memprediksi rating film termasuk jenis ML apa?',
                question_en: 'Netflix recommendation system that predicts movie ratings is what type of ML?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Supervised Learning (Regression)', text_en: 'Supervised Learning (Regression)', is_correct: true },
                  { id: 'b', text_id: 'Unsupervised Learning', text_en: 'Unsupervised Learning', is_correct: false },
                  { id: 'c', text_id: 'Reinforcement Learning', text_en: 'Reinforcement Learning', is_correct: false }
                ],
                explanation_id: 'Benar! Memprediksi angka (rating) = regression = supervised learning.',
                explanation_en: 'Correct! Predicting numbers (ratings) = regression = supervised learning.'
              }
            ]
          }
        ]
      },
      {
        id: 'intermediate-m2',
        level_id: 'intermediate',
        order: 2,
        title_id: 'Neural Networks, Lebih Dalam',
        title_en: 'Neural Networks, Deeper',
        description_id: 'Anatomi jaringan saraf tiruan secara detail.',
        description_en: 'Detailed anatomy of artificial neural networks.',
        quests: [
          {
            id: 'intermediate-m2-q1', level_id: 'intermediate', module_id: 'intermediate-m2', order: 1, type: 'lesson',
            title_id: 'Anatomi Neural Network', title_en: 'Anatomy of a Neural Network',
            description_id: 'Neuron, layer, weight, dan bias.', description_en: 'Neurons, layers, weights, and biases.',
            content_id: '### Komponen Neural Network\n- **Neuron** — unit penghitung dasar\n- **Layer** — kumpulan neuron (input → hidden → output)\n- **Weight** — kekuatan koneksi antar neuron\n- **Bias** — threshold aktivasi\n\n### Cara Kerja\n1. Data masuk melalui input layer\n2. Diproses di hidden layer(s)\n3. Hasil keluar di output layer',
            content_en: '### Neural Network Components\n- **Neuron** — basic computing unit\n- **Layer** — collection of neurons (input → hidden → output)\n- **Weight** — strength of connection between neurons\n- **Bias** — activation threshold\n\n### How It Works\n1. Data enters through input layer\n2. Processed in hidden layer(s)\n3. Result exits at output layer',
            xp_reward: 20
          },
          {
            id: 'intermediate-m2-q2', level_id: 'intermediate', module_id: 'intermediate-m2', order: 2, type: 'lesson',
            title_id: 'Activation Functions', title_en: 'Activation Functions',
            description_id: 'ReLU, Sigmoid, dan bagaimana neuron "mengaktifkan".', description_en: 'ReLU, Sigmoid, and how neurons "activate".',
            content_id: '**Activation Function** menentukan apakah neuron "aktif" atau tidak.\n\n### Fungsi Populer\n- **Sigmoid** — mengubah output jadi 0-1\n- **ReLU** — 0 jika negatif, nilai asli jika positif\n- **Softmax** — untuk klasifikasi multi-kelas\n\n> Tanpa activation function, neural network hanya bisa belajar linear patterns.',
            content_en: '**Activation Functions** determine whether a neuron "activates" or not.\n\n### Popular Functions\n- **Sigmoid** — converts output to 0-1\n- **ReLU** — 0 if negative, original value if positive\n- **Softmax** — for multi-class classification\n\n> Without activation functions, neural networks can only learn linear patterns.',
            xp_reward: 20
          },
          {
            id: 'intermediate-m2-q3', level_id: 'intermediate', module_id: 'intermediate-m2', order: 3, type: 'lesson',
            title_id: 'Forward Pass & Backpropagation', title_en: 'Forward Pass & Backpropagation',
            description_id: 'Bagaimana data mengalir dan model belajar dari kesalahan.',
            description_en: 'How data flows and models learn from mistakes.',
            content_id: '### Forward Pass\nData mengalir dari input → hidden → output. Ini adalah proses prediksi.\n\n### Backpropagation\nSetelah prediksi salah, error dikirim **mundur** melalui jaringan. Weight disesuaikan untuk mengurangi error.\n\n> Forward pass = menebak. Backpropagation = belajar dari kesalahan.',
            content_en: '### Forward Pass\nData flows from input → hidden → output. This is the prediction process.\n\n### Backpropagation\nAfter a wrong prediction, error is sent **backwards** through the network. Weights are adjusted to reduce error.\n\n> Forward pass = guessing. Backpropagation = learning from mistakes.',
            xp_reward: 20
          },
          {
            id: 'intermediate-m2-q4', level_id: 'intermediate', module_id: 'intermediate-m2', order: 4, type: 'lesson',
            title_id: 'Interactive Visualization', title_en: 'Interactive Visualization',
            description_id: 'Eksperimen dengan slider untuk melihat efek perubahan weight.', description_en: 'Experiment with sliders to see weight changes.',
            content_id: '### Eksperimen\nBayangkan neural network sederhana dengan 1 hidden layer:\n\n- **Weight tinggi** → sinyal lebih kuat → prediksi lebih ekstrem\n- **Weight rendah** → sinyal lebih lemah → prediksi lebih moderat\n- **Bias tinggi** → neuron lebih mudah aktif\n- **Bias rendah** → neuron lebih sulit aktif\n\n> Interaksi antara weight dan bias menentukan perilaku model.',
            content_en: '### Experiment\nImagine a simple neural network with 1 hidden layer:\n\n- **High weight** → stronger signal → more extreme predictions\n- **Low weight** → weaker signal → more moderate predictions\n- **High bias** → neuron activates more easily\n- **Low bias** → neuron activates less easily\n\n> The interaction between weights and biases determines model behavior.',
            xp_reward: 20
          },
          {
            id: 'intermediate-m2-q5', level_id: 'intermediate', module_id: 'intermediate-m2', order: 5, type: 'checkpoint',
            title_id: '🎯 Checkpoint: Neural Network Quiz', title_en: '🎯 Checkpoint: Neural Network Quiz',
            description_id: 'Quiz + mini simulasi neural network.', description_en: 'Quiz + mini neural network simulation.',
            content_id: 'Jawab pertanyaan berikut.', content_en: 'Answer the following questions.',
            xp_reward: 40,
            quiz_questions: [
              {
                id: 'intermediate-m2-q5-1',
                question_id: 'Apa yang dilakukan backpropagation?',
                question_en: 'What does backpropagation do?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Mengirim data maju dari input ke output', text_en: 'Sends data forward from input to output', is_correct: false },
                  { id: 'b', text_id: 'Mengirim error mundur untuk menyesuaikan weight', text_en: 'Sends error backwards to adjust weights', is_correct: true },
                  { id: 'c', text_id: 'Menghapus neuron yang tidak aktif', text_en: 'Removes inactive neurons', is_correct: false }
                ],
                explanation_id: 'Benar! Backpropagation = mengirim error mundur untuk belajar.',
                explanation_en: 'Correct! Backpropagation = sending error backwards to learn.'
              }
            ]
          }
        ]
      },
      {
        id: 'intermediate-m3',
        level_id: 'intermediate',
        order: 3,
        title_id: 'NLP & Computer Vision',
        title_en: 'NLP & Computer Vision',
        description_id: 'Dua cabang utama AI: memahami teks dan gambar.',
        description_en: 'Two main branches of AI: understanding text and images.',
        quests: [
          {
            id: 'intermediate-m3-q1', level_id: 'intermediate', module_id: 'intermediate-m3', order: 1, type: 'lesson',
            title_id: 'Natural Language Processing', title_en: 'Natural Language Processing',
            description_id: 'Bagaimana AI memahami bahasa manusia.', description_en: 'How AI understands human language.',
            content_id: '**NLP** adalah bidang AI yang fokus pada interaksi antara komputer dan bahasa manusia.\n\n### Aplikasi NLP\n- **Machine Translation** — Google Translate\n- **Sentiment Analysis** — menganalisis review\n- **Text Summarization** — merangkum artikel\n- **Chatbots** — customer service AI\n\n> NLP adalah fondasi dari semua LLM.',
            content_en: '**NLP** is the field of AI focused on computer-human language interaction.\n\n### NLP Applications\n- **Machine Translation** — Google Translate\n- **Sentiment Analysis** — analyzing reviews\n- **Text Summarization** — summarizing articles\n- **Chatbots** — AI customer service\n\n> NLP is the foundation of all LLMs.',
            xp_reward: 20
          },
          {
            id: 'intermediate-m3-q2', level_id: 'intermediate', module_id: 'intermediate-m3', order: 2, type: 'lesson',
            title_id: 'Concept of Embeddings', title_en: 'The Concept of Embeddings',
            description_id: 'Bagaimana AI merepresentasikan kata sebagai angka.', description_en: 'How AI represents words as numbers.',
            content_id: '**Embedding** adalah representasi vektor (angka) dari teks — cara AI memahami "makna" kata.\n\n### Analogi\nBayangkan setiap kata punya koordinat di ruang multidimensi. Kata yang mirip (kucing, anjing) punya koordinat yang dekat. Kata yang berbeda (kucing, mobil) jauh.\n\n> Embeddings adalah bahasa yang digunakan neural network untuk memahami teks.',
            content_en: '**Embeddings** are vector (number) representations of text — how AI understands word "meaning".\n\n### Analogy\nImagine each word has coordinates in multidimensional space. Similar words (cat, dog) have close coordinates. Different words (cat, car) are far apart.\n\n> Embeddings are the language neural networks use to understand text.',
            xp_reward: 20
          },
          {
            id: 'intermediate-m3-q3', level_id: 'intermediate', module_id: 'intermediate-m3', order: 3, type: 'lesson',
            title_id: 'Computer Vision Basics', title_en: 'Computer Vision Basics',
            description_id: 'Bagaimana AI "melihat" dan memahami gambar.', description_en: 'How AI "sees" and understands images.',
            content_id: '**Computer Vision** adalah bidang AI yang membuat komputer bisa memproses dan memahami gambar.\n\n### Aplikasi\n- **Face Recognition** — buka kunci HP dengan wajah\n- **OCR** — scan dokumen jadi teks\n- **Image Classification** — mengenali objek dalam foto\n- **Medical Imaging** — deteksi penyakit dari X-ray\n\n> Gambar = kumpulan piksel = data numerik yang bisa dipelajari AI.',
            content_en: '**Computer Vision** is the field of AI that enables computers to process and understand images.\n\n### Applications\n- **Face Recognition** — unlocking phone with your face\n- **OCR** — scanning documents to text\n- **Image Classification** — recognizing objects in photos\n- **Medical Imaging** — detecting diseases from X-rays\n\n> Images = collections of pixels = numerical data AI can learn from.',
            xp_reward: 20
          },
          {
            id: 'intermediate-m3-q4', level_id: 'intermediate', module_id: 'intermediate-m3', order: 4, type: 'lesson',
            title_id: 'Case Studies', title_en: 'Case Studies',
            description_id: 'Face detection, OCR, dan image classification.', description_en: 'Face detection, OCR, and image classification.',
            content_id: '### Studi Kasus\n\n**1. Face Detection (Facebook)**\n- Menggunakan CNN untuk mendeteksi wajah\n- Bisa mengenali wajah yang sama dari berbagai sudut\n\n**2. OCR (Google Lens)**\n- Mengkonversi gambar teks jadi teks digital\n- Bisa translate langsung dari kamera\n\n**3. Image Classification (iNaturalist)**\n- Mengklasifikasi spesies tanaman/hewan dari foto\n- Membantu peneliti biodiversitas',
            content_en: '### Case Studies\n\n**1. Face Detection (Facebook)**\n- Uses CNN to detect faces\n- Can recognize same face from different angles\n\n**2. OCR (Google Lens)**\n- Converts text images to digital text\n- Can translate directly from camera\n\n**3. Image Classification (iNaturalist)**\n- Classifies plant/animal species from photos\n- Helps biodiversity researchers',
            xp_reward: 20
          },
          {
            id: 'intermediate-m3-q5', level_id: 'intermediate', module_id: 'intermediate-m3', order: 5, type: 'checkpoint',
            title_id: '🎯 Checkpoint: NLP & Vision Quiz', title_en: '🎯 Checkpoint: NLP & Vision Quiz',
            description_id: 'Quiz + coba image classifier sederhana.', description_en: 'Quiz + try a simple image classifier.',
            content_id: 'Jawab pertanyaan berikut.', content_en: 'Answer the following questions.',
            xp_reward: 40,
            quiz_questions: [
              {
                id: 'intermediate-m3-q5-1',
                question_id: 'Apa itu embedding dalam NLP?',
                question_en: 'What is embedding in NLP?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Representasi angka dari teks yang menangkap makna', text_en: 'Numerical representation of text that captures meaning', is_correct: true },
                  { id: 'b', text_id: 'Proses menerjemahkan bahasa', text_en: 'Process of translating languages', is_correct: false },
                  { id: 'c', text_id: 'Teknik kompresi gambar', text_en: 'Image compression technique', is_correct: false }
                ],
                explanation_id: 'Benar! Embedding = vektor angka yang merepresentasikan makna kata.',
                explanation_en: 'Correct! Embedding = number vectors representing word meaning.'
              }
            ]
          }
        ]
      },
      {
        id: 'intermediate-m4',
        level_id: 'intermediate',
        order: 4,
        title_id: 'Advanced Prompt Engineering',
        title_en: 'Advanced Prompt Engineering',
        description_id: 'Teknik prompt tingkat lanjut untuk hasil lebih baik.',
        description_en: 'Advanced prompt techniques for better results.',
        quests: [
          {
            id: 'intermediate-m4-q1', level_id: 'intermediate', module_id: 'intermediate-m4', order: 1, type: 'lesson',
            title_id: 'Chain-of-Thought Prompting', title_en: 'Chain-of-Thought Prompting',
            description_id: 'Membuat AI "berpikir" langkah demi langkah.', description_en: 'Making AI "think" step by step.',
            content_id: '**Chain-of-Thought (CoT)** adalah teknik di mana kamu meminta AI menunjukkan proses berpikirnya.\n\n### Cara Pakai\nTambahkan: "Mari kita pikirkan langkah demi langkah" atau "Tunjukkan proses berpikirmu."\n\n### Kapan Efektif?\n- Soal matematika\n- Reasoning kompleks\n- Problem-solving multi-step',
            content_en: '**Chain-of-Thought (CoT)** is a technique where you ask AI to show its reasoning process.\n\n### How to Use\nAdd: "Let\'s think step by step" or "Show your reasoning process."\n\n### When Is It Effective?\n- Math problems\n- Complex reasoning\n- Multi-step problem-solving',
            xp_reward: 20
          },
          {
            id: 'intermediate-m4-q2', level_id: 'intermediate', module_id: 'intermediate-m4', order: 2, type: 'lesson',
            title_id: 'Few-shot vs Zero-shot', title_en: 'Few-shot vs Zero-shot Prompting',
            description_id: 'Kapan pakai contoh dan kapan tidak.', description_en: 'When to use examples and when not to.',
            content_id: '### Zero-shot\nTidak ada contoh — langsung kasih instruksi.\nCocok untuk: tugas sederhana dan familiar.\n\n### Few-shot\nKasih beberapa contoh sebelum instruksi.\nCocok untuk: format spesifik, tugas unik.\n\n> Semakin banyak contoh (dalam batas context window), semakin konsisten output.',
            content_en: '### Zero-shot\nNo examples — just give instructions.\nGood for: simple and familiar tasks.\n\n### Few-shot\nProvide a few examples before instructions.\nGood for: specific formats, unique tasks.\n\n> The more examples (within context window limits), the more consistent the output.',
            xp_reward: 20
          },
          {
            id: 'intermediate-m4-q3', level_id: 'intermediate', module_id: 'intermediate-m4', order: 3, type: 'lesson',
            title_id: 'Role Prompting & System Prompts', title_en: 'Role Prompting & System Prompts',
            description_id: 'Memberi AI "peran" untuk hasil lebih spesifik.', description_en: 'Giving AI a "role" for more specific results.',
            content_id: '**Role Prompting** = memberi AI persona atau peran tertentu.\n\n### Contoh\n- "Kamu adalah guru matematika SD"\n- "Kamu adalah senior data scientist"\n- "Jawab seperti konsultan hukum"\n\n### System Prompt\nPrompt yang diatur di level sistem (bukan oleh user). Biasanya untuk:\n- Tone of voice\n- Batasan respons\n- Instruksi konsisten',
            content_en: '**Role Prompting** = giving AI a specific persona or role.\n\n### Examples\n- "You are an elementary school math teacher"\n- "You are a senior data scientist"\n- "Answer like a legal consultant"\n\n### System Prompt\nPrompt set at the system level (not by user). Usually for:\n- Tone of voice\n- Response limitations\n- Consistent instructions',
            xp_reward: 20
          },
          {
            id: 'intermediate-m4-q4', level_id: 'intermediate', module_id: 'intermediate-m4', order: 4, type: 'lesson',
            title_id: 'Practice: Optimize Prompts', title_en: 'Practice: Optimize Prompts',
            description_id: 'Optimasi prompt untuk 3 use case berbeda.', description_en: 'Optimize prompts for 3 different use cases.',
            content_id: '### Latihan\nBuat prompt optimal untuk:\n\n1. **Email Generator** — buat email follow-up setelah interview\n2. **Code Reviewer** — review kode Python dan berikan saran perbaikan\n3. **Story Writer** — tulis cerita pendek bergenre fantasi\n\nIngat untuk gunakan: context, task, format, constraints, dan contoh jika perlu.',
            content_en: '### Exercise\nCreate optimal prompts for:\n\n1. **Email Generator** — write a follow-up email after an interview\n2. **Code Reviewer** — review Python code and suggest improvements\n3. **Story Writer** — write a fantasy short story\n\nRemember to use: context, task, format, constraints, and examples if needed.',
            xp_reward: 20
          },
          {
            id: 'intermediate-m4-q5', level_id: 'intermediate', module_id: 'intermediate-m4', order: 5, type: 'checkpoint',
            title_id: '🎯 Checkpoint: Prompt Battle', title_en: '🎯 Checkpoint: Prompt Battle',
            description_id: 'Rubric-scored prompt challenge.', description_en: 'Rubric-scored prompt challenge.',
            content_id: 'Jawab pertanyaan berikut.', content_en: 'Answer the following questions.',
            xp_reward: 40,
            quiz_questions: [
              {
                id: 'intermediate-m4-q5-1',
                question_id: 'Teknik mana yang paling efektif untuk membuat AI menunjukkan proses berpikirnya?',
                question_en: 'Which technique is most effective for making AI show its reasoning?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Chain-of-Thought Prompting', text_en: 'Chain-of-Thought Prompting', is_correct: true },
                  { id: 'b', text_id: 'Zero-shot Prompting', text_en: 'Zero-shot Prompting', is_correct: false },
                  { id: 'c', text_id: 'Temperature tinggi', text_en: 'High temperature', is_correct: false }
                ],
                explanation_id: 'Benar! CoT meminta AI menunjukkan langkah berpikirnya.',
                explanation_en: 'Correct! CoT asks AI to show its thinking steps.'
              }
            ]
          }
        ]
      },
      {
        id: 'intermediate-m5',
        level_id: 'intermediate',
        order: 5,
        title_id: 'Working With APIs',
        title_en: 'Working With APIs',
        description_id: 'Menggunakan AI API untuk membangun aplikasi.',
        description_en: 'Using AI APIs to build applications.',
        quests: [
          {
            id: 'intermediate-m5-q1', level_id: 'intermediate', module_id: 'intermediate-m5', order: 1, type: 'lesson',
            title_id: 'Intro to AI APIs', title_en: 'Intro to AI APIs',
            description_id: 'API keys, endpoints, dan request/response.', description_en: 'API keys, endpoints, and request/response.',
            content_id: '**API** (Application Programming Interface) adalah cara aplikasi berkomunikasi dengan AI model.\n\n### Komponen API\n- **API Key** — kunci identifikasi\n- **Endpoint** — URL tujuan request\n- **Request** — data yang dikirim\n- **Response** — data yang diterima\n\n> API memungkinkan kamu menggunakan AI tanpa membangun model dari nol.',
            content_en: '**API** (Application Programming Interface) is how applications communicate with AI models.\n\n### API Components\n- **API Key** — identification key\n- **Endpoint** — request destination URL\n- **Request** — data sent\n- **Response** — data received\n\n> APIs let you use AI without building models from scratch.',
            xp_reward: 20
          },
          {
            id: 'intermediate-m5-q2', level_id: 'intermediate', module_id: 'intermediate-m5', order: 2, type: 'lesson',
            title_id: 'Your First API Call', title_en: 'Your First API Call',
            description_id: 'Panduan langkah demi langkah membuat API call.', description_en: 'Step-by-step guide to making an API call.',
            content_id: '### Contoh API Call (OpenAI)\n\n```json\nPOST https://api.openai.com/v1/chat/completions\nHeaders: Authorization: Bearer YOUR_API_KEY\nBody: {\n  "model": "gpt-4",\n  "messages": [{"role": "user", "content": "Hello!"}]\n}\n```\n\n### Response\n```json\n{"choices": [{"message": {"content": "Hello! How can I help?"}]}\n```',
            content_en: '### Example API Call (OpenAI)\n\n```json\nPOST https://api.openai.com/v1/chat/completions\nHeaders: Authorization: Bearer YOUR_API_KEY\nBody: {\n  "model": "gpt-4",\n  "messages": [{"role": "user", "content": "Hello!"}]\n}\n```\n\n### Response\n```json\n{"choices": [{"message": {"content": "Hello! How can I help?"}}]}\n```',
            xp_reward: 20
          },
          {
            id: 'intermediate-m5-q3', level_id: 'intermediate', module_id: 'intermediate-m5', order: 3, type: 'lesson',
            title_id: 'Key Parameters', title_en: 'Key Parameters',
            description_id: 'Temperature, max tokens, dan parameter lainnya.', description_en: 'Temperature, max tokens, and other parameters.',
            content_id: '### Parameter Penting\n- **Temperature** (0-2) — kreativitas. 0 = deterministik, 2 = sangat kreatif\n- **Max Tokens** — batas panjang output\n- **Top P** — alternatif temperature\n- **Stop Sequences** — kapan harus berhenti\n\n> Temperature rendah = konsisten. Temperature tinggi = kreatif.',
            content_en: '### Important Parameters\n- **Temperature** (0-2) — creativity. 0 = deterministic, 2 = very creative\n- **Max Tokens** — output length limit\n- **Top P** — alternative to temperature\n- **Stop Sequences** — when to stop\n\n> Low temperature = consistent. High temperature = creative.',
            xp_reward: 20
          },
          {
            id: 'intermediate-m5-q4', level_id: 'intermediate', module_id: 'intermediate-m5', order: 4, type: 'checkpoint',
            title_id: '🎯 Checkpoint: Mini Chatbot Project', title_en: '🎯 Checkpoint: Mini Chatbot Project',
            description_id: 'Bangun chatbot sederhana menggunakan API.', description_en: 'Build a simple chatbot using the API.',
            content_id: 'Jawab pertanyaan berikut.', content_en: 'Answer the following questions.',
            xp_reward: 40,
            quiz_questions: [
              {
                id: 'intermediate-m5-q4-1',
                question_id: 'Jika kamu ingin output AI yang konsisten dan prediktif, parameter apa yang harus diatur rendah?',
                question_en: 'If you want consistent and predictable AI output, which parameter should be set low?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Temperature', text_en: 'Temperature', is_correct: true },
                  { id: 'b', text_id: 'Max Tokens', text_en: 'Max Tokens', is_correct: false },
                  { id: 'c', text_id: 'API Key', text_en: 'API Key', is_correct: false }
                ],
                explanation_id: 'Benar! Temperature rendah = output lebih deterministik.',
                explanation_en: 'Correct! Low temperature = more deterministic output.'
              }
            ]
          }
        ]
      },
      {
        id: 'intermediate-m6',
        level_id: 'intermediate',
        order: 6,
        title_id: 'Penutup',
        title_en: 'Wrap-up',
        description_id: 'Review akhir Level Menengah.',
        description_en: 'Final review of Intermediate Level.',
        quests: [
          {
            id: 'intermediate-m6-q1', level_id: 'intermediate', module_id: 'intermediate-m6', order: 1, type: 'final_review',
            title_id: '🏁 Final Review — Neural Ninja Badge', title_en: '🏁 Final Review — Neural Ninja Badge',
            description_id: 'Review kumulatif seluruh Level Menengah.', description_en: 'Cumulative review of the entire Intermediate Level.',
            content_id: 'Selesaikan review ini untuk mendapatkan lencana **Neural Ninja**!',
            content_en: 'Complete this review to earn the **Neural Ninja** badge!',
            xp_reward: 60,
            quiz_questions: [
              {
                id: 'intermediate-m6-q1-1',
                question_id: 'Teknik RL (Reinforcement Learning) terinspirasi dari konsep apa?',
                question_en: 'What concept inspired Reinforcement Learning (RL)?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Reward dan punishment dalam belajar', text_en: 'Reward and punishment in learning', is_correct: true },
                  { id: 'b', text_id: 'Pengelompokan data', text_en: 'Data clustering', is_correct: false },
                  { id: 'c', text_id: 'Penerjemahan bahasa', text_en: 'Language translation', is_correct: false }
                ],
                explanation_id: 'Benar! RL terinspirasi dari reward/punforcement.',
                explanation_en: 'Correct! RL is inspired by reward/punishment.'
              },
              {
                id: 'intermediate-m6-q1-2',
                question_id: 'Chain-of-Thought Prompting paling berguna untuk?',
                question_en: 'Chain-of-Thought Prompting is most useful for?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Tugas yang butuh reasoning multi-step', text_en: 'Tasks requiring multi-step reasoning', is_correct: true },
                  { id: 'b', text_id: 'Menerjemahkan bahasa', text_en: 'Translating languages', is_correct: false },
                  { id: 'c', text_id: 'Membuat judul', text_en: 'Creating titles', is_correct: false }
                ],
                explanation_id: 'Benar! CoT paling efektif untuk reasoning kompleks.',
                explanation_en: 'Correct! CoT is most effective for complex reasoning.'
              }
            ]
          }
        ]
      }
    ]
  },

  // =============================================
  // ADVANCED — Understanding the Foundations (22 quests)
  // =============================================
  {
    id: 'advanced',
    order: 3,
    emoji: '🚀',
    title_id: 'Lanjut',
    title_en: 'Advanced',
    theme_id: 'Memahami Fondasi',
    theme_en: 'Understanding the Foundations',
    badge_name_id: 'Arsitek AI',
    badge_name_en: 'AI Architect',
    badge_icon: '🏗️',
    modules: [
      {
        id: 'advanced-m1',
        level_id: 'advanced',
        order: 1,
        title_id: 'Arsitektur Neural Network',
        title_en: 'Neural Network Architectures',
        description_id: 'CNN, RNN, dan Transformer — arsitektur utama AI modern.',
        description_en: 'CNN, RNN, and Transformer — main architectures of modern AI.',
        quests: [
          {
            id: 'advanced-m1-q1', level_id: 'advanced', module_id: 'advanced-m1', order: 1, type: 'lesson',
            title_id: 'CNN (Convolutional Neural Networks)', title_en: 'CNN (Convolutional Neural Networks)',
            description_id: 'Arsitektur untuk pemrosesan gambar.', description_en: 'Architecture for image processing.',
            content_id: '**CNN** adalah neural network yang dirancang khusus untuk memproses data berbentuk grid (seperti gambar).\n\n### Komponen Utama\n- **Convolutional Layer** — mengekstrak fitur dari gambar\n- **Pooling Layer** — menyederhanakan data\n- **Fully Connected Layer** — membuat keputusan akhir\n\n> CNN terinspirasi dari cara mata manusia melihat — dari fitur sederhana ke kompleks.',
            content_en: '**CNN** is a neural network designed specifically for grid-shaped data (like images).\n\n### Main Components\n- **Convolutional Layer** — extracts features from images\n- **Pooling Layer** — simplifies data\n- **Fully Connected Layer** — makes final decisions\n\n> CNNs are inspired by how the human eye sees — from simple to complex features.',
            xp_reward: 20
          },
          {
            id: 'advanced-m1-q2', level_id: 'advanced', module_id: 'advanced-m1', order: 2, type: 'lesson',
            title_id: 'RNN & LSTM', title_en: 'RNN & LSTM',
            description_id: 'Arsitektur untuk data sekuensial.', description_en: 'Architecture for sequential data.',
            content_id: '**RNN** (Recurrent Neural Network) memproses data secara berurutan — memiliki "memori".\n\n### Masalah RNN\n- Vanishing gradient — sulit belajar dari data jangka panjang\n\n### Solusi: LSTM\n- **Long Short-Term Memory** — punya mekanisme "gate" untuk mengontrol alur informasi\n- Lebih baik menangani dependensi jangka panjang\n\n> LSTM sempat jadi standar untuk NLP sebelum Transformer.',
            content_en: '**RNN** (Recurrent Neural Network) processes data sequentially — has "memory".\n\n### RNN Problem\n- Vanishing gradient — hard to learn from long-range data\n\n### Solution: LSTM\n- **Long Short-Term Memory** — has "gate" mechanisms to control information flow\n- Better at handling long-range dependencies\n\n> LSTM was the NLP standard before Transformers.',
            xp_reward: 20
          },
          {
            id: 'advanced-m1-q3', level_id: 'advanced', module_id: 'advanced-m1', order: 3, type: 'lesson',
            title_id: 'Transformer Architecture', title_en: 'Transformer Architecture',
            description_id: 'Arsitektur di balik semua LLM modern.', description_en: 'The architecture behind all modern LLMs.',
            content_id: '**Transformer** diperkenalkan dalam paper "Attention Is All You Need" (2017).\n\n### Keunggulan\n- **Parallel processing** — bisa memproses semua posisi sekaligus\n- **Self-attention** — memahami konteks seluruh input\n- **Scalability** — bisa dilatih dengan data sangat besar\n\n### Komponen\n- **Encoder** — memahami input\n- **Decoder** — menghasilkan output\n- **Attention Mechanism** — fokus pada bagian yang relevan\n\n> Transformer adalah fondasi GPT, Claude, Gemini, dan semua LLM modern.',
            content_en: '**Transformer** was introduced in "Attention Is All You Need" (2017).\n\n### Advantages\n- **Parallel processing** — processes all positions simultaneously\n- **Self-attention** — understands full input context\n- **Scalability** — can be trained on massive data\n\n### Components\n- **Encoder** — understands input\n- **Decoder** — generates output\n- **Attention Mechanism** — focuses on relevant parts\n\n> Transformer is the foundation of GPT, Claude, Gemini, and all modern LLMs.',
            xp_reward: 20
          },
          {
            id: 'advanced-m1-q4', level_id: 'advanced', module_id: 'advanced-m1', order: 4, type: 'checkpoint',
            title_id: '🎯 Checkpoint: Compare All Three', title_en: '🎯 Checkpoint: Compare All Three',
            description_id: 'Bandingkan CNN, RNN, dan Transformer.', description_en: 'Compare CNN, RNN, and Transformer.',
            content_id: 'Jawab pertanyaan berikut.', content_en: 'Answer the following questions.',
            xp_reward: 40,
            quiz_questions: [
              {
                id: 'advanced-m1-q4-1',
                question_id: 'Arsitektur mana yang menjadi fondasi ChatGPT?',
                question_en: 'Which architecture is the foundation of ChatGPT?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'CNN', text_en: 'CNN', is_correct: false },
                  { id: 'b', text_id: 'RNN', text_en: 'RNN', is_correct: false },
                  { id: 'c', text_id: 'Transformer', text_en: 'Transformer', is_correct: true }
                ],
                explanation_id: 'Benar! Transformer adalah fondasi semua LLM modern.',
                explanation_en: 'Correct! Transformer is the foundation of all modern LLMs.'
              }
            ]
          }
        ]
      },
      {
        id: 'advanced-m2',
        level_id: 'advanced',
        order: 2,
        title_id: 'Mekanisme Attention',
        title_en: 'Attention Mechanism',
        description_id: 'Deep dive ke mekanisme yang mengubah AI.', description_en: 'Deep dive into the mechanism that changed AI.',
        quests: [
          {
            id: 'advanced-m2-q1', level_id: 'advanced', module_id: 'advanced-m2', order: 1, type: 'lesson',
            title_id: 'Apa itu Attention?', title_en: 'What is Attention?',
            description_id: 'Mengapa attention adalah breakthrough.', description_en: 'Why attention was a breakthrough.',
            content_id: '**Attention** adalah mekanisme yang memungkinkan model fokus pada bagian input yang paling relevan saat menghasilkan output.\n\n### Sebelum Attention\n- RNN memproses kata satu per satu → lambat, kehilangan konteks\n\n### Sesudah Attention\n- Model bisa melihat SEMUA input sekaligus dan memutuskan mana yang penting\n\n> Attention adalah alasan Transformer bisa mengalahkan RNN.',
            content_en: '**Attention** is a mechanism that lets a model focus on the most relevant parts of input when generating output.\n\n### Before Attention\n- RNN processed words one by one → slow, lost context\n\n### After Attention\n- Model can see ALL input simultaneously and decide what\'s important\n\n> Attention is why Transformers outperform RNNs.',
            xp_reward: 20
          },
          {
            id: 'advanced-m2-q2', level_id: 'advanced', module_id: 'advanced-m2', order: 2, type: 'lesson',
            title_id: 'Self-Attention Step by Step', title_en: 'Self-Attention Step by Step',
            description_id: 'Bagaimana self-attention bekerja secara detail.', description_en: 'How self-attention works in detail.',
            content_id: '### Self-Attention\nSetiap token menghitung skor relevansi dengan semua token lain.\n\n### 3 Komponen\n- **Query (Q)** — "Apa yang saya cari?"\n- **Key (K)** — "Apa yang saya tawarkan?"\n- **Value (V)** — "Apa informasi yang saya punya?"\n\n### Formula Sederhana\nAttention(Q,K,V) = softmax(QK^T / √d) × V\n\n> Self-attention membuat model memahami relasi antar kata dalam satu kalimat.',
            content_en: '### Self-Attention\nEach token calculates relevance scores with all other tokens.\n\n### 3 Components\n- **Query (Q)** — "What am I looking for?"\n- **Key (K)** — "What do I offer?"\n- **Value (V)** — "What information do I have?"\n\n### Simple Formula\nAttention(Q,K,V) = softmax(QK^T / √d) × V\n\n> Self-attention helps models understand relationships between words in a sentence.',
            xp_reward: 20
          },
          {
            id: 'advanced-m2-q3', level_id: 'advanced', module_id: 'advanced-m2', order: 3, type: 'lesson',
            title_id: 'Why Transformers Parallelize Well', title_en: 'Why Transformers Parallelize Well',
            description_id: 'Mengapa Transformer bisa dilatih jauh lebih cepat.', description_en: 'Why Transformers can be trained much faster.',
            content_id: '### Parallelisasi\n- RNN harus proses sekuensial (kata 1 → kata 2 → kata 3)\n- Transformer proses semua posisi **sekaligus**\n\n### Dampak\n- Training jauh lebih cepat\n- Bisa gunakan GPU secara efisien\n- Bisa dilatih dengan data lebih besar\n\n> Parallelisasi Transformer memungkinkah era LLM raksasa.',
            content_en: '### Parallelization\n- RNN must process sequentially (word 1 → word 2 → word 3)\n- Transformer processes all positions **simultaneously**\n\n### Impact\n- Training is much faster\n- Can use GPUs efficiently\n- Can be trained on larger data\n\n> Transformer parallelization enabled the era of giant LLMs.',
            xp_reward: 20
          },
          {
            id: 'advanced-m2-q4', level_id: 'advanced', module_id: 'advanced-m2', order: 4, type: 'checkpoint',
            title_id: '🎯 Checkpoint: Attention Summary', title_en: '🎯 Checkpoint: Attention Summary',
            description_id: 'Ringkasan panduan "Attention Is All You Need".', description_en: 'Guided summary of "Attention Is All You Need".',
            content_id: 'Jawab pertanyaan berikut.', content_en: 'Answer the following questions.',
            xp_reward: 40,
            quiz_questions: [
              {
                id: 'advanced-m2-q4-1',
                question_id: 'Dalam self-attention, Q, K, V masing-masing berarti?',
                question_en: 'In self-attention, what do Q, K, V stand for?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Query, Key, Value', text_en: 'Query, Key, Value', is_correct: true },
                  { id: 'b', text_id: 'Quality, Knowledge, Vision', text_en: 'Quality, Knowledge, Vision', is_correct: false },
                  { id: 'c', text_id: 'Quick, Kernel, Vector', text_en: 'Quick, Kernel, Vector', is_correct: false }
                ],
                explanation_id: 'Benar! Q=Query, K=Key, V=Value.',
                explanation_en: 'Correct! Q=Query, K=Key, V=Value.'
              }
            ]
          }
        ]
      },
      {
        id: 'advanced-m3',
        level_id: 'advanced',
        order: 3,
        title_id: 'Adapting AI to Real Needs',
        title_en: 'Adapting AI to Real Needs',
        description_id: 'Fine-tuning dan RAG untuk kebutuhan spesifik.',
        description_en: 'Fine-tuning and RAG for specific needs.',
        quests: [
          {
            id: 'advanced-m3-q1', level_id: 'advanced', module_id: 'advanced-m3', order: 1, type: 'lesson',
            title_id: 'Fine-tuning', title_en: 'Fine-tuning',
            description_id: 'Menyesuaikan model dengan data spesifik.', description_en: 'Customizing models with specific data.',
            content_id: '**Fine-tuning** adalah proses melatih ulang model yang sudah ada dengan data spesifik.\n\n### Kapan Fine-tuning?\n- Butuh output dengan gaya/format tertentu\n- Domain spesifik (medis, hukum)\n- Ingin performa lebih baik dari base model\n\n### Cara Kerja\n1. Kumpulkan data spesifik\n2. Fine-tune model pre-trained\n3. Evaluasi dan deploy',
            content_en: '**Fine-tuning** is retraining an existing model with specific data.\n\n### When to Fine-tune?\n- Need output in specific style/format\n- Specific domain (medical, legal)\n- Want better performance than base model\n\n### How It Works\n1. Collect specific data\n2. Fine-tune pre-trained model\n3. Evaluate and deploy',
            xp_reward: 20
          },
          {
            id: 'advanced-m3-q2', level_id: 'advanced', module_id: 'advanced-m3', order: 2, type: 'lesson',
            title_id: 'RAG (Retrieval-Augmented Generation)', title_en: 'RAG (Retrieval-Augmented Generation)',
            description_id: 'Menggabungkan LLM dengan database pengetahuan.', description_en: 'Combining LLMs with knowledge databases.',
            content_id: '**RAG** adalah teknik yang menggabungkan pencarian informasi dengan generasi teks.\n\n### Cara Kerja\n1. User bertanya\n2. Sistem mencari dokumen relevan dari database\n3. Dokumen + pertanyaan dikirim ke LLM\n4. LLM menjawab berdasarkan dokumen tersebut\n\n### Keunggulan\n- Mengurangi hallucination\n- Selalu pakai informasi terkini\n- Bisa pakai data private',
            content_en: '**RAG** combines information retrieval with text generation.\n\n### How It Works\n1. User asks a question\n2. System searches for relevant documents from database\n3. Documents + question sent to LLM\n4. LLM answers based on those documents\n\n### Advantages\n- Reduces hallucination\n- Always uses current information\n- Can use private data',
            xp_reward: 20
          },
          {
            id: 'advanced-m3-q3', level_id: 'advanced', module_id: 'advanced-m3', order: 3, type: 'lesson',
            title_id: 'Fine-tuning vs RAG', title_en: 'Fine-tuning vs RAG',
            description_id: 'Kapan menggunakan yang mana.', description_en: 'When to use which.',
            content_id: '### Fine-tuning\n✅ Untuk perubahan gaya/format output\n✅ Untuk domain yang sangat spesifik\n❌ Butuh data dan biaya training\n\n### RAG\n✅ Untuk pertanyaan berbasis fakta\n✅ Data yang sering berubah\n✅ Implementasi lebih cepat\n❌ Bergantung kualitas retrieval\n\n> Kombinasi keduanya sering menjadi solusi terbaik.',
            content_en: '### Fine-tuning\n✅ For output style/format changes\n✅ For very specific domains\n❌ Requires data and training costs\n\n### RAG\n✅ For fact-based questions\n✅ Frequently changing data\n✅ Faster to implement\n❌ Depends on retrieval quality\n\n> Combining both is often the best solution.',
            xp_reward: 20
          },
          {
            id: 'advanced-m3-q4', level_id: 'advanced', module_id: 'advanced-m3', order: 4, type: 'lesson',
            title_id: 'Practice: Sketch a RAG Flow', title_en: 'Practice: Sketch a RAG Flow',
            description_id: 'Rancang alur RAG sederhana.', description_en: 'Design a simple RAG flow.',
            content_id: '### Latihan\nRancang alur RAG untuk:\n\n**Kasus: Chatbot FAQ untuk toko online**\n\n1. Apa sumber data kamu?\n2. Bagaimana cara indexing dokumen?\n3. Bagaimana proses retrieval?\n4. Bagaimana integrasi dengan LLM?\n5. Bagaimana evaluasi jawaban?',
            content_en: '### Exercise\nDesign a RAG flow for:\n\n**Case: FAQ chatbot for an online store**\n\n1. What is your data source?\n2. How do you index documents?\n3. How does retrieval work?\n4. How does it integrate with the LLM?\n5. How do you evaluate answers?',
            xp_reward: 20
          },
          {
            id: 'advanced-m3-q5', level_id: 'advanced', module_id: 'advanced-m3', order: 5, type: 'checkpoint',
            title_id: '🎯 Checkpoint: Pick the Right Solution', title_en: '🎯 Checkpoint: Pick the Right Solution',
            description_id: 'Pilih solusi yang tepat untuk skenario bisnis.', description_en: 'Choose the right solution for business scenarios.',
            content_id: 'Jawab pertanyaan berikut.', content_en: 'Answer the following questions.',
            xp_reward: 40,
            quiz_questions: [
              {
                id: 'advanced-m3-q5-1',
                question_id: 'Kamu butuh chatbot yang menjawab pertanyaan dari 10.000 dokumen internal perusahaan. Solusi terbaik?',
                question_en: 'You need a chatbot answering questions from 10,000 internal company documents. Best solution?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Fine-tuning LLM dengan semua dokumen', text_en: 'Fine-tune LLM with all documents', is_correct: false },
                  { id: 'b', text_id: 'RAG dengan vector database', text_en: 'RAG with vector database', is_correct: true },
                  { id: 'c', text_id: 'Training model dari nol', text_en: 'Train model from scratch', is_correct: false }
                ],
                explanation_id: 'Benar! RAG lebih cocok untuk pertanyaan berbasis fakta dari banyak dokumen.',
                explanation_en: 'Correct! RAG is better for fact-based questions from many documents.'
              }
            ]
          }
        ]
      },
      {
        id: 'advanced-m4',
        level_id: 'advanced',
        order: 4,
        title_id: 'AI Agents',
        title_en: 'AI Agents',
        description_id: 'AI yang bisa bertindak, bukan hanya menjawab.',
        description_en: 'AI that can act, not just answer.',
        quests: [
          {
            id: 'advanced-m4-q1', level_id: 'advanced', module_id: 'advanced-m4', order: 1, type: 'lesson',
            title_id: 'What is an AI Agent', title_en: 'What is an AI Agent',
            description_id: 'AI yang bisa mengambil tindakan secara otonom.', description_en: 'AI that can take autonomous actions.',
            content_id: '**AI Agent** adalah AI yang tidak hanya menjawab pertanyaan, tetapi bisa mengambil tindakan untuk mencapai tujuan.\n\n### Perbedaan dengan Chatbot\n- Chatbot: tanya → jawab\n- Agent: tujuan → rencana → eksekusi → evaluasi\n\n### Contoh\n- Coding assistant yang menulis kode, menjalankan test, dan memperbaiki error\n- AI yang memesan hotel berdasarkan preferensi kamu',
            content_en: '**AI Agent** is AI that doesn\'t just answer questions but can take actions to achieve goals.\n\n### Difference from Chatbot\n- Chatbot: ask → answer\n- Agent: goal → plan → execute → evaluate\n\n### Examples\n- Coding assistant that writes code, runs tests, and fixes errors\n- AI that books hotels based on your preferences',
            xp_reward: 20
          },
          {
            id: 'advanced-m4-q2', level_id: 'advanced', module_id: 'advanced-m4', order: 2, type: 'lesson',
            title_id: 'Tool Use & Function Calling', title_en: 'Tool Use & Function Calling',
            description_id: 'Bagaimana AI menggunakan tools eksternal.', description_en: 'How AI uses external tools.',
            content_id: '**Function Calling** memungkinkan LLM memanggil fungsi/code dari tools eksternal.\n\n### Cara Kerja\n1. LLM menerima request\n2. LLM memutuskan perlu tool apa\n3. LLM generate parameter yang benar\n4. Sistem menjalankan fungsi\n5. Hasil dikembalikan ke LLM\n\n### Contoh Tools\n- Web search\n- Calculator\n- Database query\n- API calls',
            content_en: '**Function Calling** enables LLMs to call external tool functions/code.\n\n### How It Works\n1. LLM receives request\n2. LLM decides what tool is needed\n3. LLM generates correct parameters\n4. System executes the function\n5. Results returned to LLM\n\n### Example Tools\n- Web search\n- Calculator\n- Database query\n- API calls',
            xp_reward: 20
          },
          {
            id: 'advanced-m4-q3', level_id: 'advanced', module_id: 'advanced-m4', order: 3, type: 'lesson',
            title_id: 'Real-world Agent Case Studies', title_en: 'Real-world Agent Case Studies',
            description_id: 'Coding assistants dan automation.', description_en: 'Coding assistants and automation.',
            content_id: '### Studi Kasus\n\n**1. Coding Assistants (Cursor, GitHub Copilot)**\n- Menulis kode berdasarkan deskripsi\n- Debug dan fix error secara otonom\n- Refactor code dengan instruksi natural language\n\n**2. Workflow Automation (Zapier AI, Make)**\n- Automate repetitive tasks\n- Integrasi antar aplikasi dengan AI\n\n**3. Customer Service Agents**\n- Menjawab pertanyaan kompleks\n- Mengambil tindakan (refund, upgrade)',
            content_en: '### Case Studies\n\n**1. Coding Assistants (Cursor, GitHub Copilot)**\n- Write code from descriptions\n- Debug and fix errors autonomously\n- Refactor code with natural language instructions\n\n**2. Workflow Automation (Zapier AI, Make)**\n- Automate repetitive tasks\n- Cross-app integration with AI\n\n**3. Customer Service Agents**\n- Answer complex questions\n- Take actions (refund, upgrade)',
            xp_reward: 20
          },
          {
            id: 'advanced-m4-q4', level_id: 'advanced', module_id: 'advanced-m4', order: 4, type: 'checkpoint',
            title_id: '🎯 Checkpoint: Design an Agent Flow', title_en: '🎯 Checkpoint: Design an Agent Flow',
            description_id: 'Rancang alur agent sederhana.', description_en: 'Design a simple agent flow.',
            content_id: 'Jawab pertanyaan berikut.', content_en: 'Answer the following questions.',
            xp_reward: 40,
            quiz_questions: [
              {
                id: 'advanced-m4-q4-1',
                question_id: 'Apa perbedaan utama chatbot dan AI agent?',
                question_en: 'What is the main difference between a chatbot and an AI agent?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Agent bisa mengambil tindakan untuk mencapai tujuan', text_en: 'Agent can take actions to achieve goals', is_correct: true },
                  { id: 'b', text_id: 'Chatbot lebih canggih dari agent', text_en: 'Chatbot is more advanced than agent', is_correct: false },
                  { id: 'c', text_id: 'Tidak ada perbedaan', text_en: 'No difference', is_correct: false }
                ],
                explanation_id: 'Benar! Agent bisa bertindak, chatbot hanya menjawab.',
                explanation_en: 'Correct! Agents can act, chatbots only answer.'
              }
            ]
          }
        ]
      },
      {
        id: 'advanced-m5',
        level_id: 'advanced',
        order: 5,
        title_id: 'Evaluation & Limitations',
        title_en: 'Evaluation & Limitations',
        description_id: 'Cara mengevaluasi AI dan memahami batasannya.',
        description_en: 'How to evaluate AI and understand its limitations.',
        quests: [
          {
            id: 'advanced-m5-q1', level_id: 'advanced', module_id: 'advanced-m5', order: 1, type: 'lesson',
            title_id: 'Model Evaluation', title_en: 'Model Evaluation',
            description_id: 'Cara mengukur "bagus" sebuah model.', description_en: 'How to measure how "good" a model is.',
            content_id: '### Metrik Evaluasi\n- **Accuracy** — persentase jawaban benar\n- **F1 Score** — keseimbangan precision dan recall\n- **BLEU Score** — kualitas terjemahan\n- **Human Evaluation** — penilaian manusia langsung\n\n> Tidak ada metrik tunggal yang sempurna — gunakan kombinasi.',
            content_en: '### Evaluation Metrics\n- **Accuracy** — percentage of correct answers\n- **F1 Score** — balance of precision and recall\n- **BLEU Score** — translation quality\n- **Human Evaluation** — direct human assessment\n\n> No single metric is perfect — use a combination.',
            xp_reward: 20
          },
          {
            id: 'advanced-m5-q2', level_id: 'advanced', module_id: 'advanced-m5', order: 2, type: 'lesson',
            title_id: 'Why AI Hallucinates (Deeper)', title_en: 'Why AI Hallucinates (Deeper)',
            description_id: 'Penjelasan mendalam tentang hallucination.', description_en: 'In-depth explanation of hallucination.',
            content_id: '### Mengapa Hallucination Terjadi\n\n1. **Training data** — model belajar dari data yang mungkin salah\n2. **Probabilistic nature** — model memilih kata berikutnya berdasarkan probabilitas\n3. **No factual grounding** — model tidak punya akses ke fakta real-time\n4. **Optimization target** — dilatih untuk koheren, bukan akurat\n\n### Strategi Mitigasi\n- RAG (retrieval-augmented generation)\n- Grounding dengan source documents\n- Temperature rendah\n- Human-in-the-loop',
            content_en: '### Why Hallucination Happens\n\n1. **Training data** — model learns from possibly wrong data\n2. **Probabilistic nature** — model picks next word based on probability\n3. **No factual grounding** — model has no access to real-time facts\n4. **Optimization target** — trained for coherence, not accuracy\n\n### Mitigation Strategies\n- RAG (retrieval-augmented generation)\n- Grounding with source documents\n- Low temperature\n- Human-in-the-loop',
            xp_reward: 20
          },
          {
            id: 'advanced-m5-q3', level_id: 'advanced', module_id: 'advanced-m5', order: 3, type: 'lesson',
            title_id: 'How to Read an AI Paper', title_en: 'How to Read an AI Paper',
            description_id: 'Struktur paper AI dan cara membacanya.', description_en: 'AI paper structure and how to read them.',
            content_id: '### Struktur Paper AI\n1. **Abstract** — ringkasan singkat (baca ini dulu)\n2. **Introduction** — masalah yang diselesaikan\n3. **Method** — pendekatan yang digunakan\n4. **Experiments** — hasil dan evaluasi\n5. **Conclusion** — kesimpulan\n\n### Tips Membaca\n- Mulai dari Abstract → Conclusion → Method\n- Tidak perlu pahami semua matematika di awal\n- Cari figure dan tabel untuk gambaran cepat',
            content_en: '### AI Paper Structure\n1. **Abstract** — brief summary (read this first)\n2. **Introduction** — problem being solved\n3. **Method** — approach used\n4. **Experiments** — results and evaluation\n5. **Conclusion** — summary\n\n### Reading Tips\n- Start with Abstract → Conclusion → Method\n- Don\'t need to understand all math initially\n- Look for figures and tables for quick overview',
            xp_reward: 20
          },
          {
            id: 'advanced-m5-q4', level_id: 'advanced', module_id: 'advanced-m5', order: 4, type: 'checkpoint',
            title_id: '🎯 Checkpoint: Read & Summarize', title_en: '🎯 Checkpoint: Read & Summarize',
            description_id: 'Baca dan ringkaskan satu abstrak paper populer.', description_en: 'Read and summarize one popular paper abstract.',
            content_id: 'Jawab pertanyaan berikut.', content_en: 'Answer the following questions.',
            xp_reward: 40,
            quiz_questions: [
              {
                id: 'advanced-m5-q4-1',
                question_id: 'Saat membaca paper AI, apa yang harus dibaca pertama kali?',
                question_en: 'When reading an AI paper, what should you read first?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Abstract', text_en: 'Abstract', is_correct: true },
                  { id: 'b', text_id: 'Method section', text_en: 'Method section', is_correct: false },
                  { id: 'c', text_id: 'References', text_en: 'References', is_correct: false }
                ],
                explanation_id: 'Benar! Abstract memberikan gambaran keseluruhan paper.',
                explanation_en: 'Correct! Abstract gives an overview of the entire paper.'
              }
            ]
          }
        ]
      },
      {
        id: 'advanced-m6',
        level_id: 'advanced',
        order: 6,
        title_id: 'Penutup',
        title_en: 'Wrap-up',
        description_id: 'Review akhir Level Lanjut.',
        description_en: 'Final review of Advanced Level.',
        quests: [
          {
            id: 'advanced-m6-q1', level_id: 'advanced', module_id: 'advanced-m6', order: 1, type: 'final_review',
            title_id: '🏁 Final Review + RAG Project', title_en: '🏁 Final Review + RAG Project',
            description_id: 'Bangun RAG sederhana → dapat lencana AI Architect!', description_en: 'Build a simple RAG → earn AI Architect badge!',
            content_id: 'Selesaikan review ini dan bangun RAG sederhana untuk mendapatkan lencana **AI Architect**!',
            content_en: 'Complete this review and build a simple RAG to earn the **AI Architect** badge!',
            xp_reward: 60,
            quiz_questions: [
              {
                id: 'advanced-m6-q1-1',
                question_id: 'RAG menggabungkan LLM dengan apa?',
                question_en: 'RAG combines LLMs with what?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Database pengetahuan dan retrieval', text_en: 'Knowledge database and retrieval', is_correct: true },
                  { id: 'b', text_id: 'Neural network baru', text_en: 'New neural network', is_correct: false },
                  { id: 'c', text_id: 'Training data tambahan', text_en: 'Additional training data', is_correct: false }
                ],
                explanation_id: 'Benar! RAG = retrieval (pencarian) + generation (LLM).',
                explanation_en: 'Correct! RAG = retrieval + generation (LLM).'
              },
              {
                id: 'advanced-m6-q1-2',
                question_id: 'Apa keunggulan utama Transformer dibanding RNN?',
                question_en: 'What is Transformer\'s main advantage over RNN?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Bisa diproses paralel', text_en: 'Can be processed in parallel', is_correct: true },
                  { id: 'b', text_id: 'Lebih kecil ukurannya', text_en: 'Smaller in size', is_correct: false },
                  { id: 'c', text_id: 'Tidak butuh data', text_en: 'Doesn\'t need data', is_correct: false }
                ],
                explanation_id: 'Benar! Transformer bisa diproses paralel, membuat training jauh lebih cepat.',
                explanation_en: 'Correct! Transformers can be processed in parallel, making training much faster.'
              }
            ]
          }
        ]
      }
    ]
  },

  // =============================================
  // NEXT LEVEL — Staying Current With Research (18 quests)
  // =============================================
  {
    id: 'next-level',
    order: 4,
    emoji: '🏆',
    title_id: 'Next Level',
    title_en: 'Next Level',
    theme_id: 'Mengikuti Penelitian',
    theme_en: 'Staying Current With Research',
    badge_name_id: 'Master AI',
    badge_name_en: 'AI Master',
    badge_icon: '👑',
    modules: [
      {
        id: 'nextlevel-m1',
        level_id: 'next-level',
        order: 1,
        title_id: 'State of the Art',
        title_en: 'State of the Art',
        description_id: 'Lanskap LLM saat ini dan benchmark terkini.',
        description_en: 'Current LLM landscape and latest benchmarks.',
        quests: [
          {
            id: 'nextlevel-m1-q1', level_id: 'next-level', module_id: 'nextlevel-m1', order: 1, type: 'lesson',
            title_id: 'Current LLM Landscape', title_en: 'Current LLM Landscape',
            description_id: 'Siapa yang memimpin dan mengapa.', description_en: 'Who\'s leading and why.',
            content_id: '### Lanskap LLM 2024-2025\n- **OpenAI** — GPT-4o, o1, o3\n- **Anthropic** — Claude 3.5, Claude 4\n- **Google** — Gemini 2.0, Gemini Ultra\n- **Meta** — Llama 3 (open source)\n- **Mistral** — Mistral Large (open source)\n\n### Benchmark Utama\n- MMLU (Multi-task Language Understanding)\n- HumanEval (Coding)\n- MATH (Matematika)\n- Arena (Human preference)\n\n> Lanskap berubah sangat cepat — yang terbaik hari ini mungkin bukan yang terbaik bulan depan.',
            content_en: '### LLM Landscape 2024-2025\n- **OpenAI** — GPT-4o, o1, o3\n- **Anthropic** — Claude 3.5, Claude 4\n- **Google** — Gemini 2.0, Gemini Ultra\n- **Meta** — Llama 3 (open source)\n- **Mistral** — Mistral Large (open source)\n\n### Key Benchmarks\n- MMLU (Multi-task Language Understanding)\n- HumanEval (Coding)\n- MATH (Mathematics)\n- Arena (Human preference)\n\n> The landscape changes rapidly — today\'s best may not be next month\'s.',
            xp_reward: 20
          },
          {
            id: 'nextlevel-m1-q2', level_id: 'next-level', module_id: 'nextlevel-m1', order: 2, type: 'lesson',
            title_id: 'Multimodal AI', title_en: 'Multimodal AI',
            description_id: 'AI yang bisa memproses teks, gambar, suara, dan video.', description_en: 'AI that can process text, images, audio, and video.',
            content_id: '**Multimodal AI** bisa memproses dan menghasilkan berbagai jenis data.\n\n### Jenis Modalitas\n- **Teks** — NLP, terjemahan\n- **Gambar** — Computer Vision\n- **Audio** — Speech Recognition\n- **Video** — Video Understanding\n\n### Contoh\n- GPT-4o: teks + gambar + audio\n- Gemini: teks + gambar + video + audio\n\n> Multimodal = AI yang bisa "melihat", "mendengar", dan "berbicara".',
            content_en: '**Multimodal AI** can process and generate various types of data.\n\n### Modalities\n- **Text** — NLP, translation\n- **Images** — Computer Vision\n- **Audio** — Speech Recognition\n- **Video** — Video Understanding\n\n### Examples\n- GPT-4o: text + image + audio\n- Gemini: text + image + video + audio\n\n> Multimodal = AI that can "see", "hear", and "speak".',
            xp_reward: 20
          },
          {
            id: 'nextlevel-m1-q3', level_id: 'next-level', module_id: 'nextlevel-m1', order: 3, type: 'checkpoint',
            title_id: '🎯 Checkpoint: Benchmark Discussion', title_en: '🎯 Checkpoint: Benchmark Discussion',
            description_id: 'Diskusi membandingkan model terbaru.', description_en: 'Discussion comparing recent models.',
            content_id: 'Jawab pertanyaan berikut.', content_en: 'Answer the following questions.',
            xp_reward: 40,
            quiz_questions: [
              {
                id: 'nextlevel-m1-q3-1',
                question_id: 'Multimodal AI bisa memproses data apa saja?',
                question_en: 'What types of data can multimodal AI process?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Teks, gambar, audio, dan video', text_en: 'Text, images, audio, and video', is_correct: true },
                  { id: 'b', text_id: 'Hanya teks', text_en: 'Only text', is_correct: false },
                  { id: 'c', text_id: 'Hanya gambar', text_en: 'Only images', is_correct: false }
                ],
                explanation_id: 'Benar! Multimodal = multi jenis data.',
                explanation_en: 'Correct! Multimodal = multiple data types.'
              }
            ]
          }
        ]
      },
      {
        id: 'nextlevel-m2',
        level_id: 'next-level',
        order: 2,
        title_id: 'AI Safety & Alignment',
        title_en: 'AI Safety & Alignment',
        description_id: 'Mengapa keamanan AI penting dan bagaimana caranya.',
        description_en: 'Why AI safety matters and how to achieve it.',
        quests: [
          {
            id: 'nextlevel-m2-q1', level_id: 'next-level', module_id: 'nextlevel-m2', order: 1, type: 'lesson',
            title_id: 'Why AI Safety Matters', title_en: 'Why AI Safety Matters',
            description_id: 'Risiko dan tanggung jawab dalam pengembangan AI.', description_en: 'Risks and responsibilities in AI development.',
            content_id: '### Mengapa Safety Penting\n- AI semakin powerful → semakin besar dampaknya\n- Alignment problem — AI mungkin melakukan hal yang tidak kita inginkan\n- Dual use — AI bisa digunakan untuk kebaikan dan keburukan\n\n### Tipe Risiko\n- **Bias & fairness** — diskriminasi dalam keputusan\n- **Misuse** — deepfakes, disinformasi\n- **Existential risk** — AI yang melampaui kontrol manusia',
            content_en: '### Why Safety Matters\n- AI is getting more powerful → bigger impact\n- Alignment problem — AI might do things we don\'t want\n- Dual use — AI can be used for good and bad\n\n### Risk Types\n- **Bias & fairness** — discrimination in decisions\n- **Misuse** — deepfakes, disinformation\n- **Existential risk** — AI beyond human control',
            xp_reward: 20
          },
          {
            id: 'nextlevel-m2-q2', level_id: 'next-level', module_id: 'nextlevel-m2', order: 2, type: 'lesson',
            title_id: 'Current Safety Case Studies', title_en: 'Current Safety Case Studies',
            description_id: 'Studi kasus keselamatan dan alignment terkini.', description_en: 'Recent safety and alignment case studies.',
            content_id: '### Studi Kasus\n\n**1. Constitutional AI (Anthropic)**\n- AI dilatih untuk mengikuti prinsip etika\n- Self-correction tanpa human label\n\n**2. RLHF (Reinforcement Learning from Human Feedback)**\n- manusia memberi feedback pada output AI\n- digunakan oleh OpenAI, Anthropic, Google\n\n**3. Red Teaming**\n- tim khusus mencari celah keamanan AI\n- simulasi serangan untuk perkuat pertahanan',
            content_en: '### Case Studies\n\n**1. Constitutional AI (Anthropic)**\n- AI trained to follow ethical principles\n- Self-correction without human labels\n\n**2. RLHF (Reinforcement Learning from Human Feedback)**\n- humans give feedback on AI output\n- used by OpenAI, Anthropic, Google\n\n**3. Red Teaming**\n- special teams find AI security gaps\n- simulated attacks to strengthen defenses',
            xp_reward: 20
          },
          {
            id: 'nextlevel-m2-q3', level_id: 'next-level', module_id: 'nextlevel-m2', order: 3, type: 'checkpoint',
            title_id: '🎯 Checkpoint: Safety Discussion', title_en: '🎯 Checkpoint: Safety Discussion',
            description_id: 'Diskusi reflektif tentang keselamatan AI.', description_en: 'Reflective discussion on AI safety.',
            content_id: 'Jawab pertanyaan berikut.', content_en: 'Answer the following questions.',
            xp_reward: 40,
            quiz_questions: [
              {
                id: 'nextlevel-m2-q3-1',
                question_id: 'Apa itu alignment problem dalam AI?',
                question_en: 'What is the alignment problem in AI?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'AI mungkin melakukan hal yang tidak sesuai dengan tujuan manusia', text_en: 'AI might do things that don\'t align with human goals', is_correct: true },
                  { id: 'b', text_id: 'AI terlalu lambat', text_en: 'AI is too slow', is_correct: false },
                  { id: 'c', text_id: 'AI tidak bisa memahami bahasa', text_en: 'AI can\'t understand language', is_correct: false }
                ],
                explanation_id: 'Benar! Alignment = memastikan AI bertindak sesuai nilai dan tujuan manusia.',
                explanation_en: 'Correct! Alignment = ensuring AI acts according to human values and goals.'
              }
            ]
          }
        ]
      },
      {
        id: 'nextlevel-m3',
        level_id: 'next-level',
        order: 3,
        title_id: 'Building an AI Product',
        title_en: 'Building an AI Product',
        description_id: 'Dari ide hingga produk AI yang nyata.',
        description_en: 'From idea to a real AI product.',
        quests: [
          {
            id: 'nextlevel-m3-q1', level_id: 'next-level', module_id: 'nextlevel-m3', order: 1, type: 'lesson',
            title_id: 'From Idea to Product', title_en: 'From Idea to Product',
            description_id: 'Framework membangun produk AI.', description_en: 'Framework for building AI products.',
            content_id: '### Framework\n1. **Identifikasi masalah** — apa yang ingin diselesaikan?\n2. **Validasi kebutuhan** — apakah ada yang butuh?\n3. **Prototipe cepat** — MVP dalam berminggu\n4. **Uji dengan user** — dapat feedback nyata\n5. **Iterasi** — perbaiki berdasarkan feedback\n6. **Scale** — perluas setelah product-market fit',
            content_en: '### Framework\n1. **Identify problem** — what needs to be solved?\n2. **Validate need** — does anyone need it?\n3. **Rapid prototype** — MVP in weeks\n4. **Test with users** — get real feedback\n5. **Iterate** — improve based on feedback\n6. **Scale** — expand after product-market fit',
            xp_reward: 20
          },
          {
            id: 'nextlevel-m3-q2', level_id: 'next-level', module_id: 'nextlevel-m3', order: 2, type: 'lesson',
            title_id: 'Rapid Prototyping', title_en: 'Rapid Prototyping',
            description_id: 'User research dan MVP features.', description_en: 'User research and MVP features.',
            content_id: '### Rapid Prototyping\n- **User Research** — wawancara calon user\n- **User Persona** — profil target pengguna\n- **Feature Prioritization** — MoSCoW method\n- **Wireframe** — sketsa tampilan\n\n### MVP Features\n- Hanya fitur inti yang menyelesaikan masalah utama\n- Jangan sempurna — yang penting bisa diuji',
            content_en: '### Rapid Prototyping\n- **User Research** — interview potential users\n- **User Persona** — target user profiles\n- **Feature Prioritization** — MoSCoW method\n- **Wireframe** — layout sketches\n\n### MVP Features\n- Only core features that solve the main problem\n- Don\'t aim for perfection — just testable',
            xp_reward: 20
          },
          {
            id: 'nextlevel-m3-q3', level_id: 'next-level', module_id: 'nextlevel-m3', order: 3, type: 'lesson',
            title_id: 'Deploying an AI Product', title_en: 'Deploying an AI Product',
            description_id: 'API, hosting, dan monitoring.', description_en: 'API, hosting, and monitoring.',
            content_id: '### Deployment Stack\n- **API Layer** — REST/GraphQL endpoint\n- **Hosting** — Vercel, AWS, GCP\n- **Monitoring** — latency, error rate, cost\n- **Logging** — track usage patterns\n\n### Considerations\n- Cost per request\n- Rate limiting\n- Fallback strategies\n- Data privacy (GDPR compliance)',
            content_en: '### Deployment Stack\n- **API Layer** — REST/GraphQL endpoint\n- **Hosting** — Vercel, AWS, GCP\n- **Monitoring** — latency, error rate, cost\n- **Logging** — track usage patterns\n\n### Considerations\n- Cost per request\n- Rate limiting\n- Fallback strategies\n- Data privacy (GDPR compliance)',
            xp_reward: 20
          },
          {
            id: 'nextlevel-m3-q4', level_id: 'next-level', module_id: 'nextlevel-m3', order: 4, type: 'lesson',
            title_id: 'Case Studies: Success & Failure', title_en: 'Case Studies: Success & Failure',
            description_id: 'Produk AI yang berhasil dan gagal.', description_en: 'AI products that succeeded and failed.',
            content_id: '### Sukses\n- **GitHub Copilot** — AI pair programming\n- **Midjourney** — text-to-image untuk kreator\n- **ChatGPT** — general-purpose AI assistant\n\n### Gagal\n- **AI recruiting tools** — bias dalam hiring\n- **Autonomous vehicles** — overpromising\n- **AI chatbot customer service** — frustrasi user\n\n> Kunci sukses: menyelesaikan masalah nyata, bukan sekadar teknologi keren.',
            content_en: '### Successes\n- **GitHub Copilot** — AI pair programming\n- **Midjourney** — text-to-image for creators\n- **ChatGPT** — general-purpose AI assistant\n\n### Failures\n- **AI recruiting tools** — bias in hiring\n- **Autonomous vehicles** — overpromising\n- **AI chatbot customer service** — user frustration\n\n> Key to success: solving real problems, not just cool technology.',
            xp_reward: 20
          },
          {
            id: 'nextlevel-m3-q5', level_id: 'next-level', module_id: 'nextlevel-m3', order: 5, type: 'checkpoint',
            title_id: '🎯 Checkpoint: Draft AI Product Proposal', title_en: '🎯 Checkpoint: Draft AI Product Proposal',
            description_id: 'Draft proposal 1 halaman untuk produk AI-mu sendiri.', description_en: 'Draft a 1-page proposal for your own AI product.',
            content_id: 'Jawab pertanyaan berikut.', content_en: 'Answer the following questions.',
            xp_reward: 40,
            quiz_questions: [
              {
                id: 'nextlevel-m3-q5-1',
                question_id: 'MVP harus punya fitur apa?',
                question_en: 'What should an MVP have?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Hanya fitur inti yang menyelesaikan masalah utama', text_en: 'Only core features that solve the main problem', is_correct: true },
                  { id: 'b', text_id: 'Semua fitur yang direncanakan', text_en: 'All planned features', is_correct: false },
                  { id: 'c', text_id: 'Fitur yang paling canggih', text_en: 'The most advanced features', is_correct: false }
                ],
                explanation_id: 'Benar! MVP = Minimum Viable Product — yang penting bisa diuji.',
                explanation_en: 'Correct! MVP = Minimum Viable Product — just testable.'
              }
            ]
          }
        ]
      },
      {
        id: 'nextlevel-m4',
        level_id: 'next-level',
        order: 4,
        title_id: 'Research & Community',
        title_en: 'Research & Community',
        description_id: 'Cara mengikuti perkembangan riset AI.',
        description_en: 'How to follow AI research developments.',
        quests: [
          {
            id: 'nextlevel-m4-q1', level_id: 'next-level', module_id: 'nextlevel-m4', order: 1, type: 'lesson',
            title_id: 'How to Follow AI Research', title_en: 'How to Follow AI Research',
            description_id: 'Sumber terpercaya untuk riset AI.', description_en: 'Trusted sources for AI research.',
            content_id: '### Sumber Riset\n- **arXiv.org** — preprint paper terbaru\n- **AI Lab Blogs** — Anthropic, OpenAI, Google DeepMind\n- **Newsletters** — The Batch (Andrew Ng), TLDR AI\n- **Conferences** — NeurIPS, ICML, ICLR\n- **Twitter/X** — follow AI researchers\n\n> Jangan mencoba membaca SEMUA — pilih fokus yang relevan dengan minatmu.',
            content_en: '### Research Sources\n- **arXiv.org** — latest preprint papers\n- **AI Lab Blogs** — Anthropic, OpenAI, Google DeepMind\n- **Newsletters** — The Batch (Andrew Ng), TLDR AI\n- **Conferences** — NeurIPS, ICML, ICLR\n- **Twitter/X** — follow AI researchers\n\n> Don\'t try to read EVERYTHING — choose a focus relevant to your interests.',
            xp_reward: 20
          },
          {
            id: 'nextlevel-m4-q2', level_id: 'next-level', module_id: 'nextlevel-m4', order: 2, type: 'lesson',
            title_id: 'Guided Paper Discussion', title_en: 'Guided Paper Discussion',
            description_id: 'Diskusi terpandu paper NeurIPS/ICML.', description_en: 'Guided discussion of a NeurIPS/ICML paper.',
            content_id: '### Cara Diskusi Paper\n1. **Baca Abstract & Conclusion** dulu\n2. **Identifikasi masalah** yang diselesaikan\n3. **Pahami pendekatan** utama\n4. **Evaluasi hasil** — apakah meyakinkan?\n5. **Diskusikan limitasi** — apa yang belum dijawab?\n\n> Diskusi paper membantu pemahaman lebih dalam.',
            content_en: '### How to Discuss Papers\n1. **Read Abstract & Conclusion** first\n2. **Identify the problem** being solved\n3. **Understand the main approach**\n4. **Evaluate results** — are they convincing?\n5. **Discuss limitations** — what\'s not yet answered?\n\n> Paper discussion helps deeper understanding.',
            xp_reward: 20
          },
          {
            id: 'nextlevel-m4-q3', level_id: 'next-level', module_id: 'nextlevel-m4', order: 3, type: 'checkpoint',
            title_id: '🎯 Checkpoint: Summarize a Paper', title_en: '🎯 Checkpoint: Summarize a Paper',
            description_id: 'Ringkaskan satu paper terbaru dalam bahasa sederhana.', description_en: 'Summarize one recent paper in plain language.',
            content_id: 'Jawab pertanyaan berikut.', content_en: 'Answer the following questions.',
            xp_reward: 40,
            quiz_questions: [
              {
                id: 'nextlevel-m4-q3-1',
                question_id: 'Platform mana yang menyediakan paper AI terbaru sebelum published?',
                question_en: 'Which platform provides the latest AI papers before publication?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'arXiv', text_en: 'arXiv', is_correct: true },
                  { id: 'b', text_id: 'Wikipedia', text_en: 'Wikipedia', is_correct: false },
                  { id: 'c', text_id: 'YouTube', text_en: 'YouTube', is_correct: false }
                ],
                explanation_id: 'Benar! arXiv adalah platform preprint untuk paper riset.',
                explanation_en: 'Correct! arXiv is the preprint platform for research papers.'
              }
            ]
          }
        ]
      },
      {
        id: 'nextlevel-m5',
        level_id: 'next-level',
        order: 5,
        title_id: 'Karir di AI',
        title_en: 'Careers in AI',
        description_id: 'Peluang karir dan skill yang dibutuhkan.',
        description_en: 'Career opportunities and required skills.',
        quests: [
          {
            id: 'nextlevel-m5-q1', level_id: 'next-level', module_id: 'nextlevel-m5', order: 1, type: 'lesson',
            title_id: 'Roles in AI Industry', title_en: 'Roles in AI Industry',
            description_id: 'Berbagai peran di industri AI.', description_en: 'Various roles in the AI industry.',
            content_id: '### Peran di Industri AI\n- **AI Engineer** — membangun dan deploy model AI\n- **ML Engineer** — pipeline data dan training\n- **Prompt Engineer** — optimasi prompt untuk LLM\n- **AI Researcher** — meneliti dan mempublikasikan\n- **Data Scientist** — analisis data untuk insight\n- **AI Product Manager** — strategi produk AI\n- **AI Ethics Specialist** — keamanan dan etika AI',
            content_en: '### AI Industry Roles\n- **AI Engineer** — build and deploy AI models\n- **ML Engineer** — data pipelines and training\n- **Prompt Engineer** — optimize prompts for LLMs\n- **AI Researcher** — research and publish\n- **Data Scientist** — data analysis for insights\n- **AI Product Manager** — AI product strategy\n- **AI Ethics Specialist** — AI safety and ethics',
            xp_reward: 20
          },
          {
            id: 'nextlevel-m5-q2', level_id: 'next-level', module_id: 'nextlevel-m5', order: 2, type: 'lesson',
            title_id: 'Skills Needed Per Role', title_en: 'Skills Needed Per Role',
            description_id: 'Skill teknis dan soft skill yang dibutuhkan.', description_en: 'Technical and soft skills needed.',
            content_id: '### Skill Umum\n- Python programming\n- Machine Learning basics\n- Data literacy\n- Problem-solving\n\n### Skill Spesifik\n- **AI Engineer**: API integration, deployment\n- **ML Engineer**: PyTorch/TensorFlow, SQL\n- **Prompt Engineer**: LLM behavior, evaluation\n- **AI Researcher**: Math, paper writing\n- **Data Scientist**: Statistics, visualization\n\n> Mulai dari yang paling menarik, lalu perluas.',
            content_en: '### General Skills\n- Python programming\n- Machine Learning basics\n- Data literacy\n- Problem-solving\n\n### Specific Skills\n- **AI Engineer**: API integration, deployment\n- **ML Engineer**: PyTorch/TensorFlow, SQL\n- **Prompt Engineer**: LLM behavior, evaluation\n- **AI Researcher**: Math, paper writing\n- **Data Scientist**: Statistics, visualization\n\n> Start with what interests you most, then expand.',
            xp_reward: 20
          },
          {
            id: 'nextlevel-m5-q3', level_id: 'next-level', module_id: 'nextlevel-m5', order: 3, type: 'checkpoint',
            title_id: '🎯 Checkpoint: Career Reflection', title_en: '🎯 Checkpoint: Career Reflection',
            description_id: 'Refleksi — pilih arah karir yang paling resonansi.', description_en: 'Reflection — choose the career direction that resonates most.',
            content_id: 'Jawab pertanyaan berikut.', content_en: 'Answer the following questions.',
            xp_reward: 40,
            quiz_questions: [
              {
                id: 'nextlevel-m5-q3-1',
                question_id: 'Peran mana yang paling cocok untuk seseorang yang suka menulis prompt dan bereksperimen dengan LLM?',
                question_en: 'Which role is best for someone who enjoys writing prompts and experimenting with LLMs?',
                type: 'multiple_choice',
                options: [
                  { id: 'a', text_id: 'Prompt Engineer', text_en: 'Prompt Engineer', is_correct: true },
                  { id: 'b', text_id: 'Data Scientist', text_en: 'Data Scientist', is_correct: false },
                  { id: 'c', text_id: 'DevOps Engineer', text_en: 'DevOps Engineer', is_correct: false }
                ],
                explanation_id: 'Benar! Prompt Engineer fokus pada optimasi interaksi dengan LLM.',
                explanation_en: 'Correct! Prompt Engineer focuses on optimizing LLM interactions.'
              }
            ]
          }
        ]
      },
      {
        id: 'nextlevel-m6',
        level_id: 'next-level',
        order: 6,
        title_id: 'Capstone',
        title_en: 'Capstone',
        description_id: 'Proyek akhir: bangun produk AI dari nol.',
        description_en: 'Final project: build an AI product from scratch.',
        quests: [
          {
            id: 'nextlevel-m6-q1', level_id: 'next-level', module_id: 'nextlevel-m6', order: 1, type: 'final_review',
            title_id: '🏁 Capstone Project — AI Master Badge', title_en: '🏁 Capstone Project — AI Master Badge',
            description_id: 'Bangun produk AI kecil dari nol. Selesaikan untuk mendapatkan lencana AI Master!', description_en: 'Build a small AI product from scratch. Complete to earn the AI Master badge!',
            content_id: '### Capstone Project\nBangun produk AI kecil yang:\n1. Menyelesaikan masalah nyata\n2. Menggunakan minimal satu AI API\n3. Punya UI yang bisa digunakan\n4. Bisa didemonstrasikan\n\nSelesaikan proyek ini untuk mendapatkan lencana **AI Master**!',
            content_en: '### Capstone Project\nBuild a small AI product that:\n1. Solves a real problem\n2. Uses at least one AI API\n3. Has a usable UI\n4. Can be demonstrated\n\nComplete this project to earn the **AI Master** badge!',
            xp_reward: 100
          }
        ]
      }
    ]
  }
];
