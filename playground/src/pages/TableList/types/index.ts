import type { RuleListItem } from './services'

export * from './services'
export type FormValueType = {
  target?: string
  template?: string
  type?: string
  time?: string
  frequency?: string
} & Partial<RuleListItem>
