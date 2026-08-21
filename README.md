# Ableton.js

[![Current Version](https://img.shields.io/npm/v/ableton-js.svg)](https://www.npmjs.com/package/ableton-js/)

Ableton.js lets you control your instance or instances of Ableton using Node.js,
Deno, or a browser. It tries to cover as many functions as possible.

This package is still a work-in-progress. My goal is to expose all of
[Ableton's MIDI Remote Script](https://nsuspray.github.io/Live_API_Doc/11.0.0.xml)
functions to TypeScript. If you'd like to contribute, please feel free to do so.

## Sponsored Message

I've used Ableton.js to build a setlist manager called
[AbleSet](https://ableset.app). AbleSet allows you to easily manage and control
your Ableton setlists from any device, re-order songs and add notes to them, and
get an overview of the current state of your set.

[![AbleSet Header](https://ableset.com/images/ableton-js-banner.png)](https://ableset.com/?utm_campaign=ableton-js)

## Prerequisites

To use this library, you'll need to install and activate the MIDI Remote Script
in Ableton.js. To do that, copy the `midi-script` folder of this repo to
Ableton's Remote Scripts folder and rename it to `AbletonJS`. The MIDI Remote
Scripts folder is usually located at
`~/Music/Ableton/User Library/Remote Scripts`

After starting Ableton Live, add the script to your list of control surfaces:

![Ableton Live Settings](https://i.imgur.com/a34zJca.png)

The Remote Script opens a WebSocket server on `127.0.0.1:39031` by default. You
can change the bind address and port in `midi-script/Config.py`
(`WEBSOCKET_HOST` / `WEBSOCKET_PORT`). The JS client must use the same host and
port (`new Ableton({ host, port })`).

To require a password, set `PASSWORD` in `Config.py` to a string and pass the
same value to `new Ableton({ password })`. Auth is off when `PASSWORD` is `None`
or empty. When enabled, the plugin sends a per-connection salt and the client
authenticates with HMAC-SHA256 so the password itself is not sent in plaintext.
The WebSocket is still unencrypted (`ws://`) after login, so I'd prefer binding
to loopback if possible.

If you've forked this project on macOS, you can also use yarn to do that for
you. Running `yarn ableton10:start` or `yarn ableton11:start` (depending on your
app version) will copy the `midi-script` folder, open Ableton and show a stream
of log messages until you kill it.

## Using Ableton.js

This library exposes an `Ableton` class which lets you control the entire
application. You can instantiate it once and use TS to explore available
features.

It uses the standard `WebSocket` API (Node 21+, Deno, and browsers). Load it
with a bundler in the browser. Pages served over **HTTPS cannot** connect to
`ws://127.0.0.1` (mixed content); use `http://localhost` for local UIs.

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

  // Commands started in the same tick are sent together
  const tracks = await ableton.song.get("tracks");
  await Promise.all(
    tracks.map((t) => t.addListener("name", (n) => console.log(t.raw.id, n))),
  );
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

Ableton.js uses a WebSocket (`ws://127.0.0.1:39031` by default) to talk to the
MIDI Remote Script. Each message is a JSON text frame containing required data
and a UUID so request and response can be associated with each other.

The Remote Script is the server and supports connections from multiple clients.
Command replies (`result` / `error`) and property listener updates are sent only
to the client that issued the command or subscribed. Removing a listener, or
disconnecting, drops that client's subscriptions only. Live still uses a single
listener per property until the last subscriber leaves.

### Caching

Certain props are cached on the client to reduce repeated payloads. To do this,
the Ableton plugin generates an MD5 hash of the prop, called ETag, and sends it
to the client along with the data.

The client stores both the ETag and the data in an LRU cache and sends the
latest stored ETag to the plugin the next time the same prop is requested. If
the data still matches the ETag, the plugin responds with a placeholder object
and the client returns the cached data.

### Commands

Every request is an envelope with one or more commands. Commands started in the
same JavaScript tick (for example via `Promise.all`) are automatically combined
into a single WebSocket round-trip.

```js
{
  "uuid": "1", // Envelope id
  "commands": [
    {
      "ns": "song", // The command namespace
      "nsid": null, // The namespace id, for example to address a specific track or device
      "name": "get_prop", // Command name
      "args": { "prop": "current_song_time" }, // Command arguments
      "etag": "4e0794e44c7eb58bdbbbf7268e8237b4", // MD5 hash of the data if it might be cached locally
      "cache": true // If this is true, the plugin will calculate an etag and return a placeholder if it matches the provided one
    }
  ]
}
```

The MIDI Script answers with a JSON object looking like this. `data` is always
an array with one result per command:

```js
{
  "data": [{ "ok": true, "data": 0.0 }], // Per-command results
  "event": "result", // This can be 'result' or 'error'
  "uuid": "1" // The same UUID that was used to send the envelope
}
```

A failed command looks like `{ "ok": false, "error": "..." }` in its slot. Other
commands in the same envelope still run. A top-level `event: "error"` means the
whole envelope failed (for example auth or a malformed payload).

If you're getting a cached prop, the per-command `data` could look like this:

```js
{
  "data": [
    {
      "ok": true,
      "data": { "data": 0.0, "etag": "4e0794e44c7eb58bdbbbf7268e8237b4" }
    }
  ],
  "event": "result",
  "uuid": "1"
}
```

Or, if the data hasn't changed, the per-command `data` looks like this:

```js
{
  "data": [{ "ok": true, "data": { "__cached": true } }],
  "event": "result",
  "uuid": "1"
}
```

### Events

To attach an event listener to a specific property, the client sends a command:

```js
{
  "uuid": "1", // Envelope id
  "commands": [
    {
      "ns": "song",
      "name": "add_listener",
      "args": {
        "prop": "current_song_time",
        "eventId": "2"
      }
    }
  ]
}
```

The MIDI Script answers with a JSON object looking like this to confirm that the
listener has been attached:

```js
{
  "data": [{ "ok": true, "data": "2" }],
  "event": "result",
  "uuid": "1"
}
```

From now on, when the observed property changes, the MIDI Script sends an event
object (not wrapped in a commands envelope):

```js
{
  "data": 68.0, // The new value, can be any JSON-compatible type
  "event": "2", // The event id
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
  "data": { "port": 39031 },
  "event": "connect", // Can be connect or disconnect
  "uuid": null
}
```

`disconnect` still sends `"data": null`.

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

## Contributing

If you'd like to add features to this project or submit a bugfix, please feel
free to open a pull request. Before committing changes to any of the TypeScript
files, please run `yarn format` to format the code using Prettier.
