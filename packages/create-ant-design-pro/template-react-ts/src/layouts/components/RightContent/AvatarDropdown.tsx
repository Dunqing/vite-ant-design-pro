import styles from './index.module.less'
import HeaderDropdown from '../HeaderDropdown'
import React, { useCallback } from 'react'
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Menu, Spin } from 'antd'
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import {
  useLogoutMutation,
  useUserInfoQuery,
} from '@/services/ant-design-pro/login'

export interface GlobalHeaderRightProps {
  menu?: boolean
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { data: currentUser, isLoading } = useUserInfoQuery()

  const { mutate: logout } = useLogoutMutation()

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await logout()
    const { search, pathname } = location
    // Note: There may be security issues, please note
    if (
      window.location.pathname !== '/user/login' &&
      !searchParams.has('redirect')
    ) {
      navigate(
        `/user/login?${createSearchParams({
          redirect: pathname + search,
        }).toString()}`,
        {
          replace: true,
        }
      )
    }
  }

  const onMenuClick = useCallback((event: any) => {
    const { key } = event
    if (key === 'logout') {
      loginOut()
      return
    }
    navigate(`/account/${key}`)
  }, [])

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  )

  if (isLoading) return loading

  if (!currentUser || !currentUser.name) return loading

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  )
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={currentUser.avatar}
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{currentUser.name}</span>
      </span>
    </HeaderDropdown>
  )
}

export default AvatarDropdown
