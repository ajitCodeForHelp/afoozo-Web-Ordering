import React from "react";

const Loading = ({ message = "Loading...", size = "md", fullScreen = true }) => {
  return (
    <div className={`loading-wrapper ${fullScreen ? "loading-full" : ""}`}>
      <div className="loading-overlay"></div>
      <div className="loading-content text-center">
        <div className={`spinner-border text-dark loading-spinner loading-${size}`} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="loading-message mt-2 text-muted">{message}</div>
      </div>
    </div>
  );
};

export default Loading;