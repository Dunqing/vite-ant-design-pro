
declare module '@virtual-antd-layout' {

  import type { BasicLayoutProps } from '@ant-design/pro-layout'

  export interface LayoutProps extends BasicLayoutProps {
    childrenRender?: (children: React.ReactNode, props: LayoutProps) => React.ReactNode
    routes: RoutesType
    /**
   * Suspense's fallback
   */
    fallback?: React.ReactNode
    /**
   * used by built-in rightContentRender
   */
    rightContentOptions?: {
    /**
     * if exists, display logout button
     */
      logout?: () => {}
      loading?: boolean
      userInfo?: {
        avatar: string
        name: string
      }
    }

  }

  const Layout: React.FC<LayoutProps> = () => null

  export default Layout

}
