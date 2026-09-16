# Contributing to Voxdara

Voxdara is an open-source, local-first desktop dictation project currently focused on a Windows-first preview. Useful contributions include reproducible bug reports, focused fixes, targeted improvements, and documentation corrections.

## Before You Start

- Search the Voxdara [Issues](https://github.com/TenzyZ/Voxdara/issues) before starting.
- Keep each contribution focused on one purpose.
- Avoid unrelated refactors or cleanup.
- Raise larger behavioral or architecture changes in an issue before investing heavily in implementation.

## Development Setup

1. Fork the repository.
2. Clone your fork.
3. Create a focused branch for the change.
4. Follow [BUILD.md](BUILD.md) for prerequisites and platform setup.
5. Install dependencies with `bun install`.
6. Run Voxdara locally with `bun run tauri dev`.

## Project Layout

See [AGENTS.md](AGENTS.md) for the current architecture, component boundaries, protected behavior, and project engineering rules.

## Reporting Bugs

Open a Voxdara [Issue](https://github.com/TenzyZ/Voxdara/issues) with the Voxdara version, Windows version or other relevant OS details, CPU, GPU where relevant, reproduction steps, expected behavior, actual behavior, and useful logs. Press `Ctrl+Shift+D` in Voxdara to expose debug settings when diagnostic information is needed.

### Sensitive Data

Remove private information before posting logs, screenshots, recordings, or issue attachments. Check for API keys, dictated transcripts, microphone recordings, clipboard contents, private file paths, and other personal data.

## Proposing Changes

Search existing [Issues](https://github.com/TenzyZ/Voxdara/issues), then describe the problem or use case and the intended behavior. For larger product or architecture changes, discuss the direction in an issue before implementation.

## Pull Requests

- Keep each pull request focused on one purpose.
- Explain what changed and why.
- Include verification evidence.
- Exclude unrelated cleanup.
- Document user-visible behavior changes.
- Update tests and documentation when relevant.

## Checks

Run the checks relevant to your change. Frontend, translation, model-language, and UI checks run from the repository root:

```powershell
bun run check:translations
bun run check:model-languages
bun run lint
bun run format:check
bun run test:playwright
```

Run Rust formatting and tests from the backend directory:

```powershell
cd src-tauri
cargo fmt --check
cargo test
```

Playwright is primarily relevant to frontend and end-to-end behavior; Rust tests require the platform prerequisites documented in [BUILD.md](BUILD.md).

## Code Style

Follow existing repository conventions and keep applicable formatting and lint checks passing. Use Conventional Commit style for commit messages.

## License

By contributing to Voxdara, you agree that your contributions will be licensed under the [MIT License](LICENSE).
