import React, { useMemo } from 'react'
import { Button, Result } from 'antd'
import type { matchRoutes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Exception404 = () => {
  const navigate = useNavigate()
  return <Result
    status="404"
    title="404"
    subTitle="抱歉，你访问的页面不存在"
    extra={
      <Button type="primary" onClick={() => {
        navigate('/')
      }}>
      返回首页
      </Button>
    }
  />
}

const Exception403 = () => {
  const navigate = useNavigate()
  return <Result
    status="403"
    title="403"
    subTitle="抱歉，你无权访问该页面"
    extra={
      <Button type="primary" onClick={() => navigate('/')}>
        返回首页
      </Button>
    }
  />
}

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

const Exception: React.FC<{
  matches: ReturnType<typeof matchRoutes>
  children: any
}> = ({ matches, children }) => {
  // 404 现在应该很少会发生

  const isNotFound = useMemo(() => matches?.every(item => !item.route.element)
    , [matches]) ?? true

  if (isNotFound)
    return <Exception404 />

  return children
}
export { Exception404, Exception403, Exception }
