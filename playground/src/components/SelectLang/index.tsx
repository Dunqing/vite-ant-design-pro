import { defaultLangUConfigMap } from './constants'
import { getAllLocales } from './utils'
import React from 'react'
import { Dropdown, Menu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import type { CSSProperties } from 'react'
import type { DropDownProps, MenuProps } from 'antd'
import { useLayout } from '@/layouts'

export interface HeaderDropdownProps extends DropDownProps {
  overlayClassName?: string
  placement?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomCenter'
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  overlayClassName: cls,
  ...restProps
}) => <Dropdown overlayClassName={cls} {...restProps} />

interface LocalData {
  lang: string
  label?: string
  icon?: string
  title?: string
  key?: string
}

interface SelectLangProps {
  globalIconClassName?: string
  postLocalesData?: (locales: LocalData[]) => LocalData[]
  onItemClick?: MenuProps['onClick']
  className?: string
  icon?: React.ReactNode
  style?: CSSProperties
}

export const SelectLang: React.FC<SelectLangProps> = (props) => {
  const {
    globalIconClassName,
    postLocalesData,
    onItemClick,
    icon,
    style,
    ...restProps
  } = props

  const [{ locale }, updateLayout] = useLayout()

  const changeLang: MenuProps['onClick'] = ({ key }): void => {
    updateLayout((_value) => {
      return {
        ..._value,
        locale: key,
      }
    })
  }

  const defaultLangUConfig = getAllLocales().map(
    (key) =>
      defaultLangUConfigMap[key] || {
        lang: key,
        label: key,
        icon: '🌐',
        title: key,
      }
  )

  const allLangUIConfig: ItemType[] = (
    postLocalesData?.(defaultLangUConfig) || defaultLangUConfig
  ).map((item) => {
    return {
      ...item,
      key: item.lang,
      style: { minWidth: '160px' },
      icon: (
        <span
          role="img"
          aria-label={item?.label || 'en-US'}
          style={{ marginRight: '8px' }}
        >
          {item?.icon || '🌐'}
        </span>
      ),
    }
  })

  const handleClick: MenuProps['onClick'] = onItemClick
    ? (params) => onItemClick(params)
    : changeLang

  const langMenu = (
    <Menu
      selectedKeys={[locale]}
      items={allLangUIConfig}
      onClick={handleClick}
    ></Menu>
  )

  const inlineStyle = {
    cursor: 'pointer',
    padding: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    verticalAlign: 'middle',
    ...style,
  }

  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight" {...restProps}>
      <span className={globalIconClassName} style={inlineStyle}>
        <i
          className="anticon"
          title={defaultLangUConfigMap[locale as 'zh-CN']?.title}
        >
          {icon || (
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
                className="css-c4d79v"
              />
            </svg>
          )}
        </i>
      </span>
    </HeaderDropdown>
  )
}
