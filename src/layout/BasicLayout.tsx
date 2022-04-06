import type { BasicLayoutProps, MenuDataItem } from '@ant-design/pro-layout'
import ProLayout from '@ant-design/pro-layout'
import { useMemo } from 'react'
import { Link, matchRoutes, useLocation } from 'react-router-dom'
import { WithExceptionOpChildren } from '../components/Exception'
import getLayoutRenderConfig from './getLayoutRenderConfig'

const BasicLayout = (props: any) => {
  const { logo, children, userConfig = {}, routes, ...restProps } = props

  const location = useLocation()

  const currentPathConfig = matchRoutes(routes, location)?.[0]

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
    ...getLayoutRenderConfig(currentPathConfig as any || {}),
  }

  return (
    <ProLayout
      route={{ routes }}
      location={location}
      title={userConfig?.name || userConfig?.title}
      navTheme="dark"
      siderWidth={256}
      onMenuHeaderClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        history.push('/')
      }}
      menu={ { locale: userConfig.locale } }
      // // 支持了一个 patchMenus，其实应该用 menuDataRender
      // menuDataRender={
      //   userConfig.patchMenus
      //     ? menuData => userConfig?.patchMenus(menuData, initialInfo)
      //     : undefined
      // }
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
      fixSiderbar
      fixedHeader
      {...layoutRestProps}
      // rightContentRender={
      //   // === false 应该关闭这个功能
      //   layoutRestProps?.rightContentRender !== false
      //   && ((layoutProps) => {
      //     const dom = renderRightContent?.(
      //       userConfig,
      //       loading,
      //       initialState,
      //       setInitialState,
      //     )
      //     if (layoutRestProps.rightContentRender) {
      //       return layoutRestProps.rightContentRender(layoutProps, dom, {
      //         userConfig,
      //         loading,
      //         initialState,
      //         setInitialState,
      //       })
      //     }
      //     return dom
      //   })
      // }
    >
      <WithExceptionOpChildren
        noFound={userConfig?.noFound}
        unAccessible={userConfig?.unAccessible}
        currentPathConfig={currentPathConfig}
      >
        {userConfig.childrenRender
          ? userConfig.childrenRender(children, props)
          : children}
      </WithExceptionOpChildren>
    </ProLayout>
  )
}

export default BasicLayout
