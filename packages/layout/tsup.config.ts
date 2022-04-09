import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.tsx'],
  clean: true,
  dts: true,
  sourcemap: true,
  format: ['esm', 'cjs'],
})
