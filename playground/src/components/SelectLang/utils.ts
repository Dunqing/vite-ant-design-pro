import type { defaultLangUConfigMap } from './constants'

export const getAllLocales = () => {
  return Object.keys(import.meta.glob('../../locales/*.ts')).map((key) =>
    key.replace('../../locales/', '').replace('.ts', '')
  ) as (keyof typeof defaultLangUConfigMap)[]
}
