import React from "react";
import { ResetIcon } from "../icons";

interface ResetButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
}

export const ResetButton: React.FC<ResetButtonProps> = React.memo(
  ({ onClick, disabled = false, className = "", ariaLabel, children }) => (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`inline-flex size-7 items-center justify-center rounded-md border border-transparent transition-colors duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${
        disabled
          ? "cursor-not-allowed text-text-disabled"
          : "cursor-pointer text-text-muted hover:bg-surface-subtle hover:text-text active:bg-selected"
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children ?? <ResetIcon className="size-4" aria-hidden="true" />}
    </button>
  ),
);
