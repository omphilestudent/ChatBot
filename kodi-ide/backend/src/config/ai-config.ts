export const aiConfig = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4',
    maxTokens: 2000,
    temperature: 0.7
  },
  educational: {
    maxSuggestions: 5,
    hintLevels: ['conceptual', 'documentation', 'example'],
    preventDirectSolutions: true,
    learningPathGeneration: true
  },
  debug: {
    stepByStep: true,
    maxHints: 3,
    showAlternatives: true
  }
};
