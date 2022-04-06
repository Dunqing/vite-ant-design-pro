import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import antdLayout from 'vite-plugin-antd-layout'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  plugins: [react(), antdLayout()],
})
