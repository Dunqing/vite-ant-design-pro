import Layout from 'virtual:antd-layout'
import { PageLoading, SettingDrawer } from '@ant-design/pro-layout'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { useIntl } from 'react-intl'
import Footer from '@/components/Footer'
import { routes } from '@/routes'
import RightContent from '@/components/RightContent'
import { useUserInfoQuery } from '@/queries/auth'
import { useLayoutQuery } from '@/queries/layout'

export default function LayoutWrapper() {
  const queryClient = useQueryClient()
  const { data: currentUser, isLoading } = useUserInfoQuery()
  const layout = useLayoutQuery()
  const location = useLocation()
  const navigate = useNavigate()
  const intl = useIntl()

  return <Layout routes={routes} rightContentRender={() => <RightContent />}
    disableContentMargin={false}

    waterMarkProps={{
      content: currentUser?.name,
    }}
    footerRender={() => <Footer />}

    onPageChange={() => {
      // 如果没有登录，重定向到 login
      if (!currentUser && location.pathname !== '/user/login')
        navigate('/user/login')
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
                queryClient.setQueryData('@layout', settings)
              }}
            />
          )}
        </>
      )
    }}
    {...layout as any}
  >

  </Layout>
}
