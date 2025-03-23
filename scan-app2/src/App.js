import React from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import StatusBar from "./components/StatusBar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <StatusBar />
    </div>
  );
}

export default App;
