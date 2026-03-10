import { OpenAIService } from './openai.service';
import { CodeAnalysis, CodeContext } from '../../models/interfaces/code.interface';

interface LearningSuggestion {
  concept: string;
  hint: string;
}

interface DebugHint {
  step: string;
  description: string;
}

export class EducationalAIService {
  constructor(private openAI: OpenAIService) {}

  async provideLearningSuggestions(code: string, language: string): Promise<LearningSuggestion[]> {
    const analysis: CodeAnalysis = { code, language };
    const prompt = this.buildLearningPrompt(analysis);
    const suggestions = await this.openAI.complete(prompt);

    return [{ concept: 'Code readability', hint: suggestions }];
  }

  async debugWithHints(_error: Error, _context: CodeContext): Promise<DebugHint[]> {
    return [{ step: 'Inspect stack trace', description: 'Start with the first app frame.' }];
  }

  private buildLearningPrompt(analysis: CodeAnalysis): string {
    return `
      Analyze this code and provide learning suggestions:
      Code: ${analysis.code}
      Language: ${analysis.language}

      Rules:
      - Don't provide direct solutions
      - Suggest concepts to research
      - Point to documentation
      - Ask guiding questions
    `;
  }
}
