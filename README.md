# Ableton.js

[![Current Version](https://img.shields.io/npm/v/ableton-js.svg)](https://www.npmjs.com/package/ableton-js/)

Ableton.js lets you control your instance or instances of Ableton using Node.js.
It tries to cover as many functions as possible.

This package is still a work-in-progress. My goal is to expose all of
[Ableton's MIDI Remote Script](https://nsuspray.github.io/Live_API_Doc/11.0.0.xml)
functions to TypeScript. If you'd like to contribute, please feel free to do so.

## Sponsored Message

I've used Ableton.js to build a setlist manager called
[AbleSet](https://ableset.app). AbleSet allows you to easily manage and control
your Ableton setlists from any device, re-order songs and add notes to them, and
get an overview of the current state of your set.

[![AbleSet Header](https://public-files.gumroad.com/variants/oplxt68bsgq1hu61t8bydfkgppr5/baaca0eb0e33dc4f9d45910b8c86623f0144cea0fe0c2093c546d17d535752eb)](https://ableset.app/?utm_campaign=ableton-js)

## Prerequisites

To use this library, you'll need to install and activate the MIDI Remote Script
in Ableton.js. To do that, copy the `midi-script` folder of this repo to
Ableton's Remote Scripts folder and rename it to `AbletonJS`. The MIDI Remote
Scripts folder is usually located at
`~/Music/Ableton/User Library/Remote Scripts`

After starting Ableton Live, add the script to your list of control surfaces:

![Ableton Live Settings](https://i.imgur.com/a34zJca.png)

If you've forked this project on macOS, you can also use yarn to do that for
you. Running `yarn ableton:start` will copy the `midi-script` folder, open
Ableton and show a stream of log messages until you kill it.

## Using Ableton.js

This library exposes an `Ableton` class which lets you control the entire
application. You can instantiate it once and use TS to explore available
features.

Example:

```typescript
import { Ableton } from "ableton-js";

// Log all messages to the console
const ableton = new Ableton({ logger: console });

const test = async () => {
  // Establishes a connection with Live
  await ableton.start();

  // Observe the current playback state and tempo
  ableton.song.addListener("is_playing", (p) => console.log("Playing:", p));
  ableton.song.addListener("tempo", (t) => console.log("Tempo:", t));

  // Get the current tempo
  const tempo = await ableton.song.get("tempo");
  console.log("Current tempo:", tempo);

  // Set the tempo
  await ableton.song.set("tempo", 85);
};

test();
```

## Events

There are a few events you can use to get more under-the-hood insights:

```ts
// A connection to Ableton is established
ab.on("connect", (e) => console.log("Connect", e));

// Connection to Ableton was lost,
// also happens when you load a new project
ab.on("disconnect", (e) => console.log("Disconnect", e));

// A raw message was received from Ableton
ab.on("message", (m) => console.log("Message:", m));

// A received message could not be parsed
ab.on("error", (e) => console.error("Error:", e));

// Fires on every response with the current ping
ab.on("ping", (ping) => console.log("Ping:", ping, "ms"));
```

## Protocol

Ableton.js uses UDP to communicate with the MIDI Script. Each message is a JSON
object containing required data and a UUID so request and response can be
associated with each other.

### Used Ports

Both the client and the server bind to a random available port and store that
port in a local file so the other side knows which port to send messages to.

### Compression and Chunking

To allow sending large JSON payloads, requests to and responses from the MIDI
Script are compressed using gzip and chunked to fit into the maximum allowed
package size. The first byte of every message chunk contains the chunk index
(0x00-0xFF) followed by the gzipped chunk. The last chunk always has the index
0xFF. This indicates to the JS library that the previous received messages
should be stiched together, unzipped, and processed.

### Caching

Certain props are cached on the client to reduce the bandwidth over UDP. To do
this, the Ableton plugin generates an MD5 hash of the prop, called ETag, and
sends it to the client along with the data.

The client stores both the ETag and the data in an LRU cache and sends the
latest stored ETag to the plugin the next time the same prop is requested. If
the data still matches the ETag, the plugin responds with a placeholder object
and the client returns the cached data.

### Commands

A command payload consists of the following properties:

```js
{
  "uuid": "a20f25a0-83e2-11e9-bbe1-bd3a580ef903", // A unique command id
  "ns": "song", // The command namespace
  "nsid": null, // The namespace id, for example to address a specific track or device
  "name": "get_prop", // Command name
  "args": { "prop": "current_song_time" }, // Command arguments
  "etag": "4e0794e44c7eb58bdbbbf7268e8237b4", // MD5 hash of the data if it might be cached locally
  "cache": true // If this is true, the plugin will calculate an etag and return a placeholder if it matches the provided one
}
```

The MIDI Script answers with a JSON object looking like this:

```js
{
  "data": 0.0, // The command's return value, can be of any JSON-compatible type
  "event": "result", // This can be 'result' or 'error'
  "uuid": "a20f25a0-83e2-11e9-bbe1-bd3a580ef903" // The same UUID that was used to send the command
}
```

If you're getting a cached prop, the JSON object could look like this:

```js
{
  "data": { "data": 0.0, "etag": "4e0794e44c7eb58bdbbbf7268e8237b4" },
  "event": "result", // This can be 'result' or 'error'
  "uuid": "a20f25a0-83e2-11e9-bbe1-bd3a580ef903" // The same UUID that was used to send the command
}
```

Or, if the data hasn't changed, it looks like this:

```js
{
  "data": { "__cached": true },
  "event": "result", // This can be 'result' or 'error'
  "uuid": "a20f25a0-83e2-11e9-bbe1-bd3a580ef903" // The same UUID that was used to send the command
}
```

### Events

To attach an event listener to a specific property, the client sends a command
object:

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

Note that for some values, this event is emitted multiple times per second.
20-30 updates per second are not unusual.

### Connection Events

The MIDI Script sends events when it starts and when it shuts down. These look
like this:

```js
{
  "data": null, // Is always null
  "event": "connect", // Can be connect or disconnect
  "uuid": null // Is always null and may be removed in future versions
}
```

When you open a new Project in Ableton, the script will shut down and start
again.

When Ableton.js receives a disconnect event, it clears all current event
listeners and pending commands. It is usually a good idea to attach all event
listeners and get properties each time the `connect` event is emitted.

### Findings

In this section, I'll note interesting pieces of information related to
Ableton's Python framework that I stumble upon during the development of this
library.

- It seems like Ableton's listener to `output_meter_level` doesn't quite work as
  well as expected, hanging every few 100ms. Listening to `output_meter_left` or
  `output_meter_right` works better. See
  [Issue #4](https://github.com/leolabs/ableton-js/issues/4)
- The `playing_status` listener of clip slots never fires in Ableton. See
  [Issue #25](https://github.com/leolabs/ableton-js/issues/25)
