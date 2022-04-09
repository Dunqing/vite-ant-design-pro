import path, { dirname } from 'path'
import type { Plugin, ResolvedConfig } from 'vite'
import { normalizePath } from 'vite'
import MagicString from 'magic-string'

const name = 'ant-design-pro-layout'

export default function antdLayout(): Plugin {
  const virtualModuleId = 'virtual:antd-layout'

  let antDesignProLayoutId: string | undefined

  let config: ResolvedConfig

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
    configResolved(_config) {
      config = _config
    },
    resolveId(source) {
      if (source === virtualModuleId)
        return virtualModuleId
    },
    async load(id) {
      if (id === virtualModuleId) {
        antDesignProLayoutId = (await this.resolve(name))?.id
        const code = `export { default } from "${name}"`
        return { code, map: new MagicString(code).generateMap() }
      }
    },
    transform(code, id) {
      if (antDesignProLayoutId === id) {
        const ms = new MagicString(code)

        ms.replace(/\$ROOT/g, normalizePath(path.join(path.relative(dirname(id), config.root), 'src/pages')))

        return {
          code: ms.toString(),
          map: ms.generateMap(),
        }
      }
    },
  }
}