import React from "react";

const MODAL_STYLES = {
  position: "fixed",
  top: "0",
  left: "0",
  bottom: "0",
  background: "#FFF",
  padding: "50px",
  zIndex: 1000,
  width: "400px",
  display: "flex",
  flexDirection: "column",
};

const BTN_STYLES = {
  position: "absolute",
  top: "30px",
  right: "40px",
  width: "20px",
  height: "20px",
  fontSize: "1.5em",
  background: "transparent",
  border: "none",
  cursor: "pointer",
};

function Modal({ open, children, onClose }) {
  if (!open) return null;
  return (
    <div className="order_model">
      <div className="order_model-overlay" onClick={onClose} />
      <div className="order_model-details" style={MODAL_STYLES}>
        <button onClick={onClose} style={BTN_STYLES}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
