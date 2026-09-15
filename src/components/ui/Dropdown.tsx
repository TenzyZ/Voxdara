import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckIcon, ChevronDownIcon } from "../icons";

export interface DropdownOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  className?: string;
  menuClassName?: string;
  selectedValue: string | null;
  onSelect: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onRefresh?: () => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onSelect,
  className = "",
  menuClassName,
  placeholder = "Select an option...",
  disabled = false,
  onRefresh,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (disabled) return;
    if (!isOpen && onRefresh) onRefresh();
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className={`grid h-8 min-w-[200px] w-full grid-cols-[1fr_auto] items-center gap-2 rounded-md border bg-surface px-3 text-start text-sm font-normal text-text transition-colors duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${
          isOpen ? "border-text" : "border-border-strong"
        } ${
          disabled
            ? "cursor-not-allowed border-border bg-background text-text-disabled"
            : "cursor-pointer"
        }`}
        onClick={handleToggle}
        disabled={disabled}
      >
        <span className="truncate">{selectedOption?.label || placeholder}</span>
        <ChevronDownIcon
          className={`size-4 transition-[transform] duration-150 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {isOpen && !disabled && (
        <div
          className={`absolute top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-lg border border-border bg-surface-raised p-1 shadow-raised ${
            menuClassName ?? "left-0 right-0"
          }`}
        >
          {options.length === 0 ? (
            <div className="p-2 text-sm text-text-muted">
              {t("common.noOptionsFound")}
            </div>
          ) : (
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`grid w-full grid-cols-[1fr_auto] items-center gap-2 rounded-md px-3 text-start text-sm transition-colors duration-150 hover:bg-surface-subtle ${
                  option.description ? "py-2" : "h-8"
                } ${selectedValue === option.value ? "bg-selected font-medium" : ""} ${
                  option.disabled
                    ? "cursor-not-allowed text-text-disabled hover:bg-transparent"
                    : "cursor-pointer"
                }`}
                onClick={() => handleSelect(option.value)}
                disabled={option.disabled}
              >
                <span className="min-w-0">
                  <span className="block whitespace-normal break-words">
                    {option.label}
                  </span>
                  {option.description && (
                    <span className="mt-0.5 block whitespace-normal text-xs font-normal text-text-muted">
                      {option.description}
                    </span>
                  )}
                </span>
                {selectedValue === option.value && (
                  <CheckIcon className="size-4" aria-hidden="true" />
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
