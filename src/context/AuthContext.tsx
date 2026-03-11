import { createContext, useContext, useMemo, useState } from 'react';

export type Provider = 'GitHub' | 'GitLab' | 'Bitbucket';

type AuthContextValue = {
  connectedProvider: Provider | null;
  connectProvider: (provider: Provider) => void;
  disconnectProvider: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = 'bizchat-connected-provider';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [connectedProvider, setConnectedProvider] = useState<Provider | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'GitHub' || saved === 'GitLab' || saved === 'Bitbucket') return saved;
    return null;
  });

  const connectProvider = (provider: Provider) => {
    setConnectedProvider(provider);
    localStorage.setItem(STORAGE_KEY, provider);
  };

  const disconnectProvider = () => {
    setConnectedProvider(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({ connectedProvider, connectProvider, disconnectProvider }),
    [connectedProvider],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
