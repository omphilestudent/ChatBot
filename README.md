# BizChat React + Flask (TypeScript frontend)

This project is now a **React + TypeScript coding workspace** integrated with a **Flask backend** that proxies chat requests to Ollama.

## What was fixed

- Home page is now an editor-first coding workspace with language templates and AI code review.
- Frontend sends real `/chat` requests to backend for assistant responses.
- Environment setup is explicit for both frontend and backend.
- Unnecessary legacy static chatbot files were removed in prior migration and the remaining code is focused on active app flow.

## Architecture

- **Frontend**: Vite + React + TypeScript (`src/`)
- **Backend**: Flask (`app.py`)
- **AI runtime**: Ollama model configured by env (`OLLAMA_MODEL`)

## Environment setup

Copy and update env values:

```bash
cp .env.example .env
```

Environment keys:

- `VITE_API_URL`: Base URL used by frontend for backend API calls.
- `FLASK_PORT`: Port for Flask server.
- `OLLAMA_MODEL`: Ollama model name used by backend (example: `llama3`).
- `CORS_ORIGIN`: Allowed frontend origin for backend CORS.

## Run backend

1) Install Python dependencies:

```bash
pip install -r requirements.txt
```

2) Run backend:

```bash
python app.py
```

Backend endpoints:

- `GET /health` → backend health + model info
- `POST /chat` → expects `{ "message": "..." }`

## Run frontend

1) Install JS dependencies:

```bash
npm install
```

2) Start dev server:

```bash
npm run dev
```

3) Build production assets:

```bash
npm run build
```

## File structure

```text
.
├── .env.example
├── app.py
├── requirements.txt
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
│   ├── services
│   │   └── chatApi.ts
│   └── utils
│       └── devLogger.ts
└── README.md
```
