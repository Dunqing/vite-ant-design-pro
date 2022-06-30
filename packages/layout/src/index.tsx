import { Exception } from './components/Exception'
import {
  getLayoutRender,
  renderMatches,
  renderRightContent,
  traverseRoutes,
  traverseRoutesReplaceIcon,
} from './utils'
import ProLayout from '@ant-design/pro-layout'
import { Suspense, useMemo } from 'react'
import { Link, matchRoutes, useLocation, useNavigate } from 'react-router-dom'
import type { BasicLayoutProps } from '@ant-design/pro-layout'
import type { LayoutProps } from './types'
import './index.less'

export * from './types'

const Layout = (props: LayoutProps) => {
  const {
    fallback = 'loading...',
    rightContentProps,
    children,
    rightContentRender,
    childrenRender = (c) => c,
    ...restProps
  } = props

  // menu routes
  const menusRoutes = useMemo(
    () => traverseRoutesReplaceIcon(props.routes),
    [props.routes]
  )

  const routes = useMemo(
    () => traverseRoutes(props.routes, true),
    [props.routes]
  )

  const location = useLocation()

  const matchResult = matchRoutes(routes, location)

  const routesElement = renderMatches(matchResult)

  const layoutRestProps: BasicLayoutProps & {
    rightContentRender?:
      | false
      | ((
          props: BasicLayoutProps,
          dom: React.ReactNode,
          config: any
        ) => React.ReactNode)
  } = {
    ...restProps,
    ...matchResult?.reduce((obj, match) => {
      return { ...getLayoutRender(match.route), ...obj }
    }, {}),
  }

  const navigate = useNavigate()

  return (
    <Suspense fallback="icon loading ~~~">
      <ProLayout
        title="Ant Design Pro"
        route={{ routes: menusRoutes }}
        location={location}
        navTheme="dark"
        siderWidth={256}
        onMenuHeaderClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          navigate('/')
        }}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl) return defaultDom

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
        fixSiderbar
        fixedHeader
        itemRender={(route) => (
          <Link to={route.path}>{route.breadcrumbName}</Link>
        )}
        {...layoutRestProps}
        rightContentRender={
          rightContentRender !== false &&
          ((layoutProps) => {
            if (rightContentRender) return rightContentRender(layoutProps)
            return renderRightContent?.(rightContentProps)
          })
        }
      >
        <Suspense fallback={fallback}>
          <Exception matches={matchResult}>
            {childrenRender(
              <>
                {children}
                {routesElement}
              </>,
              props
            )}
          </Exception>
        </Suspense>
      </ProLayout>
    </Suspense>
  )
}

export default Layout
