import { FormEvent, useState } from 'react';
import { getApiBaseUrl, sendChatMessage } from '../services/chatApi';

type ChatItem = {
  role: 'user' | 'assistant';
  text: string;
};

const HomePage = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatItem[]>([
    { role: 'assistant', text: 'Welcome to BizChat. Ask me anything about your account workflows.' },
  ]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setMessage('');
    setLoading(true);
    setError(null);

    try {
      const reply = await sendChatMessage(trimmed);
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unknown backend error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="stack">
      <article className="card">
        <h2>BizChat Assistant</h2>
        <p>
          Frontend is now integrated with the Flask backend. API base URL:
          <strong> {getApiBaseUrl()}</strong>
        </p>
      </article>

      <article className="card chat-card">
        <div className="chat-window">
          {messages.map((item, index) => (
            <p key={`${item.role}-${index}`} className={`bubble ${item.role}`}>
              {item.text}
            </p>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="chat-form">
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Type your message..."
            aria-label="Chat message"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>

        {error ? <p className="error-text">{error}</p> : null}
      </article>
    </section>
  );
};

export default HomePage;
