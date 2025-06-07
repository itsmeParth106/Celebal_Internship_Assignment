import './styles1.css';

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Submitted() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No data found. Please submit the form first.</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Form Submitted Successfully!</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
}

export default Submitted;
