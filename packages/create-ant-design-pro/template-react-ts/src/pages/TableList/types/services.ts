export interface PageParams {
  current?: number
  pageSize?: number
}
export interface RuleListItem {
  key?: number
  disabled?: boolean
  href?: string
  avatar?: string
  name?: string
  owner?: string
  desc?: string
  callNo?: number
  status?: number
  updatedAt?: string
  createdAt?: string
  progress?: number
}

export interface RuleList {
  data?: RuleListItem[]
  /** 列表的内容总数 */
  total?: number
  success?: boolean
}
