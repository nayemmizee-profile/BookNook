"use client";

import { CheckCircle2, X, XCircle } from "lucide-react";
import { useEffect } from "react";

export default function CustomToast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div className="fixed right-5 top-5 z-[9999] w-[calc(100%-40px)] max-w-sm animate-in slide-in-from-right-5 fade-in duration-300">
      <div className="flex items-start gap-3 rounded-2xl border border-white/20 bg-[#102A43] p-4 text-white shadow-2xl">
        <div
          className={`rounded-xl p-2 ${
            isSuccess ? "bg-emerald-500/20" : "bg-red-500/20"
          }`}
        >
          {isSuccess ? (
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
          ) : (
            <XCircle className="h-6 w-6 text-red-400" />
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-bold">
            {isSuccess ? "Success!" : "Something went wrong"}
          </h3>

          <p className="mt-1 text-sm text-slate-300">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 transition hover:text-white"
          aria-label="Close notification"
        >
          <X size={18} />
        </button>
      </div>

      <div
        className={`h-1 origin-left animate-[toast-progress_3.5s_linear_forwards] ${
          isSuccess ? "bg-emerald-400" : "bg-red-400"
        }`}
      />
    </div>
  );
}
