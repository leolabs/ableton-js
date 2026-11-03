import { Ableton } from "../src";

const messages: number[] = [];
// End-to-end delay per pushed event: receive time minus the `ts` the Remote
// Script stamps on each frame. Live and this script share a clock.
const latencies: number[] = [];

const test = async () => {
  const ableton = new Ableton({ logger: console });
  console.log("Waiting for Live to start...");
  ableton.on("connect", (...args) => console.log("Live connected", ...args));
  ableton.on("disconnect", (...args) =>
    console.log("Live disconnected", ...args),
  );
  ableton.on("message", (data) => {
    if (data.event !== "result" && typeof data.ts === "number") {
      latencies.push(Date.now() - data.ts);
    }
  });
  await ableton.start();
  console.log("Connection to Live established");

  const tracks = await ableton.song.get("tracks");
  console.log("Got tracks");

  for (const track of tracks) {
    if (track.raw.type !== "midi") {
      track.addListener("output_meter_left", () => {
        messages.push(performance.now());
      });
      track.addListener("output_meter_right", () => {
        messages.push(performance.now());
      });
    }
  }
};

const percentile = (sorted: number[], p: number) =>
  sorted[Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))];

process.on("SIGINT", () => {
  if (messages.length < 2) {
    console.log(
      `\nOnly captured ${messages.length} message(s), nothing to summarize.`,
    );
    process.exit(0);
  }

  const deltas: number[] = [];
  for (let i = 1; i < messages.length; i++) {
    deltas.push(messages[i] - messages[i - 1]);
  }
  deltas.sort((a, b) => a - b);

  const sum = deltas.reduce((a, b) => a + b, 0);
  const avg = sum / deltas.length;
  const totalDuration = messages[messages.length - 1] - messages[0];

  console.log("\n--- Message timing summary ---");
  console.log("Messages received:", messages.length);
  console.log("Total duration:", totalDuration.toFixed(2), "ms");
  console.log(
    "Throughput:",
    (messages.length / (totalDuration / 1000)).toFixed(1),
    "msg/s",
  );
  console.log("Delta between consecutive messages (ms):");
  console.log("  min:", deltas[0].toFixed(2));
  console.log("  avg:", avg.toFixed(2));
  console.log("  p50:", percentile(deltas, 50).toFixed(2));
  console.log("  p95:", percentile(deltas, 95).toFixed(2));
  console.log("  p99:", percentile(deltas, 99).toFixed(2));
  console.log("  max:", deltas[deltas.length - 1].toFixed(2));

  if (latencies.length > 0) {
    latencies.sort((a, b) => a - b);
    const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
    console.log("End-to-end latency, Live -> client (ms):");
    console.log("  min:", latencies[0]);
    console.log("  avg:", avgLatency.toFixed(2));
    console.log("  p50:", percentile(latencies, 50));
    console.log("  p95:", percentile(latencies, 95));
    console.log("  p99:", percentile(latencies, 99));
    console.log("  max:", latencies[latencies.length - 1]);
    console.log(
      "  over 500ms:",
      latencies.filter((l) => l > 500).length,
      "of",
      latencies.length,
    );
  }

  process.exit(0);
});

test();
