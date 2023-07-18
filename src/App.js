import React from "react";
import "./styles.css";
import Header from "./Header";
import MemeForm from "./MemeForm";

export default function App() {
  return (
    <div className="app">
      <Header />
      <div className="main-container">
        <MemeForm />
      </div>
    </div>
  );
}
