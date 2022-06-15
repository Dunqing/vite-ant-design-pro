import { normalizePath } from 'vite'
import MagicString from 'magic-string'
import dynamicImportModule from 'vite-plugin-dynamic-import-module'
import path, { dirname } from 'path'
import type { Plugin, ResolvedConfig } from 'vite'

const name = 'ant-design-pro-layout'

export default function antdLayout(): Plugin[] {
  const virtualModuleId = 'virtual:antd-layout'

  let modulePath: string | undefined

  let config: ResolvedConfig

  return [
    {
      name: 'vite-plugin-antd-layout',
      enforce: 'pre',
      configResolved(_config) {
        config = _config
      },
      resolveId(source) {
        if (source === virtualModuleId) return virtualModuleId
      },
      async load(id) {
        if (id === virtualModuleId) {
          modulePath = (await this.resolve(name))?.id
          modulePath = modulePath ?? require.resolve(name)
          const code = `export { default } from ${JSON.stringify(modulePath)};`
          return { code, map: new MagicString(code).generateMap() }
        }
      },
      transform(code, id) {
        if (modulePath && id.includes(dirname(modulePath))) {
          const ms = new MagicString(code)
          ms.replace(
            /\$ROOT/g,
            normalizePath(
              path.join(path.relative(dirname(id), config.root), 'src/pages')
            )
          )
          return {
            code: ms.toString(),
            map: ms.generateMap(),
          }
        }
        return null
      },
    },
    (dynamicImportModule as any)(),
  ]
}
