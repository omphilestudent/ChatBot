import { NavLink, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import { useTheme } from './context/ThemeContext';

const App = () => {
  const { activeTheme } = useTheme();

  return (
    <div className={`app ${activeTheme}`}>
      <header className="topbar">
        <h1>BizChat Code Studio</h1>
        <nav>
          <NavLink to="/">Editor</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
      </header>
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
