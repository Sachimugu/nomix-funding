import React from "react";

const ConnectButton = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 bg-transparent border-2 border-transparent rounded-lg text-white font-medium overflow-hidden ${className}`}
    >
      <span className="absolute inset-0 border-2 border-blue-600 rounded-lg animate-border-spin"></span>
      <span className="relative">{children}</span>
    </button>
  );
};

export default ConnectButton;
