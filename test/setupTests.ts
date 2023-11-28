// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import "@testing-library/jest-dom";

import "matchmedia-polyfill";

import { expect } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";

// so you don’t need to manually import @testing-library/jest-dom anymore in our test files.
expect.extend(matchers);
