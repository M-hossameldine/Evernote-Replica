// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import "@testing-library/jest-dom";
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

// Browser-only polyfill; skipped for tests that run in the node environment.
if (typeof window !== 'undefined') {
  await import('matchmedia-polyfill');
}

// so you don’t need to manually import @testing-library/jest-dom anymore in our test files.
if (matchers) {
  expect.extend(matchers);
}
