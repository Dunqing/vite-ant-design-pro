import type { BasicLayoutProps } from '@ant-design/pro-layout'
import type React from 'react'
import type { RoutesType } from './routes'

export * from './routes'
export interface LayoutProps extends BasicLayoutProps {
  childrenRender: (children: React.ReactNode, props: LayoutProps) => React.ReactNode
  routes: RoutesType
  /**
   * Suspense's fallback
   */
  fallback: React.ReactNode
}
