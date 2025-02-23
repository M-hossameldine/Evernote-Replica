import react from '@vitejs/plugin-react';
import path from 'path';
import type { UserConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
const configuration: UserConfig = {
  build: {
    outDir: 'build',
  },
  server: {
    open: true, //  open app on server start
    port: 4600,
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  optimizeDeps: {
    include: ['matchmedia-polyfill'], // Ensure this package is included in optimization
  },
  root: '.',
  resolve: {
    alias: {
      // '~': '/src',
      '~components': path.resolve(__dirname, './src/components'),
      '~assets/*': path.resolve(__dirname, './assets/*'),
      '~components/*': path.resolve(__dirname, './components/*'),
      '~constants/*': path.resolve(__dirname, './constants/*'),
      '~helpers/*': path.resolve(__dirname, './helpers/*'),
      '~hooks/*': path.resolve(__dirname, './hooks/*'),
      '~models/*': path.resolve(__dirname, './models/*'),
      '~modules/*': path.resolve(__dirname, './modules/*'),
      '~libs/*': path.resolve(__dirname, './libs/*'),
      '~store/*': path.resolve(__dirname, './store/*'),
      '~pages/*': path.resolve(__dirname, './pages/*'),
      '~sections/*': path.resolve(__dirname, './sections/*'),
    },
  },
};

export default configuration;
