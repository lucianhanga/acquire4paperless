const CONFIG_KEY = 'appConfig';

const DEFAULT_CONFIG = {
  version: 1,
  azureStorageUrl: '', // Add your default URL here
};

const validateConfig = (config) => {
  // Add validation logic here if needed
  return config;
};

export const getConfig = () => {
  const stored = localStorage.getItem(CONFIG_KEY);
  const config = stored ? JSON.parse(stored) : DEFAULT_CONFIG;
  return validateConfig(config);
};

export const setConfig = (newConfig) => {
  const current = getConfig();
  const updated = { ...current, ...newConfig };
  localStorage.setItem(CONFIG_KEY, JSON.stringify(updated));
};

export const resetConfig = () => {
  localStorage.removeItem(CONFIG_KEY);
};
