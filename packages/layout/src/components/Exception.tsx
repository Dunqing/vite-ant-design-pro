import React, { useMemo } from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { matchRoutes } from 'react-router-dom'

const Exception404 = () => {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，你访问的页面不存在"
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate('/')
          }}
        >
          返回首页
        </Button>
      }
    />
  )
}

const Exception403 = () => {
  const navigate = useNavigate()
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，你无权访问该页面"
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          返回首页
        </Button>
      }
    />
  )
}

const Exception: React.FC<{
  matches: ReturnType<typeof matchRoutes>
  children: any
}> = ({ matches, children }) => {
  // 404 现在应该很少会发生

  const isNotFound =
    useMemo(() => matches?.every((item) => !item.route.element), [matches]) ??
    true

  if (isNotFound) return <Exception404 />

  return children
}
export { Exception404, Exception403, Exception }
