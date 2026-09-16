// Standalone assert check (no JS unit-test runner in this repo). Run with:
//   bun src/components/whats-new/whatsNewBranding.test.ts
import assert from "node:assert";
import { readFileSync, readdirSync } from "node:fs";

type Translation = {
  whatsNew: { title: string };
  settings: {
    about: {
      title: string;
      whatsNewUpdates: { description: string };
      version: { description: string };
      appDataDirectory: { description: string };
      acknowledgments: { ggml: { details: string } };
      supportDevelopment?: unknown;
    };
    advanced: {
      autostart: { description: string };
      showTrayIcon: { description: string };
    };
    models: { rescan: { tooltip: string } };
    general: { shortcut: { title: string } };
  };
  onboarding: { permissions: { description: string } };
  appLanguage: { description: string };
  theme: { description: string };
  sidebar: { about: string };
};

const localesUrl = new URL("../../i18n/locales/", import.meta.url);
const localeDirectories = readdirSync(localesUrl, {
  withFileTypes: true,
}).filter((entry) => entry.isDirectory());

assert.ok(localeDirectories.length > 0, "no locale directories found");

for (const locale of localeDirectories) {
  const translation = JSON.parse(
    readFileSync(
      new URL(`${locale.name}/translation.json`, localesUrl),
      "utf8",
    ),
  ) as Translation;
  const title = translation.whatsNew.title;
  const description = translation.settings.about.whatsNewUpdates.description;

  assert.ok(title.includes("Voxdara"), `${locale.name}: title lacks Voxdara`);
  assert.ok(!title.includes("Handy"), `${locale.name}: title contains Handy`);
  assert.ok(
    title.includes("{{version}}"),
    `${locale.name}: title lacks {{version}}`,
  );
  assert.ok(
    description.includes("Voxdara"),
    `${locale.name}: description lacks Voxdara`,
  );
  assert.ok(
    !description.includes("Handy"),
    `${locale.name}: description contains Handy`,
  );

  const brandingValues = [
    [
      "settings.about.version.description",
      translation.settings.about.version.description,
    ],
    [
      "settings.about.appDataDirectory.description",
      translation.settings.about.appDataDirectory.description,
    ],
    [
      "settings.about.acknowledgments.ggml.details",
      translation.settings.about.acknowledgments.ggml.details,
    ],
    [
      "settings.advanced.autostart.description",
      translation.settings.advanced.autostart.description,
    ],
    [
      "settings.advanced.showTrayIcon.description",
      translation.settings.advanced.showTrayIcon.description,
    ],
    ["settings.models.rescan.tooltip", translation.settings.models.rescan.tooltip],
    [
      "settings.general.shortcut.title",
      translation.settings.general.shortcut.title,
    ],
    [
      "onboarding.permissions.description",
      translation.onboarding.permissions.description,
    ],
    ["appLanguage.description", translation.appLanguage.description],
    ["theme.description", translation.theme.description],
    ["settings.about.title", translation.settings.about.title],
    ["sidebar.about", translation.sidebar.about],
  ] as const;

  for (const [key, value] of brandingValues) {
    assert.ok(
      !value.includes("Handy"),
      `${locale.name}: ${key} contains Handy`,
    );
  }
  assert.ok(
    !("supportDevelopment" in translation.settings.about),
    `${locale.name}: settings.about.supportDevelopment remains`,
  );
}

const releaseNote = readFileSync(
  new URL("../../content/release-notes/0.9.7.md", import.meta.url),
  "utf8",
);
assert.ok(releaseNote.includes("Voxdara"), "0.9.7 release note lacks Voxdara");
assert.ok(!releaseNote.includes("Handy"), "0.9.7 release note contains Handy");

console.log(
  `whatsNewBranding: ${localeDirectories.length} locales passed`,
);
