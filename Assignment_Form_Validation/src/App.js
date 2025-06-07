
import React from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./Form";
import Submitted from "./Submitted";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/submitted" element={<Submitted />} />
    </Routes>
  );
}

export default App;
