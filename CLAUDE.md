# Voxdara Repository Instructions

## Project Identity

This repository is Voxdara.

Voxdara is a Handy-derived, open-source, local-first Windows desktop AI dictation application.

The product goal is:

hotkey
→ microphone capture
→ local speech-to-text
→ optional text cleanup
→ final text
→ active desktop application

Voxdara is not a voice chatbot, general-purpose AI assistant, or meeting-notes platform.

The default product path must work locally without a paid API.

## Current Phase

Phase 1 — Voxdara Visual Foundation

The working dictation architecture is proven. The visual transformation is intentionally separated from dictation internals.

Current rule:

Handy determines what exists. Voxdara determines how it looks.

## Planning and Implementation Gate

Planning is authorized now. Claude Opus may inspect the repository, current UI, architecture evidence, baseline screenshots, accepted Voxdara design references, brand assets, and approved design skills to produce:

- Voxdara UI Design Contract v1
- one frozen Phase 1 implementation plan

Production visual changes are allowed only after:

- the Phase 1 plan is frozen
- the user approves it
- implementation occurs on a dedicated Phase 1 branch
- implementation stays within the frozen scope
- automated and human visual/runtime verification pass

This does not authorize a general unrestricted redesign.

## Authorized Visual Scope

Under a frozen, user-approved Phase 1 plan, work may include:

- Voxdara brand assets
- visible Voxdara wordmark
- application-icon artwork or resources when the change is purely visual
- semantic design tokens
- typography, spacing, radii, borders, and restrained elevation or motion rules
- icon-system architecture
- styling existing UI primitives
- visual accessibility improvements
- replacement of visible Handy branding when the replacement is purely presentational

Later Voxdara visual phases may use the approved design system and design skills without another repository-policy rewrite, but each phase still requires its own frozen scope and approval.

## Approved Visual Evidence

Accepted visual reference board:

`C:\Projects\Voxdara\.local-evidence\voxdara-design-reference-2026-09-15\voxdara-reference-board.png`

Accepted brand-reference assets:

- `C:\Projects\Voxdara\design\brand\source\voxdara-wordmark-reference.png`
- `C:\Projects\Voxdara\design\brand\source\voxdara-symbol-reference.png`

The reference board is art direction and a quality target, not a pixel-exact specification or a feature specification. Agents may refine spacing, typography, density, accessibility, component consistency, icon implementation, and visual details when that produces a stronger real desktop UI. Do not create functionality merely because it appears in the concept board; current source and runtime behavior remain functional truth.

Do not creatively redesign the accepted Voxdara logo or symbol geometry without explicit user approval. Production-safe derivatives may later be prepared from the accepted artwork while preserving the accepted identity.

## Approved Design Skills

The following installed skills are approved when relevant for Phase 1 and subsequent Voxdara visual phases:

- `frontend-design`
- `design-system`
- `redesign-existing-projects`

They are guidance, not authority. Use this precedence:

current Voxdara source and runtime evidence
→ repository architecture and policy
→ accepted Voxdara brand and design references
→ approved design skills
→ agent design judgment

A skill must never override actual product behavior, architecture boundaries, or explicit user decisions. Do not use `gpt-taste`. Do not apply web- or marketing-oriented patterns that are inappropriate for a restrained desktop dictation application.

## Protected Architecture

Phase 1 visual authorization does not authorize changes to:

- `TranscriptionCoordinator`
- the `TranscribeAction` lifecycle
- `AudioRecordingManager`
- `AudioRecorder`
- `TranscriptionManager`
- STT behavior or streaming/batch behavior
- VAD
- `clipboard::paste` or `paste_tx`
- focus restoration or focus behavior
- recording-overlay no-activate behavior
- shortcut backends
- `handy_keys` or `handy-keys` contracts
- settings persistence semantics
- `com.pais.handy` or user-data migration
- updater endpoint or key
- signing or release infrastructure
- model hosting
- `cjpais/*` dependency forks
- patched `tao`
- DLL staging
- generated bindings behavior
- cross-platform behavior

Do not globally rename every Handy occurrence. Internal identifiers such as `handy_keys` are not branding. Changing the Tauri `productName`, executable name, installer name, bundle identity, identifier, or user-data paths is not automatically visual work.

Phase 1 also does not authorize removing product features; adding cleanup LLMs, cloud providers, or provider routing; replacing STT engines; restructuring the architecture; broad refactors; performance optimization; unrelated upstream fixes; or macOS/Linux work unless explicitly approved.

## Upstream Relationship

The imported codebase originated from:

https://github.com/cjpais/Handy

Treat Handy as the upstream engineering foundation.

Do not assume upstream behavior is correct for Voxdara long-term, but preserve working inherited infrastructure until Voxdara has verified replacements.

Preserve existing Handy/CJ Pais MIT attribution and source provenance. Replacing visible Handy branding does not remove upstream code provenance. Do not remove or replace upstream copyright or attribution notices with Voxdara-only notices.

## Architecture

Current inherited stack:

- Tauri 2 desktop application
- Rust backend
- React + TypeScript frontend
- Bun package manager
- local STT through transcribe-cpp / transcribe-rs
- cpal for audio capture
- local VAD
- global shortcuts
- recording overlay
- model management
- clipboard/text injection

Backend:

src-tauri/src/

Important backend areas include:

- managers/
- audio_toolkit/
- commands/
- shortcut handling
- settings
- transcription pipeline
- overlay/platform integration

Frontend:

src/

Important frontend areas include:

- components/
- settings/
- model-selector/
- onboarding/
- overlay/
- stores/
- bindings.ts

Do not rely on this summary instead of inspecting the current repository.

Repository state is authoritative.

## Build Guidance

Read BUILD.md before changing build configuration.

Primary inherited development commands:

```bash
bun install
bun run tauri dev
```

Frontend-only commands:

```bash
bun run dev
bun run build
```

Validation commands when appropriate:

```bash
bun run lint
bun run format:check
```

For Windows, BUILD.md documents requirements including:

Rust stable
Bun
Microsoft Visual Studio C++ Build Tools
CMake
Vulkan SDK

Do not invent dependencies or installation requirements not confirmed by repository files or official documentation.

## Windows First

Voxdara's first supported platform is Windows.

During current phases, prioritize:

Windows microphone capture
Windows hotkeys
Windows text insertion
Windows GPU/runtime behavior
deterministic focus and clipboard behavior

Do not expand platform scope without explicit approval.

## Engineering Rules

Before modifying code:

inspect the relevant files
identify the failing layer
gather evidence
form one hypothesis
make the smallest justified change
verify the change
check regressions

Do not rewrite working architecture to solve a localized problem.

Never invent:

repository files
dependency state
model support
build results
benchmark results
APIs
licenses
test outcomes

Clearly distinguish:

confirmed repository fact
inference
recommendation
experiment

## Voxdara Product Principles

Optimize for:

low end-to-end latency
high transcription accuracy
preservation of speaker intent
local-first privacy
reliable paste-anywhere behavior
simple installation
replaceable model backends
measurable performance
small controlled scope
finished usable product over oversized prototype

## Privacy

Local mode must not transmit audio or transcripts off-device.

Do not silently send:

microphone audio
transcripts
clipboard content
active-window text
API keys

Do not add telemetry by default.

## Model Terminology

Use precise terminology:

ASR / STT model = audio → text
local cleanup LLM = text → polished text
speech-language model = model that directly consumes audio and performs language reasoning

Do not call a text cleanup model a speech LLM.

## Git Workflow

Use one branch and one pull request per development phase.

Do not commit directly to main unless the user explicitly requests it.

Phase 1 production visual implementation must use its dedicated Phase 1 branch and must not occur directly on main.

Before creating commits:

inspect git status
avoid staging unrelated local files
use conventional commit messages
do not delete user-owned files or evidence
do not rewrite history unless explicitly instructed

## Agent Behavior

Investigate before answering questions about the codebase.

Open the relevant files before making implementation claims.

Do not infer file contents from filenames alone.

Do not make unrelated changes.

Report:

what was inspected
what changed
verification commands
results
remaining risks or assumptions

Stop when the requested scope is complete.
