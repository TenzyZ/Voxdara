import React from "react";
import { useTranslation } from "react-i18next";
import HandyTextLogo from "./icons/HandyTextLogo";
import {
  AboutIcon,
  AdvancedIcon,
  DebugIcon,
  GeneralIcon,
  HistoryIcon,
  ModelsIcon,
  PostProcessingIcon,
} from "./icons";
import { useSettings } from "../hooks/useSettings";
import {
  GeneralSettings,
  AdvancedSettings,
  HistorySettings,
  DebugSettings,
  AboutSettings,
  PostProcessingSettings,
  ModelsSettings,
} from "./settings";

export type SidebarSection = keyof typeof SECTIONS_CONFIG;

interface IconProps {
  width?: number | string;
  height?: number | string;
  size?: number | string;
  className?: string;
  [key: string]: any;
}

interface SectionConfig {
  labelKey: string;
  icon: React.ComponentType<IconProps>;
  component: React.ComponentType;
  enabled: (settings: any) => boolean;
}

export const SECTIONS_CONFIG = {
  general: {
    labelKey: "sidebar.general",
    icon: GeneralIcon,
    component: GeneralSettings,
    enabled: () => true,
  },
  history: {
    labelKey: "sidebar.history",
    icon: HistoryIcon,
    component: HistorySettings,
    enabled: () => true,
  },
  models: {
    labelKey: "sidebar.models",
    icon: ModelsIcon,
    component: ModelsSettings,
    enabled: () => true,
  },
  advanced: {
    labelKey: "sidebar.advanced",
    icon: AdvancedIcon,
    component: AdvancedSettings,
    enabled: () => true,
  },
  postprocessing: {
    labelKey: "sidebar.postProcessing",
    icon: PostProcessingIcon,
    component: PostProcessingSettings,
    enabled: (settings) => settings?.post_process_enabled ?? false,
  },
  debug: {
    labelKey: "sidebar.debug",
    icon: DebugIcon,
    component: DebugSettings,
    enabled: (settings) => settings?.debug_mode ?? false,
  },
  about: {
    labelKey: "sidebar.about",
    icon: AboutIcon,
    component: AboutSettings,
    enabled: () => true,
  },
} as const satisfies Record<string, SectionConfig>;

interface SidebarProps {
  activeSection: SidebarSection;
  onSectionChange: (section: SidebarSection) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const { t } = useTranslation();
  const { settings } = useSettings();

  const availableSections = Object.entries(SECTIONS_CONFIG)
    .filter(([_, config]) => config.enabled(settings))
    .map(([id, config]) => ({ id: id as SidebarSection, ...config }));

  return (
    <div className="flex h-full w-40 flex-col items-center border-e border-border px-2">
      <HandyTextLogo width={120} className="m-4" />
      <div className="flex w-full flex-col items-center gap-1 border-t border-border pt-2">
        {availableSections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <div
              key={section.id}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 text-text-muted transition-colors duration-150 before:absolute before:inset-y-2 before:start-0 before:w-0.5 before:rounded-full before:bg-transparent ${
                isActive
                  ? "bg-selected text-text before:bg-interactive"
                  : "hover:bg-surface-subtle hover:text-text"
              }`}
              onClick={() => onSectionChange(section.id)}
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
              <p
                className="text-sm font-medium truncate"
                title={t(section.labelKey)}
              >
                {t(section.labelKey)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
