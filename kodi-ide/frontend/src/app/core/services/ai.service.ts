export interface LearningSuggestion {
  concept: string;
  hint: string;
}

export interface DebugHint {
  step: string;
  description: string;
}

const API_BASE_URL = (globalThis as { __KODI_API_URL__?: string }).__KODI_API_URL__ || 'http://localhost:3000/api';

export class AiService {
  async getLearningSuggestions(code: string, language: string): Promise<LearningSuggestion[]> {
    const response = await fetch(`${API_BASE_URL}/ai/learning-suggestions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch learning suggestions');
    }

    const data = (await response.json()) as { suggestions: LearningSuggestion[] };
    return data.suggestions;
  }

  async getDebugHints(error: string, context?: { code?: string; filePath?: string }): Promise<DebugHint[]> {
    const response = await fetch(`${API_BASE_URL}/ai/debug-hints`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error, context })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch debug hints');
    }

    const data = (await response.json()) as { hints: DebugHint[] };
    return data.hints;
  }
}
