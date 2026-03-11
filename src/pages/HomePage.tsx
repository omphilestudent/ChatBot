const HomePage = () => {
  return (
    <section className="card-grid">
      <article className="card">
        <h2>Welcome to BizChat</h2>
        <p>
          This React + TypeScript version gives you a cleaner structure for scaling your assistant,
          account tools, and future integrations.
        </p>
      </article>
      <article className="card">
        <h3>Highlights</h3>
        <ul>
          <li>Modern React routing between pages.</li>
          <li>System-driven dark/light theme with user override.</li>
          <li>Version control login status persisted in local storage.</li>
          <li>Simple developer startup log that prints once per server run.</li>
        </ul>
      </article>
      <article className="card">
        <h3>Next ideas</h3>
        <p>
          Connect your backend chat endpoint, add OAuth callbacks for provider login, and start
          storing user-level preferences in an API.
        </p>
      </article>
    </section>
  );
};

export default HomePage;
