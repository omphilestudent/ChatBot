import { useAuth } from '../context/AuthContext';
import { useTheme, type ThemeMode } from '../context/ThemeContext';

const modes: ThemeMode[] = ['system', 'light', 'dark'];

const SettingsPage = () => {
  const { mode, activeTheme, setMode } = useTheme();
  const { connectedProvider, disconnectProvider } = useAuth();

  return (
    <section className="stack">
      <h2>Settings</h2>

      <article className="card">
        <h3>Theme</h3>
        <p>
          Theme defaults to <strong>system</strong>, which follows your device preferences.
          You can switch manually any time.
        </p>
        <div className="button-row">
          {modes.map((themeMode) => (
            <button
              key={themeMode}
              type="button"
              className={mode === themeMode ? 'active' : ''}
              onClick={() => setMode(themeMode)}
            >
              {themeMode}
            </button>
          ))}
        </div>
        <p className="status">Active theme: {activeTheme}</p>
      </article>

      <article className="card">
        <h3>Version Control Connection</h3>
        {connectedProvider ? (
          <>
            <p>You are currently connected to {connectedProvider}.</p>
            <button type="button" onClick={disconnectProvider}>
              Disconnect provider
            </button>
          </>
        ) : (
          <p>No provider connected. Go to Login page to connect one.</p>
        )}
      </article>
    </section>
  );
};

export default SettingsPage;
