import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import antdLayout from 'vite-plugin-antd-layout'
import momentToDayjs from 'unplugin-moment-to-dayjs/vite'
import * as path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@root-entry-name: default;',
      },
    },
  },
  server: {
    https: true,
    proxy: {
      // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
      '/api/': {
        // 要代理的地址
        target: 'https://proapi.azurewebsites.net/',
        // 配置了这个可以从 http 代理到 https
        // 依赖 origin 的功能可能需要这个，比如 cookie
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), antdLayout(), momentToDayjs()],
})
