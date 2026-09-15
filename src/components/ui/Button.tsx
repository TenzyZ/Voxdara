import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "primary-soft"
    | "secondary"
    | "warning"
    | "danger"
    | "danger-ghost"
    | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md border font-medium transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-not-allowed disabled:border-border disabled:bg-background disabled:text-text-disabled disabled:hover:border-border disabled:hover:bg-background";

  const variantClasses = {
    primary:
      "border-interactive bg-interactive text-on-interactive hover:bg-interactive-hover active:bg-interactive-active",
    "primary-soft":
      "border-transparent bg-surface-subtle text-text hover:bg-selected active:bg-selected",
    secondary:
      "border-border-strong bg-surface text-text hover:bg-surface-subtle active:bg-selected",
    warning:
      "border-border-strong bg-surface text-text hover:border-warning hover:bg-warning/10 active:bg-warning/15",
    danger: "border-error bg-error text-on-interactive",
    "danger-ghost":
      "border-transparent text-error hover:bg-error/10 active:bg-error/15",
    ghost:
      "border-transparent bg-transparent text-current hover:bg-surface-subtle active:bg-selected",
  };

  const sizeClasses = {
    sm: "h-7 gap-1.5 px-2.5 text-xs",
    md: "h-8 gap-2 px-3 text-sm",
    lg: "h-9 gap-2 px-4 text-sm",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
