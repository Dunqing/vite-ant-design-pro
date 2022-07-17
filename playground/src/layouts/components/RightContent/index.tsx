import Avatar from './AvatarDropdown'
import styles from './index.module.less'
import HeaderSearch from '../HeaderSearch'
import { Space } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import React from 'react'
import { SelectLang } from '@/components'
import { useLayout } from '@/layouts'

export type SiderTheme = 'light' | 'dark'

const GlobalHeaderRight: React.FC = () => {
  const [{ navTheme, layout }] = useLayout()

  let className = styles.right

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix')
    className = `${styles.right}  ${styles.dark}`

  return (
    <Space className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="umi ui"
        options={[
          {
            label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,
            value: 'umi ui',
          },
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: 'Ant Design',
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: 'Pro Table',
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: 'Pro Layout',
          },
        ]}
        // onSearch={value => {
        //   console.log('input', value);
        // }}
      />
      <span
        className={styles.action}
        onClick={() => {
          window.open('https://pro.ant.design/docs/getting-started')
        }}
      >
        <QuestionCircleOutlined />
      </span>
      <Avatar />
      <SelectLang className={styles.action} />
    </Space>
  )
}
export default GlobalHeaderRight
