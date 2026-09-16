# Voxdara

**Open-source, local-first AI dictation for Windows.**

Press a shortcut, speak, and Voxdara transcribes locally before inserting the result into the active application.

## Download / Install Voxdara

### Windows x64

<a href="https://github.com/TenzyZ/Voxdara/releases/download/v0.9.7-alpha.1/Voxdara-0.9.7-alpha.1-win-x64.exe"><img src="design/brand/production/voxdara-app-icon-1024.png" alt="Download Voxdara for Windows x64" width="160"></a>

**[Download Voxdara for Windows x64](https://github.com/TenzyZ/Voxdara/releases/download/v0.9.7-alpha.1/Voxdara-0.9.7-alpha.1-win-x64.exe)**

Version `0.9.7-alpha.1` · [SHA-256 checksum](https://github.com/TenzyZ/Voxdara/releases/download/v0.9.7-alpha.1/Voxdara-0.9.7-alpha.1-win-x64.exe.sha256) · [Release notes](https://github.com/TenzyZ/Voxdara/blob/main/.github/release-notes/v0.9.7-alpha.1.md)

> [!NOTE]
> This is an unsigned preview. Windows SmartScreen may show an **Unknown publisher** warning. Automatic updates are disabled; download future releases manually.

1. Download the installer.
2. Double-click `Voxdara-0.9.7-alpha.1-win-x64.exe`.
3. Complete the installation.
4. Launch Voxdara.
5. Complete first-run model setup if prompted.
6. Start dictating.

### Build from source

Developers can follow [BUILD.md](BUILD.md). Packaged-app users do not need the development toolchain.

## How It Works

1. Trigger the configured shortcut.
2. Speak while recording is active.
3. Voxdara filters silence with Silero VAD and transcribes the audio locally.
4. The resulting text is inserted into the application you are using.

Choose and manage the speech-to-text model in the application. Supported models use local inference, with GPU acceleration when available.

## Local-First and Privacy

The normal transcription path runs on your device and does not require a paid cloud API. Microphone audio and transcripts stay local on that path.

Optional cloud post-processing is disabled by default. It is used only when you explicitly configure and enable a provider. Voxdara may otherwise access the network for actions such as downloading models.

## Models

Download, select, and manage speech-to-text models from within Voxdara instead of maintaining a fixed model list by hand.

Voxdara can also discover compatible `.bin` and `.gguf` models placed in:

```text
%APPDATA%\com.pais.handy\models
```

Compatible GGUF models already present in the shared Hugging Face cache can be reused. **Settings > About** shows the current app-data directory.

## Project Status

Voxdara `0.9.7-alpha.1` is an alpha preview targeting Windows x64. The installer is unsigned, so Windows SmartScreen may warn before installation. Automatic updates are disabled for this preview.

The application currently retains `com.pais.handy` for persisted app data. Running upstream Handy and Voxdara side by side is not yet a supported isolation scenario.

## Troubleshooting

### Previous Clipboard Content Is Pasted

If **History** contains the correct transcription but an earlier clipboard value is inserted, press `Ctrl+Shift+D` to reveal **Debug** settings.

Try **Reliable Paste (Beta)** with a clipboard paste method. If it is disabled or unavailable, increase **Paste Delay (After)**. **Paste Delay (Before)** controls the separate wait before the paste keystroke is sent.

### Vulkan Overlay or Capture Conflicts

Voxdara normally asks the Vulkan loader to skip implicit layers to avoid conflicts with overlay and capture hooks. To keep implicit layers for GPU selection or debugging tools, fully quit Voxdara, then run these commands in the same PowerShell window:

```powershell
$env:HANDY_KEEP_VULKAN_IMPLICIT_LAYERS = "1"
& "$env:ProgramFiles\Voxdara\voxdara.exe"
```

Adjust the path if Voxdara was installed elsewhere. The override applies only to applications launched from that PowerShell session.

## Contributing

Report bugs and propose changes through the Voxdara repository's [Issues](https://github.com/TenzyZ/Voxdara/issues) and [Pull Requests](https://github.com/TenzyZ/Voxdara/pulls).

## License and Acknowledgments

Voxdara is available under the [MIT License](LICENSE).

Technical credits:

- Whisper by OpenAI
- ggml and transcribe.cpp
- Silero VAD
- Tauri
