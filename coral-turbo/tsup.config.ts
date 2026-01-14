import { defineConfig } from 'tsup';

export default defineConfig([
  // Main entry point (auto-detects WASM vs native)
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    outDir: 'dist',
    sourcemap: true,
    splitting: false,
    treeshake: true,
  },
  // WASM-specific entry
  {
    entry: ['src/wasm/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    outDir: 'dist/wasm',
    sourcemap: true,
  },
  // Native-specific entry
  {
    entry: ['src/native/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    outDir: 'dist/native',
    sourcemap: true,
    external: ['*.node'],
  },
]);
