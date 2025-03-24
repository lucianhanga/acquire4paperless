import React, { createContext, useState, useEffect } from 'react';
import { getConfig, setConfig } from '../utils/configManager';

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfigState] = useState(getConfig());

  const updateConfig = (newData) => {
    setConfig(newData);
    setConfigState((prev) => ({ ...prev, ...newData }));
  };

  useEffect(() => {
    // Optionally sync with localStorage on load
    setConfigState(getConfig());
  }, []);

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};