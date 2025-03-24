import React, { useState } from "react";
import { ConfigProvider } from './context/ConfigContext';
import Header from "./components/Header";
import Content from "./components/Content";
import StatusBar from "./components/StatusBar";
import "./App.css";

function App() {
  const [status, setStatus] = useState("Ready");

  return (
    <ConfigProvider>
      <div className="App">
        <Header />
        <Content setStatus={setStatus} />
        <StatusBar status={status} />
      </div>
    </ConfigProvider>
  );
}

export default App;
