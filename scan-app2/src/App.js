import React from "react";
import { ConfigProvider } from './context/ConfigContext';
import Header from "./components/Header";
import Content from "./components/Content";
import StatusBar from "./components/StatusBar";
import "./App.css";

function App() {
  return (
    <ConfigProvider>
      <div className="App">
        <Header />
        <Content />
        <StatusBar />
      </div>
    </ConfigProvider>
  );
}

export default App;
