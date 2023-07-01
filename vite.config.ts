import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },
  server: {
    open: true, // Automatically open the app on server start
    port: 4500,
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
});
