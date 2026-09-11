import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      formats: ["es"],
      fileName: () => "ableton.js",
    },
    outDir: resolve(import.meta.dirname, "midi-script/static"),
    emptyOutDir: false,
    sourcemap: true,
    target: "es2022",
  },
});
