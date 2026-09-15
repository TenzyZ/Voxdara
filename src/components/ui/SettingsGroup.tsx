import React from "react";

interface SettingsGroupProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const SettingsGroup: React.FC<SettingsGroupProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="space-y-2">
      {title && (
        <div className="px-4">
          <h2 className="text-sm font-semibold text-text">{title}</h2>
          {description && (
            <p className="mt-0.5 text-xs text-text-muted">{description}</p>
          )}
        </div>
      )}
      <div className="overflow-visible rounded-lg border border-border bg-surface">
        <div className="divide-y divide-border">{children}</div>
      </div>
    </div>
  );
};
