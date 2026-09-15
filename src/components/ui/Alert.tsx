import React from "react";
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "../icons";

type AlertVariant = "error" | "warning" | "info" | "success";

interface AlertProps {
  variant?: AlertVariant;
  /** When true, removes rounded corners for use inside containers */
  contained?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<
  AlertVariant,
  { container: string; icon: string; text: string }
> = {
  error: {
    container: "bg-error/10",
    icon: "text-error",
    text: "text-error",
  },
  warning: {
    container: "bg-warning/10",
    icon: "text-warning",
    text: "text-text",
  },
  info: {
    container: "bg-activity/10",
    icon: "text-activity",
    text: "text-text",
  },
  success: {
    container: "bg-success/10",
    icon: "text-success",
    text: "text-text",
  },
};

const variantIcons: Record<AlertVariant, React.ElementType> = {
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
  success: SuccessIcon,
};

export const Alert: React.FC<AlertProps> = ({
  variant = "error",
  contained = false,
  children,
  className = "",
}) => {
  const styles = variantStyles[variant];
  const Icon = variantIcons[variant];

  return (
    <div
      className={`flex items-start gap-3 p-3 ${styles.container} ${contained ? "" : "rounded-lg"} ${className}`}
    >
      <Icon
        className={`mt-0.5 size-5 shrink-0 ${styles.icon}`}
        aria-hidden="true"
      />
      <p className={`text-sm ${styles.text}`}>{children}</p>
    </div>
  );
};
