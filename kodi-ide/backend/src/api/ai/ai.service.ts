import { EducationalAIService } from '../../services/ai/educational-ai.service';
import { OpenAIService } from '../../services/ai/openai.service';

const openAIService = new OpenAIService();
const educationalService = new EducationalAIService(openAIService);

export const aiService = {
  getLearningSuggestions: async (code: string, language: string) => {
    const suggestions = await educationalService.provideLearningSuggestions(code, language);
    return { suggestions };
  },

  getDebugHints: async (errorMessage: string, context?: { code?: string; filePath?: string }) => {
    const hints = await educationalService.debugWithHints(new Error(errorMessage), {
      codeSnippet: context?.code,
      filePath: context?.filePath
    });
    return { hints };
  }
};
