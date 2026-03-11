import { FormEvent, useMemo, useState } from 'react';
import { sendChatMessage } from '../services/chatApi';

type Language = 'typescript' | 'python' | 'javascript';

const starterCode: Record<Language, string> = {
  typescript: `type User = {\n  id: number;\n  name: string;\n};\n\nconst users: User[] = [\n  { id: 1, name: 'Ada' },\n  { id: 2, name: 'Linus' },\n];\n\nexport const findUser = (id: number): User | undefined => {\n  return users.find((user) => user.id === id);\n};\n`,
  python: `def calculate_total(prices: list[float]) -> float:\n    subtotal = sum(prices)\n    tax = subtotal * 0.15\n    return subtotal + tax\n\nif __name__ == "__main__":\n    print(calculate_total([10.0, 25.5, 4.5]))\n`,
  javascript: `const transactions = [120, -20, 450, -60];\n\nconst balance = transactions.reduce((sum, amount) => sum + amount, 0);\n\nconsole.log('Current balance:', balance);\n`,
};

const HomePage = () => {
  const [language, setLanguage] = useState<Language>('typescript');
  const [code, setCode] = useState(starterCode.typescript);
  const [prompt, setPrompt] = useState('Explain this code and suggest one improvement.');
  const [assistantReply, setAssistantReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lineCount = useMemo(() => code.split('\n').length, [code]);

  const onChangeLanguage = (value: Language) => {
    setLanguage(value);
    setCode(starterCode[value]);
  };

  const askAssistant = async (event: FormEvent) => {
    event.preventDefault();
    if (!prompt.trim() || !code.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const fullPrompt = `Language: ${language}\n\nRequest: ${prompt}\n\nCode:\n${code}`;
      const reply = await sendChatMessage(fullPrompt);
      setAssistantReply(reply);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unknown backend error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="stack">
      <article className="card">
        <h2>Code Editor Workspace</h2>
        <p>
          Edit code, switch language templates, and ask BizChat AI to review what you write.
        </p>
      </article>

      <article className="card editor-shell">
        <div className="editor-toolbar">
          <label>
            Language
            <select
              value={language}
              onChange={(event) => onChangeLanguage(event.target.value as Language)}
            >
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </select>
          </label>
          <span>{lineCount} lines</span>
        </div>

        <textarea
          className="code-editor"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          spellCheck={false}
          aria-label="Code editor"
        />
      </article>

      <article className="card">
        <h3>Ask AI about your code</h3>
        <form className="chat-form" onSubmit={askAssistant}>
          <input
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Ask for optimization, bug checks, or refactoring ideas"
            aria-label="Prompt"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Thinking...' : 'Ask'}
          </button>
        </form>

        {assistantReply ? <pre className="assistant-output">{assistantReply}</pre> : null}
        {error ? <p className="error-text">{error}</p> : null}
      </article>
    </section>
  );
};

export default HomePage;
