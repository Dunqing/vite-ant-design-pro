import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.tsx',
      formats: ['es', 'cjs'],
      name: 'AntdLayout',
      fileName: format => `index.${format === 'cjs' ? 'js' : 'mjs'}`,
    },
    rollupOptions: {
      external: ['@ant-design/pro-layout', '@ant-design/icons', 'antd', 'react', 'react-dom', 'react-router-dom'],
    },
  },
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: '',
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@root-entry-name: default;',
      },
    },
  },
  plugins: [react(), dts()],
})
