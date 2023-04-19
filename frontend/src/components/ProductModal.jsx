import React from "react";
import ReactDOM from "react-dom";

const ProductModal = ({ children }) => {
  const modalRoot = document.getElementById("modal-root");

  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    modalRoot
  );
};

export default ProductModal;
