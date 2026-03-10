# KODI IDE

Base monorepo for an educational IDE with:

- **Backend**: Node.js + Express API for AI-powered learning suggestions and debugging hints.
- **Frontend**: Angular-style component scaffold for editor + learning suggestions.
- **AI provider**: DeepSeek chat completions API.

## Quick start

1. Add environment values:

```bash
cp .env.example backend/.env
```

2. Install dependencies (workspace):

```bash
npm install
```

3. Run backend:

```bash
npm run backend:dev
```

## Backend API

- `GET /health`
- `POST /api/ai/learning-suggestions`
  - body: `{ "code": "...", "language": "javascript" }`
- `POST /api/ai/debug-hints`
  - body: `{ "error": "...", "context": { "code": "...", "filePath": "..." } }`

## Notes

- DeepSeek key is loaded from `DEEPSEEK_API_KEY`.
- If no key is configured, backend returns fallback guidance text.
