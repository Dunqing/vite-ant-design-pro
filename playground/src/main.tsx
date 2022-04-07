import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Navigate } from 'react-router-dom'
import { DashboardFilled, SmileOutlined } from '@ant-design/icons'
import Layout from '@virtual-antd-layout'
import IntlProvider from './locales'


const routes = [
  {
    path: '/user',
    layout: false,
    children: [
      {
        name: 'login',
        path: 'login',
        component: './user/Login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  // {
  //   component: './404',
  // },
]


ReactDOM.render(
  <React.StrictMode>
    <div style={{ height: '100vh' }}>
    <IntlProvider>
      <BrowserRouter>
        <Suspense fallback="aaaa">

        </Suspense>

        <Layout routes={routes}>
        </Layout>
      </BrowserRouter>
    </IntlProvider>
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
)
