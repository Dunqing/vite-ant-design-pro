import { readFileSync } from 'fs'
import path from 'path'
import { SourceMapGenerator } from 'source-map'
import type { Plugin } from 'vite'
import '../client'

export default function antdLayout(): Plugin {
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
      const filePath = path.join(baseDir, 'layout/Layout.tsx')
      if (id === virtualModuleIdExt) {
        return {
          code: readFileSync(filePath, 'utf-8'),
          map: new SourceMapGenerator({
            file: filePath,
          }).toString(),
        }
      }
    },
  }
}
