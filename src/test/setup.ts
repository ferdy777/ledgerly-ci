import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Unmount rendered components and reset persisted state between tests.
afterEach(() => {
  cleanup();
  window.localStorage.clear();
});
