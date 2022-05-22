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
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
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
    path: '/resume',
    name: 'resume',
    icon: 'book',
    component: './Resume',
  },
  {
    name: 'list.table-list',
    path: '/list',
    icon: 'table',
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
