import { readFileSync } from 'fs'
import path from 'path'
import type { Plugin } from 'vite'
import type { Routes } from './types/routes'

interface AntdLayoutPluginOptions {
}

export default function antdLayout(options?: AntdLayoutPluginOptions): Plugin {
  const virtualModuleId = '@virtual-antd-layout'
  const virtualModuleIdExt = `${virtualModuleId}.tsx`

  const baseDir = __dirname

  return {
    name: 'vite-plugin-antd-layout',
    config: () => ({
      resolve: {
        alias: [
          {
            find: /^~/,
            replacement: '',
          },
        ],
        dedupe: ['antd', '@ant-design/pro-layout'],
      },
      css: {
        preprocessorOptions: {
          less: {
            javascriptEnabled: true,
          },
        },
      },
    }),
    resolveId(source, importer) {
      if (source === virtualModuleId)
        return virtualModuleIdExt

      if (importer === virtualModuleIdExt)
        return path.resolve(baseDir, 'layout', source)
    },
    load(id) {
      if (id === virtualModuleIdExt)
        return readFileSync(path.join(baseDir, 'layout/BasicLayout.tsx'), 'utf-8')
    },
  }
}
