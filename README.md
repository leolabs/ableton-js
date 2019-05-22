# Ableton.js

Ableton.js lets you control your instance or instances of Ableton using Node.js. It
tries to cover as many functions as possible.

## Prerequisites

To use this library, you'll need to install and activate the MIDI Remote Script in
Ableton.js. To do that, copy the `midi-script` folder of this repo to Ableton's
Remote Scripts folder. If you prefer, you can rename it to something like `AbletonJS`
for better identification. The MIDI Remote Scripts folder is usually located at:

- **Windows:** {path to Ableton}\Resources\MIDI\Remote Scripts
- **macOS:** /Applications/Ableton Live {version}/Contents/App-Resources/MIDI Remote Scripts

After starting Ableton Live, add the script to your list of control surfaces:

![Ableton Live Settings](https://i.imgur.com/a34zJca.png)

## Using Ableton.js

This library exposes an `Ableton` class which lets you control the entire
application. You can instanciate it once and use TS to explore available features.

Example:

```typescript
import { Ableton } from "ableton-js";

const ableton = new Ableton();

const test = async () => {
  ableton.song.addListener("is_playing", p => console.log("Playing:", p));
  ableton.song.addListener("tempo", t => console.log("Tempo:", t));

  const cues = await ableton.get("cue_points");
  console.log(cues.map(c => c.raw));
};

test();
```
