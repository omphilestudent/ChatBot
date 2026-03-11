let hasLoggedStartup = false;

export const logDevServerStartupOnce = () => {
  if (import.meta.env.DEV && !hasLoggedStartup) {
    console.info('[dev] BizChat React UI started. This appears once until the dev server is restarted.');
    hasLoggedStartup = true;
  }
};
