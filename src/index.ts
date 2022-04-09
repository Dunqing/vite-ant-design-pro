import path, { dirname } from 'path'
import type { Plugin } from 'vite'
import { normalizePath } from 'vite'
import MagicString from 'magic-string'

export default function antdLayout(): Plugin & { name: string } {
  const virtualModuleId = 'virtual:antd-layout'

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
    resolveId(source) {
      if (source === virtualModuleId)
        return virtualModuleId
    },
    load(id) {
      if (id === virtualModuleId) {
        const filePath = normalizePath(path.join(baseDir, 'layout'))
        const code = `export { default } from '${filePath}'`
        return { code, map: new MagicString(code).generateMap() }
      }
    },
    transform(code, id) {
      const filePath = normalizePath(path.join(baseDir, 'layout/utils/traverseRoutes'))
      if (id.includes(filePath)) {
        const ms = new MagicString(code)
        ms.replace(/\$ROOT/g, normalizePath(path.join(path.relative(dirname(id), root), 'src/pages')))
        return {
          code: ms.toString(),
          map: ms.generateMap(),
        }
      }
      return code
    },
  }
}
