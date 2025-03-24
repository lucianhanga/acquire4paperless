import React from "react";
import "./StatusBar.css";

function StatusBar({ status }) {
  return (
    <footer className="App-statusbar">
      <p>Status: {status}</p>
    </footer>
  );
}

export default StatusBar;