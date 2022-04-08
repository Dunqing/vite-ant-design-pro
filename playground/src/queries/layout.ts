import { useQuery } from 'react-query'

const initialState = {
  locale: 'zh-CN',
  siderWidth: 208,
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Ant Design Pro',
  pwa: false,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '',
}

export const useLayoutQuery = () => useQuery({
  queryKey: '@layout',
  initialData: initialState,
  queryFn: () => {
    return Promise.resolve(initialState)
  },
  enabled: true,
  select(value) {
    return value
  },
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  refetchIntervalInBackground: false,
}).data!
