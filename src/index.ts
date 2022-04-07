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
          include: [path.join(baseDir, 'utils/traverseRoutes.tsx'), virtualModuleId, virtualModuleIdExt],
          exclude: [],
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
      console.log(path.join(baseDir, 'utils/traverseRoutes.tsx'))

      root = config.root
    },
    resolveId(source, importer) {
      // console.log("🚀 ~ file: index.ts ~ line 38 ~ resolveId ~ source", source, importer)
      if (source === virtualModuleId)
        return virtualModuleIdExt

      // if (source.endsWith("@ant-design/pro-layout")) {
      //   return "@ant-design/pro-layout"
      // }

      if (importer === virtualModuleIdExt) {
        if (/\.\.?\//.test(source))
          return path.resolve(baseDir, 'layout', source)
      }
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

        return code.replace(/\$ROOT/g, path.relative(dirname(id), root))

      return code
    },
  }
}
