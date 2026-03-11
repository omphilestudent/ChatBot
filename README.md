# BizChat React (TypeScript)

This project has been converted into a **React + TypeScript** application using Vite.

## Features

- Multi-page UI with React Router:
  - Home page with richer content.
  - Login page to connect GitHub/GitLab/Bitbucket (simulated auth state).
  - Settings page for theme and connection management.
- Theme support:
  - **System generated mode** by default (`prefers-color-scheme`).
  - User can switch to Light or Dark mode in Settings.
- Developer log behavior:
  - A simple startup log appears **once per dev server runtime**.
  - Log resets only when the dev server restarts.
- TypeScript-first project structure for scalability.

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router DOM

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## File Structure

```text
.
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src
│   ├── App.tsx
│   ├── main.tsx
│   ├── styles.css
│   ├── context
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── pages
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── SettingsPage.tsx
│   └── utils
│       └── devLogger.ts
└── README.md
```

## Notes for Real OAuth Integration

The login page currently simulates provider connections. For production:

1. Register OAuth apps in GitHub/GitLab/Bitbucket.
2. Add backend endpoints for OAuth redirect and callback.
3. Store access tokens securely server-side.
4. Replace localStorage provider simulation with authenticated user sessions.
