import { defineConfig } from "vite";

export default defineConfig({
  build: {
    ssr: true,
    target: "node20",
    outDir: "dist",
    rollupOptions: {
      input: "src/index.ts",
    },
    emptyOutDir: true,
  },
});
