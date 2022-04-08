import ProLayout from '@ant-design/pro-layout'
import { Suspense, useMemo } from 'react'
import { Link, matchRoutes, useLocation, useNavigate } from 'react-router-dom'
import { Exception } from '../components/Exception.tsx'
import type { LayoutProps } from '../types'
import renderRightContent from '../utils/renderRightContent.tsx'
import { traverseRoutes } from '../utils/traverseRoutes.tsx'
import renderMatches from '../utils/renderMatches.tsx'
import './index.less'

const Layout = (props: LayoutProps) => {
  const { fallback = 'loading...', rightContentProps, children, rightContentRender, childrenRender = c => c, routes, ...restProps } = props

  const realRoutes = useMemo(() => traverseRoutes(routes, true), [routes])

  const location = useLocation()

  const matchResult = matchRoutes(realRoutes, location)
  const routesElement = renderMatches(matchResult)

  const navigate = useNavigate()

  return (
    <ProLayout
      title="Ant Design Pro"
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
        && ((layoutProps) => {
          if (rightContentRender)
            return rightContentRender(layoutProps)
          return renderRightContent?.(rightContentProps)
        })
      }
    >
      <Suspense fallback={fallback}>
        <Exception
          matches={matchResult}
        >
          {childrenRender(<>
            {children}
            {routesElement}
          </>, props)}
        </Exception>
      </Suspense>
    </ProLayout>
  )
}

export default Layout
