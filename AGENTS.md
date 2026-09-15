# Voxdara Repository Instructions

## Project Identity

This repository is Voxdara.

Voxdara is a local-first desktop AI dictation application derived from the open-source Handy codebase.

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

Phase 0 — Handy Baseline Verification

The current objective is only to prove that the inherited Handy application can build and run successfully on the user's Windows machine.

Required baseline path:

build
→ launch
→ global hotkey
→ microphone capture
→ local STT
→ text inserted into another Windows application

Do not begin product transformation until this baseline is verified.

## Current Scope

Allowed during Phase 0:

- inspect repository files
- inspect build configuration
- install documented development dependencies when explicitly authorized
- run documented build commands
- run the application
- gather build/runtime evidence
- diagnose baseline build/runtime failures
- apply only the smallest fix when a baseline-blocking defect is proven and the user explicitly authorizes implementation

Do not during Phase 0:

- rebrand Handy to Voxdara
- redesign the UI
- replace icons or assets
- change package identifiers
- change updater infrastructure
- change signing infrastructure
- remove product features
- add cleanup LLMs
- add cloud providers
- add provider routing
- replace STT engines
- restructure the architecture
- perform broad refactors
- optimize performance before baseline measurement
- work on macOS or Linux unless explicitly requested
- fix unrelated upstream issues

## Upstream Relationship

The imported codebase originated from:

https://github.com/cjpais/Handy

Treat Handy as the upstream engineering foundation.

Do not assume upstream behavior is correct for Voxdara long-term, but preserve working inherited infrastructure until Voxdara has verified replacements.

Do not remove required upstream license or attribution notices.

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

Frontend-only commands:

bun run dev
bun run build

Validation commands when appropriate:

bun run lint
bun run format:check

For Windows, BUILD.md documents requirements including:

Rust stable
Bun
Microsoft Visual Studio C++ Build Tools
CMake
Vulkan SDK

Do not invent dependencies or installation requirements not confirmed by repository files or official documentation.

Windows First

Voxdara's first supported platform is Windows.

During current phases, prioritize:

Windows microphone capture
Windows hotkeys
Windows text insertion
Windows GPU/runtime behavior
deterministic focus and clipboard behavior

Do not expand platform scope without explicit approval.

Engineering Rules

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
Voxdara Product Principles

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
Privacy

Local mode must not transmit audio or transcripts off-device.

Do not silently send:

microphone audio
transcripts
clipboard content
active-window text
API keys

Do not add telemetry by default.

Model Terminology

Use precise terminology:

ASR / STT model = audio → text
local cleanup LLM = text → polished text
speech-language model = model that directly consumes audio and performs language reasoning

Do not call a text cleanup model a speech LLM.

Git Workflow

Use one branch and one pull request per development phase.

Do not commit directly to main unless the user explicitly requests it.

Current working branch:

phase/0-handy-baseline

Before creating commits:

inspect git status
avoid staging unrelated local files
use conventional commit messages
do not delete user-owned files or evidence
do not rewrite history unless explicitly instructed
Agent Behavior

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
