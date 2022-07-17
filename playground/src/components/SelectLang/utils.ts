import type { defaultLangUConfigMap } from './constants'

export const getAllLocales = () => {
  return Object.keys(import.meta.glob('../../*.ts')).map((key) =>
    key.replace('../../', '').replace('.ts', '')
  ) as (keyof typeof defaultLangUConfigMap)[]
}
