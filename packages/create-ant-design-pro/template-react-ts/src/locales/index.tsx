import zhCN from './zh-CN'
import { useEffect, useState } from 'react'
import { IntlProvider as Provider } from 'react-intl'
import type { PropsWithChildren } from 'react'
import { useLayout } from '@/layouts'

export * from './components/SelectLang'

export default function IntlProvider({ children }: PropsWithChildren<any>) {
  const [{ locale }] = useLayout()
  const [message, setMessage] = useState(zhCN)

  useEffect(() => {
    import(`../locales/${locale}.ts`).then((module) => {
      setMessage(module.default)
    })
  }, [locale])

  return (
    <Provider messages={message} defaultLocale="zh-CN" locale="zh-CN">
      {children}
    </Provider>
  )
}
