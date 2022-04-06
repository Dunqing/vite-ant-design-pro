import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import antdLayout from 'vite-plugin-antd-layout'

export default defineConfig({
  plugins: [react(), antdLayout()],
})
