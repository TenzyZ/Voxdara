import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "success" | "secondary";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  className = "",
}) => {
  const variantClasses = {
    primary: "bg-interactive text-on-interactive",
    success: "bg-success/10 text-success",
    secondary: "bg-surface-subtle text-text-muted",
  };

  return (
    <span
      className={`inline-flex h-5 items-center gap-1.5 rounded px-1.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
