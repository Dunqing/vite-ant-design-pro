import { CrownOutlined, SmileOutlined, TableOutlined } from '@ant-design/icons'

export const routes = [
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
    icon: <SmileOutlined />,
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: <CrownOutlined />,
    access: 'canAdmin',
    component: './Admin',
    children: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    path: '/list',
    icon: <TableOutlined />,
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
]
