declare namespace API {

  interface PageParams {
    current?: number
    pageSize?: number
  }

  interface RuleListItem {
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

  interface RuleList {
    data?: RuleListItem[]
    /** 列表的内容总数 */
    total?: number
    success?: boolean
  }

  interface FakeCaptcha {
    code?: number
    status?: string
  }

  interface ErrorResponse {
    /** 业务约定的错误码 */
    errorCode: string
    /** 业务上的错误信息 */
    errorMessage?: string
    /** 业务上的请求是否成功 */
    success?: boolean
  }

  interface NoticeIconList {
    data?: NoticeIconItem[]
    /** 列表的内容总数 */
    total?: number
    success?: boolean
  }

  type NoticeIconItemType = 'notification' | 'message' | 'event'

  interface NoticeIconItem {
    id?: string
    extra?: string
    key?: string
    read?: boolean
    avatar?: string
    title?: string
    status?: string
    datetime?: string
    description?: string
    type?: NoticeIconItemType
  }
}
