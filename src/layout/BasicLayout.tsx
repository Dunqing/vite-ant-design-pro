import type { BasicLayoutProps } from '@ant-design/pro-layout'
import ProLayout from '@ant-design/pro-layout'
import React, { useMemo } from 'react'
import { Link, matchRoutes, renderMatches, useLocation, useNavigate } from 'react-router-dom'
import { Exception } from '../components/Exception'
import type { RoutesType } from '../types/routes'
import renderRightContent from '../utils/renderRightContent'
// import './index.less'

const traverseRoutes = (routes?: RoutesType): RoutesType => {
  return routes?.map((route) => {
    let element = route.element

    if (element === undefined && route.component) {
      const { component: Component } = route
      element = <Component />
    }

    return {
      ...route,
      element,
      children: traverseRoutes(route.children),
    }
  }) as RoutesType
}

const BasicLayout = (props: any) => {
  const { logo, children, userConfig = {}, routes, ...restProps } = props
  const realRoutes = useMemo(() => traverseRoutes(routes), [routes])

  const location = useLocation()

  const matchResult = matchRoutes(realRoutes, location)
  const routesElement = renderMatches(matchResult)

  const navigate = useNavigate()

  // layout 是否渲染相关
  const layoutRestProps: BasicLayoutProps & {
    rightContentRender?:
    | false
    | ((
      props: BasicLayoutProps,
      dom: React.ReactNode,
      config: any,
    ) => React.ReactNode)
  } = {
    itemRender: route => <Link to={route.path}>{route.breadcrumbName}</Link>,
    ...userConfig,
    ...restProps,
  }

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
      menu={ { locale: userConfig.locale } }
      formatMessage={userConfig?.formatMessage}
      logo={logo}
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
      {...layoutRestProps}
      rightContentRender={
        layoutRestProps?.rightContentRender !== false
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
        {children}
        {routesElement}
      </Exception>
    </ProLayout>
  )
}

export default BasicLayout
