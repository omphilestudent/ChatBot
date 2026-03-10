export class OpenAIService {
  async complete(prompt: string): Promise<string> {
    return `Mock completion for: ${prompt.slice(0, 40)}`;
  }
}
