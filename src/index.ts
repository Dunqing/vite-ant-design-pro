import { readFileSync } from 'fs'
import path from 'path'
import { SourceMapGenerator } from 'source-map'
import type { Plugin } from 'vite'

export default function antdLayout(): Plugin {
  const virtualModuleId = '@virtual-antd-layout'
  const virtualModuleIdExt = `${virtualModuleId}.tsx`

  const baseDir = __dirname
  let root: string

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
    configResolved(config) {
      root = config.root
    },
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
    transform(code, id) {
      if (id.endsWith(('vite-plugin-antd-layout/src/utils/traverseRoutes.tsx')))
        return code.replace('$ROOT', root)

      return code
    },
  }
}
