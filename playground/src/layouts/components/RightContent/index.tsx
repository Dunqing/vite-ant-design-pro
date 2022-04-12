import Avatar from './AvatarDropdown'
import styles from './index.module.less'
import { Space } from 'antd'
import React from 'react'
import { SelectLang } from '@/locales'
import { useLayout } from '@/layouts'

export type SiderTheme = 'light' | 'dark'

const GlobalHeaderRight: React.FC = () => {
  const [{ navTheme, layout }] = useLayout()

  let className = styles.right

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix')
    className = `${styles.right}  ${styles.dark}`

  return (
    <Space className={className}>
      <Avatar />
      <SelectLang className={styles.action} />
    </Space>
  )
}
export default GlobalHeaderRight
