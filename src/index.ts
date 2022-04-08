import path, { dirname } from 'path'
import type { Plugin } from 'vite'
import MagicString from 'magic-string'

export default function antdLayout(): Plugin {
  const virtualModuleId = 'virtual:antd-layout'
  const virtualModuleIdExt = '@virtual-antd-layout.tsx'

  const baseDir = __dirname

  let root: string

  return {
    name: 'vite-plugin-antd-layout',
    enforce: 'pre',
    config: () => ({
      build: {
        dynamicImportVarsOptions: {
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
      root = config.root
    },
    resolveId(source, importer) {
      if (source === virtualModuleId) {
        return {
          external: false,
          id: virtualModuleIdExt,
        }
      }

      if (importer === virtualModuleIdExt) {
        if (/\.\.?\//.test(source)) {
          return {
            external: 'absolute',
            id: path.resolve(baseDir, 'layout', source),
          }
        }
      }
    },
    load(id) {
      if (id === virtualModuleIdExt) {
        const filePath = path.join(baseDir, 'layout/Layout')
        const code = `export { default } from '${filePath}'`
        return { code, map: new MagicString(code).generateMap() }
      }
    },
    transform(code, id) {
      const filePath = path.join(baseDir, 'utils/traverseRoutes')
      if (id.includes(filePath)) {
        const ms = new MagicString(code)
        ms.replace(/\$ROOT/g, path.join(path.relative(dirname(id), root), 'src/pages'))
        return {
          code: ms.toString(),
          map: ms.generateMap(),
        }
      }
      return code
    },
  }
}
