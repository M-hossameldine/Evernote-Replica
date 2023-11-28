import type { UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
const configuration: UserConfig = {
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
};

export default configuration;
