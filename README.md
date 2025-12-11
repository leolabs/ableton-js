# Ableton.js

[![npm version](https://img.shields.io/npm/v/ableton-js.svg)](https://www.npmjs.com/package/ableton-js)
[![npm downloads](https://img.shields.io/npm/dm/ableton-js.svg)](https://www.npmjs.com/package/ableton-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue.svg)](https://www.typescriptlang.org/)
[![Ableton Live](https://img.shields.io/badge/Ableton%20Live-10%20|%2011%20|%2012-orange.svg)](https://www.ableton.com/)

**Control Ableton Live from Node.js** - A comprehensive TypeScript library that exposes Ableton Live's MIDI Remote Script API to JavaScript/TypeScript developers.

---

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Architecture](#architecture)
- [Protocol Details](#protocol-details)
- [Troubleshooting](#troubleshooting)
- [Known Issues](#known-issues)
- [Contributing](#contributing)
- [Sponsored Project](#sponsored-project)
- [License](#license)

---

## Features

- **Full TypeScript Support** - Type-safe API with complete IntelliSense
- **Comprehensive Coverage** - Control songs, tracks, clips, devices, parameters, and more
- **Real-time Events** - Subscribe to property changes with automatic cleanup
- **Smart Caching** - LRU cache with ETag validation reduces UDP bandwidth
- **Message Compression** - Gzip compression for large payloads
- **Automatic Chunking** - Handles messages larger than UDP packet size
- **Multiple Instances** - Control multiple Ableton instances simultaneously
- **Connection Management** - Automatic heartbeat monitoring and reconnection handling
- **Detailed Logging** - Pluggable logger interface for debugging

---

## Quick Start

```typescript
import { Ableton } from "ableton-js";

const ableton = new Ableton({ logger: console });

async function main() {
  // Connect to Ableton Live
  await ableton.start();

  // Get current tempo
  const tempo = await ableton.song.get("tempo");
  console.log(`Current tempo: ${tempo} BPM`);

  // Set new tempo
  await ableton.song.set("tempo", 128);

  // Listen for playback changes
  const removeListener = await ableton.song.addListener("is_playing", (isPlaying) => {
    console.log(isPlaying ? "Playback started" : "Playback stopped");
  });

  // Start playback
  await ableton.song.startPlaying();

  // Get all tracks
  const tracks = await ableton.song.get("tracks");
  for (const track of tracks) {
    console.log(`Track: ${track.raw.name}`);
  }

  // Clean up listener when done
  removeListener();
}

main().catch(console.error);
```

---

## Installation

### 1. Install the npm package

```bash
npm install ableton-js
# or
yarn add ableton-js
# or
pnpm add ableton-js
```

### 2. Install the MIDI Remote Script

Copy the `midi-script` folder from the package to Ableton's Remote Scripts folder:

**macOS:**
```bash
cp -r node_modules/ableton-js/midi-script ~/Music/Ableton/User\ Library/Remote\ Scripts/AbletonJS
```

**Windows:**
```bash
xcopy /E /I node_modules\ableton-js\midi-script "%USERPROFILE%\Documents\Ableton\User Library\Remote Scripts\AbletonJS"
```

**Linux:**
```bash
cp -r node_modules/ableton-js/midi-script ~/Ableton/User\ Library/Remote\ Scripts/AbletonJS
```

### 3. Configure Ableton Live

1. Open Ableton Live
2. Go to **Preferences** → **Link, Tempo & MIDI**
3. Under **Control Surface**, select **AbletonJS**
4. Leave Input and Output as "None"

![Ableton Live Settings](https://i.imgur.com/a34zJca.png)

### Development Setup (macOS)

If you've cloned the repository, use the provided scripts:

```bash
# For Ableton Live 10
yarn ableton10:start

# For Ableton Live 11
yarn ableton11:start

# For Ableton Live 12
yarn ableton12:start
```

This will copy the MIDI script, launch Ableton, and tail the logs.

---

## Configuration

### Ableton Options

```typescript
import { Ableton } from "ableton-js";

const ableton = new Ableton({
  // Custom port file names (for multiple instances)
  serverPortFile: "ableton-js-server.port",
  clientPortFile: "ableton-js-client.port",

  // Connection monitoring (milliseconds)
  heartbeatInterval: 2000,
  commandTimeoutMs: 2000,
  commandWarnMs: 1000,

  // Cache configuration
  cacheOptions: {
    max: 500,
    ttl: 1000 * 60 * 10, // 10 minutes
  },
  disableCache: false,

  // Logging
  logger: console, // or custom logger
});
```

### Multiple Instances

Control multiple Ableton instances by using different port files:

```typescript
const instance1 = new Ableton({
  serverPortFile: "ableton-1-server.port",
  clientPortFile: "ableton-1-client.port",
});

const instance2 = new Ableton({
  serverPortFile: "ableton-2-server.port",
  clientPortFile: "ableton-2-client.port",
});
```

---

## API Reference

### Core Namespaces

The `Ableton` instance provides access to these namespaces:

| Namespace | Description | Example |
|-----------|-------------|---------|
| `song` | Playback, tempo, timeline, tracks, scenes | `ableton.song` |
| `application` | App-level control, dialogs, version info | `ableton.application` |
| `session` | Session ring/controller setup | `ableton.session` |
| `internal` | Plugin version and status | `ableton.internal` |
| `midi` | MIDI I/O control | `ableton.midi` |

### Song Properties

```typescript
// Gettable properties (read)
await ableton.song.get("tempo"); // number
await ableton.song.get("is_playing"); // boolean
await ableton.song.get("current_song_time"); // number (beats)
await ableton.song.get("tracks"); // Track[]
await ableton.song.get("scenes"); // Scene[]
await ableton.song.get("master_track"); // Track
await ableton.song.get("return_tracks"); // Track[]
await ableton.song.get("cue_points"); // CuePoint[]
await ableton.song.get("signature_numerator"); // number
await ableton.song.get("signature_denominator"); // number
await ableton.song.get("loop"); // boolean
await ableton.song.get("loop_start"); // number
await ableton.song.get("loop_length"); // number
await ableton.song.get("metronome"); // number
await ableton.song.get("overdub"); // boolean
await ableton.song.get("punch_in"); // boolean
await ableton.song.get("punch_out"); // boolean

// Settable properties (write)
await ableton.song.set("tempo", 120);
await ableton.song.set("current_song_time", 0);
await ableton.song.set("loop", true);
await ableton.song.set("loop_start", 4);
await ableton.song.set("loop_length", 8);
await ableton.song.set("metronome", 1);
await ableton.song.set("overdub", false);
```

### Song Methods

```typescript
// Playback control
await ableton.song.startPlaying();
await ableton.song.stopPlaying();
await ableton.song.continuePlaying();
await ableton.song.stopAllClips();

// Navigation
await ableton.song.jumpToNextCue();
await ableton.song.jumpToPrevCue();
await ableton.song.jumpBy(4); // Jump by beats

// Track management
await ableton.song.createAudioTrack(0); // Insert at index
await ableton.song.createMidiTrack(1);
await ableton.song.createReturnTrack();
await ableton.song.deleteTrack(2);
await ableton.song.duplicateTrack(0);

// Scene management
await ableton.song.createScene(0);
await ableton.song.deleteScene(1);
await ableton.song.duplicateScene(0);

// Recording
await ableton.song.triggerSessionRecord();
await ableton.song.reEnableAutomation();

// Undo/Redo
await ableton.song.undo();
await ableton.song.redo();

// Tap tempo
await ableton.song.tapTempo();
```

### Track Operations

```typescript
const tracks = await ableton.song.get("tracks");
const track = tracks[0];

// Properties
const name = await track.get("name");
const isArmed = await track.get("arm");
const isMuted = await track.get("mute");
const isSoloed = await track.get("solo");
const volume = await track.get("mixer_device");
const color = await track.get("color"); // Color object

// Modify track
await track.set("name", "Lead Synth");
await track.set("arm", true);
await track.set("mute", false);
await track.set("solo", true);

// Get devices on track
const devices = await track.get("devices");
for (const device of devices) {
  console.log(await device.get("name"));
}

// Get clip slots
const clipSlots = await track.get("clip_slots");

// Device management
await track.deleteDevice(0);
await track.duplicateDevice(device);

// Create clips (Live 11+)
await track.createAudioClip("/path/to/audio.wav", 0); // position in beats
await track.createMidiClip(4); // length in beats
```

### Clip Operations

```typescript
const clipSlots = await track.get("clip_slots");
const clipSlot = clipSlots[0];

// Check if slot has clip
const hasClip = await clipSlot.get("has_clip");

if (hasClip) {
  const clip = await clipSlot.get("clip");

  // Clip properties
  const clipName = await clip.get("name");
  const isPlaying = await clip.get("is_playing");
  const length = await clip.get("length");
  const loopStart = await clip.get("loop_start");
  const loopEnd = await clip.get("loop_end");

  // Modify clip
  await clip.set("name", "Intro");
  await clip.set("loop_start", 0);
  await clip.set("loop_end", 8);

  // Playback
  await clip.fire(); // Start clip
  await clip.stop(); // Stop clip

  // MIDI notes (for MIDI clips)
  const notes = await clip.getNotes();
  await clip.setNotes([
    { pitch: 60, time: 0, duration: 0.5, velocity: 100 },
    { pitch: 64, time: 0.5, duration: 0.5, velocity: 100 },
    { pitch: 67, time: 1, duration: 0.5, velocity: 100 },
  ]);

  // Quantize
  await clip.quantize(0.25, 100); // 16th notes, 100% strength
}
```

### Device Control

```typescript
const devices = await track.get("devices");
const synth = devices[0];

// Device info
const deviceName = await synth.get("name");
const className = await synth.get("class_name");
const isEnabled = await synth.get("is_active");

// Enable/disable
await synth.set("is_active", false);

// Parameters
const parameters = await synth.get("parameters");
for (const param of parameters) {
  const paramName = await param.get("name");
  const value = await param.get("value");
  const min = await param.get("min");
  const max = await param.get("max");

  console.log(`${paramName}: ${value} (${min}-${max})`);

  // Modify parameter
  await param.set("value", (min + max) / 2);
}
```

### Event Listeners

```typescript
// Add listener (returns cleanup function)
const removeTempoListener = await ableton.song.addListener("tempo", (tempo) => {
  console.log(`Tempo changed: ${tempo}`);
});

const removePlayingListener = await ableton.song.addListener("is_playing", (playing) => {
  console.log(`Playing: ${playing}`);
});

// Track-level listeners
const track = (await ableton.song.get("tracks"))[0];
const removeArmListener = await track.addListener("arm", (armed) => {
  console.log(`Track armed: ${armed}`);
});

// Clean up listeners when done
removeTempoListener();
removePlayingListener();
removeArmListener();
```

### Connection Events

```typescript
// Connection established
ableton.on("connect", (type) => {
  console.log("Connected:", type); // "start" | "realtime" | "heartbeat"
});

// Connection lost
ableton.on("disconnect", (type) => {
  console.log("Disconnected:", type); // "realtime" | "heartbeat"
});

// Raw message received
ableton.on("message", (message) => {
  console.log("Message:", message);
});

// Parse error
ableton.on("error", (error) => {
  console.error("Error:", error);
});

// Latency measurement
ableton.on("ping", (ms) => {
  console.log(`Ping: ${ms}ms`);
});
```

### Utility Classes

```typescript
import { Color } from "ableton-js/util/color";

// Color manipulation
const trackColor = await track.get("color");
console.log(trackColor.hex); // "#FF5500"
console.log(trackColor.r, trackColor.g, trackColor.b); // RGB values

// Set color by number
await track.set("color", 0xFF5500);
```

---

## Examples

### Sync Tempo with External Source

```typescript
import { Ableton } from "ableton-js";

const ableton = new Ableton({ logger: console });

async function syncTempo(externalBpm: number) {
  await ableton.start();

  const currentTempo = await ableton.song.get("tempo");
  if (Math.abs(currentTempo - externalBpm) > 0.1) {
    await ableton.song.set("tempo", externalBpm);
    console.log(`Synced tempo to ${externalBpm} BPM`);
  }
}
```

### Record Automation

```typescript
import { Ableton } from "ableton-js";

const ableton = new Ableton();

async function recordParameterAutomation() {
  await ableton.start();

  const tracks = await ableton.song.get("tracks");
  const track = tracks[0];
  const devices = await track.get("devices");
  const device = devices[0];
  const parameters = await device.get("parameters");
  const cutoff = parameters.find(async (p) => (await p.get("name")) === "Cutoff");

  if (!cutoff) return;

  // Start recording
  await ableton.song.set("overdub", true);
  await ableton.song.startPlaying();

  // Sweep parameter over time
  const min = await cutoff.get("min");
  const max = await cutoff.get("max");

  for (let i = 0; i <= 100; i++) {
    const value = min + ((max - min) * i) / 100;
    await cutoff.set("value", value);
    await new Promise((r) => setTimeout(r, 50));
  }

  await ableton.song.stopPlaying();
}
```

### Scene Launcher

```typescript
import { Ableton } from "ableton-js";

const ableton = new Ableton();

async function launchSceneByName(sceneName: string) {
  await ableton.start();

  const scenes = await ableton.song.get("scenes");
  const targetScene = scenes.find(async (scene) => {
    return (await scene.get("name")) === sceneName;
  });

  if (targetScene) {
    await targetScene.fire();
    console.log(`Launched scene: ${sceneName}`);
  } else {
    console.log(`Scene not found: ${sceneName}`);
  }
}

launchSceneByName("Chorus");
```

### Monitor All Track Meters

```typescript
import { Ableton } from "ableton-js";

const ableton = new Ableton();

async function monitorMeters() {
  await ableton.start();

  const tracks = await ableton.song.get("tracks");

  for (const track of tracks) {
    const trackName = await track.get("name");

    await track.addListener("output_meter_left", (level) => {
      console.log(`${trackName} L: ${level.toFixed(2)}`);
    });

    await track.addListener("output_meter_right", (level) => {
      console.log(`${trackName} R: ${level.toFixed(2)}`);
    });
  }
}

monitorMeters();
```

---

## Architecture

### System Overview

```
┌─────────────────┐         UDP          ┌─────────────────────┐
│                 │    ───────────────►  │                     │
│   Node.js App   │                      │   Ableton Live      │
│   (ableton-js)  │    ◄───────────────  │   (MIDI Script)     │
│                 │                      │                     │
└─────────────────┘                      └─────────────────────┘
       │                                          │
       ├─ Ableton class (connection)              ├─ AbletonJS.py (entry)
       ├─ Song namespace                          ├─ Socket.py (UDP)
       ├─ Track namespace                         ├─ Interface.py (routing)
       ├─ Device namespace                        ├─ Song.py (domain)
       ├─ Clip namespace                          ├─ Track.py (domain)
       └─ ... other namespaces                    └─ ... other modules
```

### Key Components

1. **Ableton Class** (`src/index.ts`)
   - UDP socket management
   - Message queuing and routing
   - Heartbeat monitoring
   - Cache management
   - Event emission

2. **Namespace Base** (`src/ns/index.ts`)
   - Generic type-safe property access
   - Property transformation (raw → typed)
   - Selective caching per property
   - Event listener management

3. **Domain Namespaces** (`src/ns/*.ts`)
   - Song, Track, Clip, Device, etc.
   - Each exposes relevant Ableton API methods
   - Type definitions for all properties

4. **Utilities** (`src/util/`)
   - Color conversion
   - Note formatting
   - Logger interface
   - Cache types

---

## Protocol Details

Ableton.js communicates with the MIDI Remote Script over UDP using JSON messages.

### Port Discovery

Both client and server write their ports to files in the OS temp directory:
- Server (Ableton): `ableton-js-server.port`
- Client (Node.js): `ableton-js-client.port`

### Command Structure

```json
{
  "uuid": "a20f25a0-83e2-11e9-bbe1-bd3a580ef903",
  "ns": "song",
  "nsid": null,
  "name": "get_prop",
  "args": { "prop": "tempo" },
  "etag": "4e0794e44c7eb58bdbbbf7268e8237b4",
  "cache": true
}
```

### Response Structure

```json
{
  "uuid": "a20f25a0-83e2-11e9-bbe1-bd3a580ef903",
  "event": "result",
  "data": 120.0
}
```

### Compression and Chunking

Large messages are:
1. Compressed with gzip
2. Chunked into UDP-safe sizes
3. Each chunk prefixed with index byte (0x00-0xFE)
4. Final chunk has index 0xFF
5. Recipient reassembles and decompresses

### Cache Protocol

- Client sends ETag with request
- Server computes MD5 hash of response
- If ETags match: returns `{ "__cached": true }`
- Client uses locally cached data
- Reduces bandwidth for large responses (track lists, etc.)

---

## Troubleshooting

### Connection Issues

**Ableton.js can't find the server port**
- Ensure AbletonJS MIDI Remote Script is installed correctly
- Check Ableton preferences → Control Surfaces
- Verify the script appears in the list
- Check Ableton's Log.txt for Python errors:
  ```bash
  # macOS
  tail -f ~/Library/Preferences/Ableton/*/Log.txt | grep AbletonJS

  # Windows
  Get-Content -Wait "$env:USERPROFILE\AppData\Roaming\Ableton\*\Preferences\Log.txt"
  ```

**Timeout errors**
- Increase `commandTimeoutMs` in options
- Check if Ableton is frozen or loading a project
- Verify UDP ports aren't blocked by firewall

**Frequent disconnects**
- Adjust `heartbeatInterval` (increase for less sensitive monitoring)
- Loading a new project in Ableton triggers disconnect/reconnect

### Performance Issues

**Slow responses**
- Enable caching (it's on by default)
- Reduce listener frequency for high-update properties
- Use `output_meter_left`/`output_meter_right` instead of `output_meter_level`

**High memory usage**
- Adjust cache size in `cacheOptions.max`
- Remove unused event listeners
- Cache TTL defaults to 10 minutes

### Python Script Errors

Check Ableton's log file for Python stack traces. Common issues:

- **ImportError**: Missing Python module
- **AttributeError**: Ableton API version mismatch
- **TypeError**: Incorrect argument types

---

## Known Issues

- `output_meter_level` listener hangs every few 100ms - use `output_meter_left`/`output_meter_right` instead ([Issue #4](https://github.com/leolabs/ableton-js/issues/4))
- `playing_status` listener on clip slots never fires ([Issue #25](https://github.com/leolabs/ableton-js/issues/25))
- Some properties behave differently between Ableton Live versions
- Loading a new project disconnects and reconnects (expected behavior)

---

## Contributing

Contributions are welcome! Here's how to get started:

### Development Setup

```bash
# Clone the repository
git clone https://github.com/leolabs/ableton-js.git
cd ableton-js

# Install dependencies
yarn install

# Build TypeScript
yarn build

# Run tests (requires Ableton Live running)
yarn test

# Format code
yarn format
```

### Adding New Features

1. Add property/method to relevant namespace (`src/ns/*.ts`)
2. Add corresponding Python handler in MIDI script (`midi-script/*.py`)
3. Update TypeScript interfaces
4. Add tests
5. Update documentation

### Code Style

- Use Prettier for formatting (`yarn format`)
- Follow existing TypeScript patterns
- Add JSDoc comments for public methods
- Keep backwards compatibility

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `yarn format` and `yarn build`
5. Submit a pull request

---

## Sponsored Project

This library powers [AbleSet](https://ableset.app), a professional setlist manager for Ableton Live.

[![AbleSet](https://public-files.gumroad.com/variants/oplxt68bsgq1hu61t8bydfkgppr5/baaca0eb0e33dc4f9d45910b8c86623f0144cea0fe0c2093c546d17d535752eb)](https://ableset.app/?utm_campaign=ableton-js)

AbleSet allows you to:
- Manage and control setlists from any device
- Re-order songs and add notes
- Monitor the current state of your set
- Sync playback across multiple instances

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

## Acknowledgments

- [Ableton Live API Documentation](https://nsuspray.github.io/Live_API_Doc/11.0.0.xml)
- [Leo Bernard](https://github.com/leolabs) - Original author
- All contributors who have submitted issues and pull requests

---

**Made with love for the Ableton community**
