import type { PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'
import { IntlProvider as Provider } from 'react-intl'
import zhCN from './zh-CN'
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

  return <Provider messages={message} defaultLocale="zh-CN" locale="zh-CN">{children}</Provider>
}
