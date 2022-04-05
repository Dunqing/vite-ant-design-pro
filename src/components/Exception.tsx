import React from 'react'
import { Button, Result } from 'antd'

function backToHome() {
  history.push('/')
}

const Exception404 = () => (
  <Result
    status="404"
    title="404"
    subTitle="抱歉，你访问的页面不存在"
    extra={
      <Button type="primary" onClick={backToHome}>
        返回首页
      </Button>
    }
  />
)

const Exception403 = () => (
  <Result
    status="403"
    title="403"
    subTitle="抱歉，你无权访问该页面"
    extra={
      <Button type="primary" onClick={backToHome}>
        返回首页
      </Button>
    }
  />
)

export interface IRouteMenuConfig {
  /** 当前菜单名 */
  name: string
  /** antd 的 icon name 和 url */
  icon?: string
  /** 在菜单中隐藏他的子项 */
  hideChildren?: boolean
  /** 默认为false 在菜单中只隐藏此项，子项往上提，仍旧展示 */
  flatMenu?: boolean
  [key: string]: any
}

export interface IRouteLayoutConfig {
  /** 默认 false */
  hideMenu?: boolean
  /** 默认 false */
  hideNav?: boolean
  /** 默认 false */
  hideFooter?: boolean
  [key: string]: any
}

const WithExceptionOpChildren: React.FC<{
  currentPathConfig?: IRouteLayoutConfig
  children: any
  noFound: React.ReactNode
  unAccessible: React.ReactNode
}> = (props) => {
  const { children, currentPathConfig } = props
  // 404 现在应该很少会发生
  if (!currentPathConfig)
    return props.noFound || <Exception404 />

  /**
   * 这里是没有权限的意思
   */
  if (currentPathConfig.unAccessible || currentPathConfig.unaccessible)
    return props.unAccessible || <Exception403 />

  return children
}

export { Exception404, Exception403, WithExceptionOpChildren }
