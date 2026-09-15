import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "compact";
}

export const Input: React.FC<InputProps> = ({
  className = "",
  variant = "default",
  disabled,
  ...props
}) => {
  const baseClasses =
    "rounded-md border border-border-strong bg-surface text-start text-sm font-normal text-text placeholder:text-text-muted transition-colors duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring";

  const interactiveClasses = disabled
    ? "cursor-not-allowed border-border bg-background text-text-disabled"
    : "";

  const variantClasses = {
    default: "h-8 px-3",
    compact: "h-7 px-2",
  } as const;

  return (
    <input
      className={`${baseClasses} ${variantClasses[variant]} ${interactiveClasses} ${className}`}
      disabled={disabled}
      {...props}
    />
  );
};
