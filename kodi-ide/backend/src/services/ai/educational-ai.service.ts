import { CodeAnalysis, CodeContext } from '../../models/interfaces/code.interface';
import { OpenAIService } from './openai.service';

export interface LearningSuggestion {
  concept: string;
  hint: string;
}

export interface DebugHint {
  step: string;
  description: string;
}

export class EducationalAIService {
  constructor(private readonly openAI: OpenAIService) {}

  async provideLearningSuggestions(code: string, language: string): Promise<LearningSuggestion[]> {
    const analysis: CodeAnalysis = { code, language };
    const prompt = this.buildLearningPrompt(analysis);
    const output = await this.openAI.complete(prompt);

    return [
      {
        concept: `Learning opportunities in ${language}`,
        hint: output
      }
    ];
  }

  async debugWithHints(error: Error, context: CodeContext): Promise<DebugHint[]> {
    const debugPrompt = [
      'Guide me through debugging this error without giving the direct fix.',
      `Error: ${error.message}`,
      context.filePath ? `File: ${context.filePath}` : '',
      context.codeSnippet ? `Code snippet:\n${context.codeSnippet}` : '',
      'Give step-by-step hints and what to inspect first.'
    ]
      .filter(Boolean)
      .join('\n\n');

    const output = await this.openAI.complete(debugPrompt);
    return [{ step: 'Investigate error context', description: output }];
  }

  private buildLearningPrompt(analysis: CodeAnalysis): string {
    return [
      'Analyze this code and provide learning suggestions.',
      `Language: ${analysis.language}`,
      `Code:\n${analysis.code}`,
      'Rules:',
      "- Don't provide direct solutions",
      '- Suggest concepts to research',
      '- Point to documentation to read',
      '- Ask guiding questions'
    ].join('\n');
  }
}
