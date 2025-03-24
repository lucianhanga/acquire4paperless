import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import Settings from "./Settings";
import "./Header.css";

function Header() {
  const [showSettings, setShowSettings] = useState(false);

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  return (
    <header className="App-header">
      <h1>Paperless Scanner</h1>
      <button className="settings-button" onClick={handleSettingsClick}>
        <FaCog />
      </button>
      {showSettings && <Settings onClose={handleCloseSettings} />}
    </header>
  );
}

export default Header;