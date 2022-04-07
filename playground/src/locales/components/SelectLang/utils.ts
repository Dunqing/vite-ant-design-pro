import type { defaultLangUConfigMap } from './constants'

export const getAllLocales = () => {
  return Object.keys(import.meta.glob('../*.ts')) as (keyof typeof defaultLangUConfigMap)[]
}
