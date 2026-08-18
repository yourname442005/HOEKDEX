# HOEKDEX

> A playful social memory and relationship tracking platform built to help you remember the people, moments, and connections that matter.

## Overview

Hoekdex is a frontend application designed around personal relationship management, social interaction, gamification, and privacy.

The application allows users to maintain information about people they know, record interactions, track relationship activity, earn XP, unlock achievements, connect with friends, and participate in leaderboards.

The frontend is built with Next.js and follows a component-based architecture with a responsive UI, dark/light themes, Clerk authentication, and a highly animated editorial landing page.

---

## Features

### Landing Page
- Editorial, scroll-driven landing experience
- Animated hero section
- Product storytelling sections
- Interactive product showcases
- Gamification showcase
- Social features showcase
- Privacy section
- Testimonials
- Final CTA
- Responsive navigation

### Authentication
- Clerk authentication
- Email/password authentication
- OAuth support through Clerk
- Sign in
- Sign up
- Sign out
- Protected application routes
- Multi-step onboarding
- Authenticated user identity

### Dashboard
- XP and progress overview
- Relationship statistics
- Recent activity
- Quick actions
- Gamification progress

### People
- Add and manage people
- Person profiles
- Relationship information
- Activity logging
- Individual timelines

### Timeline
- Relationship activity feed
- Timeline events
- Historical interaction tracking

### Achievements
- Achievement system
- XP progression
- Tier progression
- Achievement unlocks

### Friends & Social
- Add friends
- Friend requests
- Invite users to Hoekdex
- Friends list
- Social activity

### Leaderboard
- XP-based rankings
- User tiers
- Competitive social progression

### Profile & Settings
- User profile
- Appearance settings
- Privacy settings
- Dark / Light / System themes

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | React framework and App Router |
| TypeScript | Type-safe development |
| React 19 | UI development |
| Tailwind CSS v4 | Styling and design system |
| shadcn/ui | Reusable UI components |
| Clerk | Authentication and user identity |
| CSS Variables | Theme and design tokens |
| Motion / CSS | UI and scroll-based animations |
| npm | Package management |

---

## Design System

Hoekdex uses two visual modes.

### Dark Mode

The default application theme and primary brand direction.

- Void: `#080808`
- Charcoal: `#171617`
- Smoke: `#262525`
- Graphite: `#393939`
- Bone White: `#FCFCFC`
- Ash: `#D4D2D2`
- Arterial Red: `#FE1E34`
- Pink Accent: `#F43F5E`

### Light Mode

A warmer and more playful alternative.

- Cream: `#FAF5EF`
- Surface: `#FFFDF9`
- Muted Surface: `#F3ECE2`
- Dark Ash: `#1C1917`
- Secondary Ash: `#78716C`
- Border: `#E7E0D8`
- Arterial Red: `#FE1E34`
- Pink Accent: `#F43F5E`

The landing page uses the dark editorial visual language, while the application supports both dark and light themes.

---

## UI & Interaction

The interface focuses on:

- Strong typography
- Responsive layouts
- Playful micro-interactions
- Scroll-driven storytelling
- Smooth transitions
- Gamified feedback
- Responsive navigation
- Accessible interactive components

The landing page uses large editorial typography and scroll-linked animations rather than a conventional SaaS layout.

The application uses a more functional and playful interface designed around cards, progress indicators, achievements, people, and social interactions.

---

## Project Structure

```text
hoekdex/
│
├── app/
│   ├── dashboard/
│   ├── people/
│   ├── timeline/
│   ├── achievements/
│   ├── friends/
│   ├── leaderboard/
│   ├── profile/
│   ├── settings/
│   ├── login/
│   ├── signup/
│   ├── onboarding/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── shared/
│   └── ui/
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── people/
│   ├── timeline/
│   ├── achievements/
│   ├── friends/
│   ├── leaderboard/
│   └── landing/
│       ├── LandingPage.tsx
│       ├── LandingNav.tsx
│       ├── LandingFooter.tsx
│       └── sections/
│
├── context/
│   └── hoekdex-context.tsx
│
├── hooks/
│
├── lib/
│
├── types/
│
├── assets/
│
├── public/
│
├── .env.example
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md

Authentication Architecture

Clerk is responsible for authentication and identity.

User
 │
 ▼
Clerk
 │
 ├── Sign Up
 ├── Sign In
 ├── Sessions
 ├── Email Verification
 ├── OAuth
 └── User Identity
 │
 ▼
Hoekdex
 │
 ├── People
 ├── Activities
 ├── Timeline
 ├── XP
 ├── Achievements
 ├── Friends
 ├── Leaderboard
 └── Settings

Clerk handles authentication.

Hoekdex handles application-specific data and functionality.

The Clerk userId will act as the identity bridge between authentication and the future Hoekdex backend/database.

Routes
Public
/
 /login
 /signup
Protected
/dashboard
/people
/people/[id]
/timeline
/achievements
/friends
/leaderboard
/profile
/settings
/settings/privacy
/settings/appearance
/onboarding

Unauthenticated users cannot access protected application routes.

Environment Variables

Create a .env.local file in the project root.

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

Additional Clerk redirect variables may be required depending on the authentication configuration.

Never commit .env.local or any secret key to GitHub.

Use .env.example for documenting required variables.

Getting Started
1. Clone the repository
git clone https://github.com/yourname442005/HOEKDEX.git
cd HOEKDEX
2. Install dependencies
npm install
3. Configure environment variables

Create:

.env.local

and add the required Clerk credentials.

4. Start the development server
npm run dev

Open:

http://localhost:3000
Available Scripts
npm run dev

Starts the development server.

npm run build

Creates a production build.

npm run start

Starts the production server.

npm run lint

Runs ESLint checks.

Current Status
Completed
 Frontend architecture
 Responsive application UI
 Hoekdex design system
 Dark mode
 Light mode
 Collapsible desktop sidebar
 Mobile navigation
 Landing page
 Scroll-driven landing animations
 Authentication UI
 Clerk authentication
 Protected application routes
 Onboarding flow
 People management UI
 Timeline UI
 Achievements UI
 Friends UI
 Leaderboard UI
 Profile and settings UI
In Progress / Future
 Backend API
 Database integration
 Persistent Hoekdex user data
 People and relationship persistence
 Friend request backend
 XP and achievement persistence
 Leaderboard backend
 Production deployment
 Advanced notifications
 Additional social functionality
Development Approach

The frontend is structured around feature-based development.

Reusable UI components are separated from domain-specific feature components, while shared application state is handled through the Hoekdex context and hooks.

Authentication is intentionally separated from Hoekdex domain logic so Clerk can provide identity while the future backend manages application data.

The frontend is designed to be backend-ready rather than tightly coupled to mock data.

Author

Shubham Karar

Hoekdex is currently being developed as an independent project focused on making relationship management more memorable, social, and engaging.

License

This project is licensed under the Apache License 2.0.



### One thing I would change before committing this README


Your GitHub repository's current `main` branch still only shows the original `LICENSE` commit from the public repository view, so the README and newer frontend branches are not reflected there yet. :contentReference[oaicite:0]{index=0}


Once your current branch is pushed, put this README on the branch that you actually intend to become the project's main frontend baseline.


And **don't add fake screenshots, fake metrics, fake testimonials, or fake backend claims** to the README. The current frontend is already substantial enough without inventing things that don't exist.
