import React, { useState, useContext } from "react";
import { ConfigContext } from "../context/ConfigContext";
import "./Settings.css";

function Settings({ onClose }) {
  const { config, updateConfig } = useContext(ConfigContext);
  const [azureStorageUrl, setAzureStorageUrl] = useState(config.azureStorageUrl || "");

  const handleSave = () => {
    updateConfig({ azureStorageUrl });
    onClose();
  };

  return (
    <div className="settings-modal">
      <div className="settings-content">
        <h2>Settings</h2>
        <div className="settings-field">
          <div className="settings-label">Azure Blob SAS URL:</div>
          <textarea
            value={azureStorageUrl}
            onChange={(e) => setAzureStorageUrl(e.target.value)}
            rows="6" // Set the number of rows to 6
          />
        </div>
        <div className="settings-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;