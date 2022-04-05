import type { Plugin } from 'vite'

interface AntdLayoutPluginOptions {
  name: string
  logo: string
}

export default function antdLayout(options: AntdLayoutPluginOptions): Plugin {
  const { name, logo } = options

  return {
    name: 'vite-plugin-antd-layout',
  }
}
