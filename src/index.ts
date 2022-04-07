import { readFileSync } from 'fs'
import path, { dirname } from 'path'
import { SourceMapGenerator } from 'source-map'
import type { Plugin } from 'vite'

export default function antdLayout(): Plugin {
  const virtualModuleId = '@virtual-antd-layout'
  const virtualModuleIdExt = `${virtualModuleId}.tsx`

  const baseDir = __dirname
  let root: string

  return {
    name: 'vite-plugin-antd-layout',
    enforce: 'pre',
    config: () => ({
      build: {
        dynamicImportVarsOptions: {
          // include: [path.join(baseDir, 'utils/traverseRoutes.tsx'), virtualModuleId, virtualModuleIdExt],
          // exclude: [],
        },
      },
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

      if (importer === virtualModuleIdExt) {
        if (/\.\.?\//.test(source))
          return path.resolve(baseDir, 'layout', source)
      }
    },
    load(id) {
      if (id === virtualModuleIdExt) {
        const filePath = path.join(baseDir, 'layout/Layout.tsx')
        return {
          code: readFileSync(filePath, 'utf-8'),
          map: new SourceMapGenerator({
            file: filePath,
          }).toString(),
        }
      }
      const filePath = path.join(baseDir, 'utils/traverseRoutes.tsx')
      if (id.includes(filePath)) {
        return {
          code: readFileSync(filePath).toString().replace(/\$ROOT/g, path.relative(dirname(id), root)),
          map: new SourceMapGenerator({ file: filePath }).toString(),
        }
      }
    },
  }
}
