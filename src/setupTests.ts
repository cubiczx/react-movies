// jest-dom adds custom jest matchers for asserting on DOM nodes.
import "@testing-library/jest-dom";

// Polyfills necesarios para React Router v7 en Jest 27
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// Mock necesario para Ant Design Grid (Row/Col) en jsdom
// Ant Design llama a listener(mql) donde mql debe tener { matches }
(global as any).matchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
});
window.matchMedia = (global as any).matchMedia;

// Mock ResizeObserver (usado por Ant Design Menu y otros componentes)
(global as any).ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
(global as any).IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
