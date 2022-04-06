
import { Avatar, Dropdown, Menu, Spin } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
export default function renderRightContent(
  logout: (() => void) | undefined,
  loading: boolean,
  initialState: any,
) {
  const menu = (
    <Menu className="umi-plugin-layout-menu">
      <Menu.Item
        key="logout"
        onClick={() => {}
        }
      >
        <LogoutOutlined />
          退出登录
      </Menu.Item>
    </Menu>
  )

  const avatar = (
    <span className="umi-plugin-layout-action">
      <Avatar
        size="small"
        className="umi-plugin-layout-avatar"
        src={
          initialState?.avatar
            || 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
        }
        alt="avatar"
      />
      <span className="umi-plugin-layout-name">{initialState?.name}</span>
    </span>
  )
  if (loading) {
    return (
      <div className="umi-plugin-layout-right">
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      </div>
    )
  }
  return (
    <div className="umi-plugin-layout-right anticon">
      {logout
        ? (
          <Dropdown overlay={menu} overlayClassName="umi-plugin-layout-container">
            {avatar}
          </Dropdown>
        )
        : (
          avatar
        )}
    </div>
  )
}
