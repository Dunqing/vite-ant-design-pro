import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Layout from '@virtual-antd-layout'
import { BrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { DashboardFilled, SmileOutlined } from '@ant-design/icons'

ReactDOM.render(
  <React.StrictMode>
    <div style={{ height: '100vh' }}>
      <Suspense fallback="loading page...">
        <BrowserRouter>
          <Layout routes={[
            {
              path: '/',
              flatMenu: true,
              children: [
                {
                  icon: <DashboardFilled />,
                  name: '首页',
                  path: '/react',
                  headerRender: false,
                  menuRender: false,
                  footerRender: false,
                  menuHeaderRender: false,
                  component: lazy(() => import('./Pages/React')),
                },
                {
                  icon: <SmileOutlined />,
                  name: '二',
                  path: '/two',
                  children: [
                    {
                      name: '二二',
                      path: 'two-child',
                      component: lazy(() => import('./Pages/Two/TwoChild')),
                    },
                  ],
                  component: lazy(() => import('./Pages/Two')),
                },
                {
                  icon: <SmileOutlined />,
                  name: '三',
                  path: '/three',
                  children: [
                    {
                      index: true,
                      element: <Navigate replace to="asdas"></Navigate>,
                    },
                    {
                      hideInMenu: true,
                      name: 'sansan',
                      path: ':id',
                      component: lazy(() => import('./Pages/Three')),
                    },
                  ],
                },
              // { path: '*', element: <Navigate to={'/two'} /> },
              ],
            },

          ]}>
          </Layout>
        </BrowserRouter>
      </Suspense>
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
)
