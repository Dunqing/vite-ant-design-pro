import ProLayout from '@ant-design/pro-layout'
import { useMemo } from 'react'
import { Link, matchRoutes, renderMatches, useLocation, useNavigate } from 'react-router-dom'
import { Exception } from '../components/Exception'
import type { LayoutProps } from '../types'
import renderRightContent from '../utils/renderRightContent'
import { traverseRoutes } from '../utils/traverseRoutes'
import './index.less'

const Layout = (props: LayoutProps) => {
  const { children, rightContentRender, childrenRender = children => children, routes, ...restProps } = props

  const realRoutes = useMemo(() => traverseRoutes(routes), [routes])

  const location = useLocation()

  const matchResult = matchRoutes(realRoutes, location)
  const routesElement = renderMatches(matchResult)

  const navigate = useNavigate()

  return (
    <ProLayout
      title="Antd Layout"
      route={{ routes }}
      location={location}
      navTheme="dark"
      siderWidth={256}
      onMenuHeaderClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        navigate('/')
      }}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl)
          return defaultDom

        if (menuItemProps.path && location.pathname !== menuItemProps.path) {
          return (
            <Link to={menuItemProps.path} target={menuItemProps.target}>
              {defaultDom}
            </Link>
          )
        }
        return defaultDom
      }}
      disableContentMargin
      fixSiderbarcomponent
      fixedHeader
      itemRender={route => <Link to={route.path}>{route.breadcrumbName}</Link>}
      {
        ...restProps
      }
      rightContentRender={
        rightContentRender !== false
        && (() => {
          return renderRightContent?.(
            () => {},
            false,
            {},
          )
        })
      }
    >
      <Exception
        matches={matchResult}
      >
        {childrenRender(<>
          {children}
          {routesElement}
        </>, props)}
      </Exception>
    </ProLayout>
  )
}

export default Layout
