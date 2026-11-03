"use client";

import { Check, Sparkles, X, XCircle } from "lucide-react";
import { useEffect } from "react";
import "./Toast.css";

export default function CustomToast({ message, type = "success", onClose }) {
  const isSuccess = type === "success";

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`custom-toast ${isSuccess ? "success" : "error"}`}>
      <div className="toast-card">
        <div className="toast-glow" />

        <div className="toast-icon-area">
          <div className="toast-orbit" />

          <div className="toast-icon">
            {isSuccess ? (
              <Check size={24} strokeWidth={3} />
            ) : (
              <XCircle size={24} />
            )}
          </div>
        </div>

        <div className="toast-content">
          <div className="toast-heading">
            <span>{isSuccess ? "SUCCESS" : "ERROR"}</span>
            {isSuccess && <Sparkles size={15} className="toast-sparkle" />}
          </div>

          <h3>{isSuccess ? "Well done!" : "Something went wrong!"}</h3>

          <p>{message}</p>
        </div>

        <button
          className="toast-close"
          onClick={onClose}
          aria-label="Close notification"
        >
          <X size={17} />
        </button>

        <div className="toast-progress-track">
          <div className="toast-progress" />
        </div>
      </div>
    </div>
  );
}
