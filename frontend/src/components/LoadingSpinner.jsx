import React from "react";
import "../styles/LoadingSpinner.scss";

const LoadingSpinner = () => {
  return (
    <div className="lds-ripple">
      <div />
      <div />
    </div>
  );
};

export default LoadingSpinner;
