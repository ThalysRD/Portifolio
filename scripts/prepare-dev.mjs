import { build } from "vite";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
await build({
  configFile: false,
  publicDir: false,
  root,
  logLevel: "warn",
  build: {
    outDir: ".dev",
    emptyOutDir: true,
    lib: {
      entry: root + "src/core/pixi.ts",
      formats: ["es"],
      fileName: () => "pixi.mjs",
    },
    rollupOptions: { output: { inlineDynamicImports: true } },
    minify: "esbuild",
  },
});
