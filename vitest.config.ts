import path from 'node:path';
import { defineConfig } from 'vitest/config';

import configuration from './vite.config';

export default defineConfig({
  ...configuration,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: path.resolve(__dirname, 'test/setupTests.ts'),
    environmentMatchGlobs: [
      ['**/*.test.tsx', 'jsdom'],
      ['**/*.component.test.ts', 'jsdom'],
    ],
    coverage: {
      statements: 54.92,
      thresholdAutoUpdate: true,
      include: ['src/**/*'],
      exclude: [
        'test/**',
        'vite.*.ts',
        '**/*.d.ts',
        '**/*.test.*',
        '**/*.config.*',
        '**/snapshot-tests/**',
        '**/*.solution.tsx',
        '**/coverage/**',
      ],
      all: true,
    },
  },
});
