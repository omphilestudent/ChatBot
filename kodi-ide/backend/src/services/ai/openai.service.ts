import axios from 'axios';
import { config } from '../../config';

export class OpenAIService {
  async complete(prompt: string): Promise<string> {
    if (!config.ai.apiKey) {
      return 'Missing DEEPSEEK_API_KEY; returning local fallback guidance.';
    }

    const response = await axios.post(
      `${config.ai.baseUrl}/chat/completions`,
      {
        model: config.ai.model,
        messages: [
          {
            role: 'system',
            content:
              'You are an educational coding assistant. Provide hints, explanations, and next steps without giving full direct solutions.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.5,
        max_tokens: 700
      },
      {
        headers: {
          Authorization: `Bearer ${config.ai.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    );

    return response.data.choices?.[0]?.message?.content ?? 'No response content available.';
  }
}
