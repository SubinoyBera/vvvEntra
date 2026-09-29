import React from 'react';
import { useApp } from '../../context/AppContext';
import { Info, CheckCircle2, AlertTriangle, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarn = toast.type === 'warn';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border shadow-xl flex items-start gap-3 text-xs bg-[var(--bg-paper)] transition-all transform translate-y-0 ${
              isSuccess
                ? 'border-emerald-500/40 text-[var(--text)]'
                : isWarn
                ? 'border-amber-500/40 text-[var(--text)]'
                : 'border-[var(--line-strong)] text-[var(--text)]'
            }`}
            role="status"
          >
            {isSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            ) : isWarn ? (
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            ) : (
              <Info className="w-4 h-4 text-[var(--role)] shrink-0 mt-0.5" />
            )}

            <div className="flex-1 leading-relaxed">{toast.message}</div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[var(--text-faint)] hover:text-[var(--text)] transition-colors p-0.5"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
