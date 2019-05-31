# Ableton.js

[![Current Version](https://img.shields.io/npm/v/ableton-js.svg)](https://www.npmjs.com/package/ableton-js/)

Ableton.js lets you control your instance or instances of Ableton using Node.js. It
tries to cover as many functions as possible.

This package is still a work-in-progress. My goal is to expose all of [Ableton's MIDI
Remote Script](https://julienbayle.studio/PythonLiveAPI_documentation/Live10.0.2.xml) functions to TypeScript. If you'd like to contribute, please feel free to do so.

## Prerequisites

To use this library, you'll need to install and activate the MIDI Remote Script in
Ableton.js. To do that, copy the `midi-script` folder of this repo to Ableton's
Remote Scripts folder. If you prefer, you can rename it to something like `AbletonJS`
for better identification. The MIDI Remote Scripts folder is usually located at:

- **Windows:** {path to Ableton}\Resources\MIDI\Remote Scripts
- **macOS:** /Applications/Ableton Live {version}/Contents/App-Resources/MIDI Remote Scripts

After starting Ableton Live, add the script to your list of control surfaces:

![Ableton Live Settings](https://i.imgur.com/a34zJca.png)

If you've forked this project on macOS, you can also use yarn to do that for you.
Running `yarn ableton:start` will copy the `midi-script` folder, open Ableton and
show a stream of log messages until you kill it.

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

## Protocol

Ableton.js uses UDP to communicate with the MIDI Script. Each message is a JSON
object containing required data and a UUID so request and response can be associated
with each other.

### Commands

A command payload consists of the following properties:

```js
{
  "uuid": "a20f25a0-83e2-11e9-bbe1-bd3a580ef903", // A unique command id
  "ns": "song", // The command namespace
  "nsid": null, // The namespace id, for example to address a specific track or device
  "name": "get_prop", // Command name
  "args": { "prop": "current_song_time" } // Command arguments
}
```

The MIDI Script answers with a JSON object looking like this:

```js
{
  "data": 0.0, // The command's return value, can be of any JSON-compatible type
  "event": "result", // This can be 'result' or 'error'
  "uuid": "a20f25a0-83e2-11e9-bbe1-bd3a580ef903"
}
```

### Events

To attach an event listener to a specific property, the client sends a command object:

```js
{
  "uuid": "922d54d0-83e3-11e9-ba7c-917478f8b91b", // A unique command id
  "ns": "song", // The command namespace
  "name": "add_listener", // The command to add an event listener
  "args": {
    "prop": "current_song_time", // The property that should be watched
    "eventId": "922d2dc0-83e3-11e9-ba7c-917478f8b91b" // A unique event id
  }
}
```

The MIDI Script answers with a JSON object looking like this to confirm that the
listener has been attached:

```js
{
  "data": "922d2dc0-83e3-11e9-ba7c-917478f8b91b", // The unique event id
  "event": "result", // Should be result, is error when something goes wrong
  "uuid": "922d54d0-83e3-11e9-ba7c-917478f8b91b" // The unique command id
}
```

From now on, when the observed property changes, the MIDI Script sends an event
object:

```js
{
  "data": 68.0, // The new value, can be any JSON-compatible type
  "event": "922d2dc0-83e3-11e9-ba7c-917478f8b91b", // The event id
  "uuid": null // Is always null and may be removed in future versions
}
```

Note that for some values, this event is emitted multiple times per second. 20-30
updates per second are not unusual.

### Connection Events

The MIDI Script sends events when it starts and when it shuts down.
These look like this:

```js
{
  "data": null, // Is always null
  "event": "connect", // Can be connect or disconnect
  "uuid": null // Is always null and may be removed in future versions
}
```

When you open a new Project in Ableton, the script will shut down and start again.

When Ableton.js receives a disconnect event, it clears all current event listeners
and pending commands. It is usually a good idea to attach all event listeners and
get properties each time the `connect` event is emitted.
