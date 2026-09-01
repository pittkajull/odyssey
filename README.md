# ODYSSEY — Your Journey Into AI

> *Every quest takes you further.*

**ODYSSEY** adalah platform pembelajaran AI yang free dan gamified. Alih-alih course menu tradisional, belajar AI diframing sebagai **perjalanan bajak laut** — pengguna berlayar melintasi lautan pengetahuan, mengunjungi pulau-pulau pembelajaran, menyelesaikan quest, dan akhirnya menemukan harta karun.

---

## 🏗️ Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Frontend | **React + Vite + TypeScript** | SPA, no SSR |
| Routing | **React Router** | |
| Styling | **Tailwind CSS v4** | Theme via `@theme` in `index.css` |
| Animation | **Framer Motion** | Float, spring, confetti, ship sailing |
| Backend | **Supabase** (PostgreSQL + Auth + Storage) | RLS enforced |
| Auth | **Supabase Auth** | Email/password + Google OAuth |
| i18n | **react-i18next** | Default: Indonesian (ID), toggle to English (EN) |
| Deployment | **Vercel / Netlify** | Static SPA |

---

## 🎨 Visual Design — Ocean Pirate Voyage

Tema visual dirancang seperti **peta harta karun bajak laut**:

- **Background**: Dark ocean gradient (#0C2340 → #1A4A6B) dengan animated wave layers
- **Quest nodes**: Pulau-pulau di lautan dengan ilustrasi SVG (kapal, gunung, pulau, monster laut, benteng, kaktus, jangkar, kompas)
- **Path**: Jalur berkelok dengan connector lines putus-putus
- **Ship animation**: Kapal berlayar ke quest berikutnya saat quest diselesaikan
- **Quest modal**: Captain's log scroll dengan ocean backdrop
- **Header**: Dark wood plank bar dengan compass rose logo
- **Decorations**: Compass rose, coordinate markers, skull watermark, floating particles

### SVG Illustrations
- `SailingShip` — kapal layar vintage dengan animasi bendera
- `MountainRange` — 3 layer kedalaman dengan snow caps
- `PalmTree` — pohon palem dengan buah kelapa
- `Island` — pulau tropis dengan 2 pohon palem
- `SeaMonster` — kraken dengan tentakel dan mata menacing
- `Castle` — benteng dengan battlements dan bendera
- `CompassRose` — kompas ornate dengan N/S/E/W
- `Treasure` — peti harta karun terbuka dengan koin bersinar

---

## 📚 Content Structure — 84 Quests

| Level | Emoji | Theme | Quests | Badge |
|-------|-------|-------|--------|-------|
| Basic | 🌱 | Getting to Know AI | 20 | AI Explorer |
| Intermediate | ⚙️ | Hands-on Practice | 24 | Neural Ninja |
| Advanced | 🚀 | Understanding Foundations | 22 | AI Architect |
| Next Level | 🏆 | Staying Current | 18 | AI Master |

### Quest Types
- **Lesson** — Materi bacaan dengan rendering markdown
- **Checkpoint** — Quiz interaktif di halaman terpisah
- **Final Review** — Cumulative quiz sebelum badge unlock
- **Project** — Mini-project praktis

### Gamification
- **XP** — 20 XP per lesson, 40 XP per checkpoint
- **Streak** — Counter harian, reset jika miss
- **Progress** — Sequential unlock, tidak bisa skip
- **Badges** — 1 badge per level (4 total)

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── AdventureIcons.tsx        — Compass rose, anchor icons
│   ├── Header.tsx                — Dark wood header dengan XP/streak
│   ├── Icons.tsx                 — Reusable SVG icons
│   ├── LandmarkIllustrations.tsx — Quest landmark wrapper
│   ├── LanguageSwitcher.tsx      — ID/EN toggle
│   ├── MapIllustrations.tsx      — 10+ hand-drawn SVG illustrations
│   ├── ProgressTracker.tsx       — Voyage logbook progress bars
│   ├── ProtectedRoute.tsx        — Auth guard wrapper
│   ├── QuestModal.tsx            — Captain's log scroll modal
│   ├── QuestNode.tsx             — Island quest node
│   └── SailingShipAnimation.tsx  — Ship sailing + sparkle trail
├── data/
│   └── courseData.ts             — 84 quests, 29 quiz questions
├── hooks/
│   └── useCourseData.ts          — Supabase + local data hook
├── lib/
│   ├── auth.tsx                  — AuthProvider + useAuth hook
│   ├── i18n.ts                   — react-i18next setup
│   └── supabase.ts               — Supabase client + helpers
├── locales/
│   ├── id.json                   — Indonesian UI strings
│   └── en.json                   — English UI strings
├── pages/
│   ├── Login.tsx                 — Email/password + Google OAuth
│   ├── PathMap.tsx               — Main ocean voyage map
│   ├── Profile.tsx               — User profile + badges
│   ├── QuizPage.tsx              — Dedicated quiz page
│   └── Register.tsx              — Registration form
├── types/
│   └── course.ts                 — TypeScript types
├── App.tsx                       — React Router setup
├── index.css                     — 960+ lines of pirate ocean theme
└── main.tsx                      — Entry point
```

---

## 🔧 Database Schema (Supabase)

```
profiles          — extends auth.users: username, avatar, xp, streak
levels            — Basic / Intermediate / Advanced / Next Level
modules           — grouped under a level
quests            — bilingual content (title_id/title_en, content_id/content_en)
quiz_questions    — belongs to a quest
quiz_options      — belongs to a question, includes is_correct
user_progress     — per-user per-quest status + quiz_score
user_badges       — per-user per-level, earned_at
```

**RLS Policies:**
- `profiles`, `user_progress`, `user_badges` → user can only access own rows
- `levels`, `modules`, `quests`, `quiz_questions`, `quiz_options` → public read-only

---

## 🌐 Internationalization

- **Default language**: Indonesian (id)
- **UI strings**: react-i18next JSON files
- **Course content**: Database columns `_id` / `_en`
- **Technical terms**: Stay in English in both languages (e.g. "machine learning", "prompt")

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase project

### Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase URL and anon key

# Apply database schema
# Copy supabase/schema.sql → Supabase SQL Editor → Run

# Seed course data
npm run seed

# Start dev server
npm run dev
```

### Google OAuth Setup
1. Create OAuth client in Google Cloud Console
2. Enable Google provider in Supabase Dashboard → Authentication → Providers
3. Add redirect URIs

---

## 📊 Git History

11 commits, progressive development:

| # | Commit | Description |
|---|--------|-------------|
| 1 | `chore: initial scaffold` | Vite + React + TS setup |
| 2 | `style: adventure map theme` | CSS parchment theme |
| 3 | `feat: SVG illustrations` | 10+ hand-drawn SVG components |
| 4 | `feat: types, i18n, Supabase` | Data model + localization |
| 5 | `feat: UI components` | Header, QuestNode, Modal, Progress |
| 6 | `feat: pages` | PathMap, Login, Register, Profile, Quiz |
| 7 | `feat: auth, schema, seed` | Auth + DB + seed script |
| 8 | `feat: routing` | React Router + auth guards |
| 9 | `feat: treasure map overhaul` | Winding trail + ship animation |
| 10 | `feat: ocean pirate theme` | Dark ocean + waves + islands |
| 11 | `fix: ocean background visible` | Transparent map surface |

---

## 🎯 Features Checklist

- [x] Vintage adventure map UI → Ocean pirate voyage theme
- [x] 84 quests across 4 levels with bilingual content
- [x] Interactive quiz system with explanations
- [x] XP, streak, and badge gamification
- [x] Supabase Auth (email/password + Google OAuth)
- [x] Real-time progress tracking
- [x] Ship sailing animation on quest completion
- [x] Animated ocean waves and floating particles
- [x] 10+ hand-drawn SVG illustrations
- [x] Language toggle (ID/EN)
- [x] Responsive design
- [x] Row Level Security

---

*Built with ❤️ to help people learn AI through adventure.*
