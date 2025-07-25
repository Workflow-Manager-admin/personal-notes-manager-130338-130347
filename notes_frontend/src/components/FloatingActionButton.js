import React from "react";
import "./FloatingActionButton.css";

// PUBLIC_INTERFACE
function FloatingActionButton({ onClick }) {
  return (
    <button
      className="floating-add-btn"
      onClick={onClick}
      aria-label="Add note"
      title="Add note"
    >
      +
    </button>
  );
}

export default FloatingActionButton;
