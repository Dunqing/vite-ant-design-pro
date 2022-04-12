import { useLayout } from './hooks'
import RightContent from './components/RightContent'
import Footer from './components/Footer'
import Layout from 'virtual:antd-layout'
import { PageLoading, SettingDrawer } from '@ant-design/pro-layout'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { useIntl } from 'react-intl'
import type { LoginResult } from '@/services/ant-design-pro/types'
import { routes } from '@/routes'
import { useUserInfoQuery } from '@/services/ant-design-pro/login'

export * from './hooks'

export default function LayoutWrapper() {
  const queryClient = useQueryClient()
  const { data: currentUser, isLoading } = useUserInfoQuery()

  const loginData = queryClient.getQueryData<LoginResult>('login-data')

  const [layout, updateLayout] = useLayout()
  const location = useLocation()
  const navigate = useNavigate()
  const intl = useIntl()

  return (
    <Layout
      routes={routes}
      rightContentRender={() => <RightContent />}
      disableContentMargin={false}
      waterMarkProps={{
        content: currentUser?.name,
      }}
      footerRender={() => <Footer />}
      onPageChange={() => {
        // 如果没有登录，重定向到 login
        if (loginData?.status !== 'ok' && location.pathname !== '/user/login') {
          requestAnimationFrame(() => {
            navigate('/user/login')
          })
        }
      }}
      formatMessage={intl.formatMessage}
      menuHeaderRender={undefined}
      // 自定义 403 页面
      // unAccessible: <div>unAccessible</div>,
      // 增加一个 loading 的状态
      childrenRender={(children) => {
        if (isLoading) return <PageLoading />
        return (
          <>
            {children}
            {!location.pathname?.includes('/login') && (
              <SettingDrawer
                disableUrlParams
                enableDarkTheme
                settings={layout as any}
                onSettingChange={(settings) => {
                  updateLayout((_value) => {
                    return {
                      ..._value,
                      ...settings,
                    }
                  })
                }}
              />
            )}
          </>
        )
      }}
      {...(layout as any)}
    ></Layout>
  )
}
