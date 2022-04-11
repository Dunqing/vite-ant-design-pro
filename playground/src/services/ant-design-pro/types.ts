export interface FakeCaptcha {
  code?: number
  status?: string
}

export interface CurrentUser {
  name?: string
  avatar?: string
  userid?: string
  email?: string
  signature?: string
  title?: string
  group?: string
  tags?: { key?: string; label?: string }[]
  notifyCount?: number
  unreadCount?: number
  country?: string
  access?: string
  geographic?: {
    province?: { label?: string; key?: string }
    city?: { label?: string; key?: string }
  }
  address?: string
  phone?: string
}

export interface LoginParams {
  username?: string
  password?: string
  autoLogin?: boolean
  type?: string
}
export interface LoginResult {
  status?: string
  type?: string
  currentAuthority?: string
}
