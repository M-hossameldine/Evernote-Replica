import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import type { InlineConfig } from "vitest";
import type { UserConfig } from "vite";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },
  server: {
    open: true, //  open app on server start
    port: 4500,
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  optimizeDeps: {
    include: ["matchmedia-polyfill"], // Ensure this package is included in optimization
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFile: ["src/setupTests.ts"],
  },
} as VitestConfigExport);
