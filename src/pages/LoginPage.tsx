import type { Provider } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';

const providers: Array<{ name: Provider; hint: string }> = [
  { name: 'GitHub', hint: 'Best for GitHub-hosted repositories and Actions.' },
  { name: 'GitLab', hint: 'Works well for GitLab CI and self-managed instances.' },
  { name: 'Bitbucket', hint: 'Useful for Atlassian toolchains and Jira flows.' },
];

const LoginPage = () => {
  const { connectedProvider, connectProvider } = useAuth();

  return (
    <section className="stack">
      <h2>Connect Version Control</h2>
      <p>
        Select a provider to simulate login. Replace this with OAuth in production so user accounts
        can securely authorize your app.
      </p>
      <div className="card-grid">
        {providers.map((provider) => (
          <article key={provider.name} className="card">
            <h3>{provider.name}</h3>
            <p>{provider.hint}</p>
            <button type="button" onClick={() => connectProvider(provider.name)}>
              Connect {provider.name}
            </button>
          </article>
        ))}
      </div>
      <p className="status">
        Current status:{' '}
        <strong>{connectedProvider ? `Connected to ${connectedProvider}` : 'Not connected'}</strong>
      </p>
    </section>
  );
};

export default LoginPage;
