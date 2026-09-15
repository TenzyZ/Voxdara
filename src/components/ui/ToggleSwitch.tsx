import React from "react";
import { SettingContainer } from "./SettingContainer";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  isUpdating?: boolean;
  label: string;
  description: string;
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
  tooltipPosition?: "top" | "bottom";
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  isUpdating = false,
  label,
  description,
  descriptionMode = "tooltip",
  grouped = false,
  tooltipPosition = "top",
}) => {
  return (
    <SettingContainer
      title={label}
      description={description}
      descriptionMode={descriptionMode}
      grouped={grouped}
      disabled={disabled}
      tooltipPosition={tooltipPosition}
    >
      <label
        className={`flex items-center ${disabled || isUpdating ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={checked}
          disabled={disabled || isUpdating}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="peer relative h-6 w-11 rounded-full border border-border-strong bg-surface transition-colors duration-150 after:absolute after:start-1 after:top-1 after:size-4 after:rounded-full after:bg-text-muted after:content-[''] after:transition-[transform] after:duration-150 peer-checked:border-interactive peer-checked:bg-interactive peer-checked:after:translate-x-5 peer-checked:after:bg-on-interactive rtl:peer-checked:after:-translate-x-5 peer-focus:outline-none peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus-ring peer-disabled:border-border peer-disabled:bg-background peer-disabled:after:bg-text-disabled"></div>
      </label>
      {isUpdating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-4 animate-spin rounded-full border-2 border-activity border-t-transparent"></div>
        </div>
      )}
    </SettingContainer>
  );
};
