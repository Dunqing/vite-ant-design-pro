import styles from './welcome.module.less'
import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Card, Alert, Typography } from 'antd'
import { FormattedMessage, useIntl } from 'react-intl'

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
)

const Welcome: React.FC = () => {
  const intl = useIntl()

  return (
    <PageContainer>
      <Card>
        <Typography.Title>
          <Typography.Link href="https://github.com/1247748612/vite-ant-design-pro">
            This project is based on Vite, For more information please click
            here
          </Typography.Link>
        </Typography.Title>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage:
              'Faster and stronger heavy-duty components have been released.',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          <FormattedMessage
            id="pages.welcome.advancedComponent"
            defaultMessage="Advanced Form"
          />{' '}
          <a
            href="https://procomponents.ant.design/components/table"
            rel="noopener noreferrer"
            target="__blank"
          >
            <FormattedMessage
              id="pages.welcome.link"
              defaultMessage="Welcome"
            />
          </a>
        </Typography.Text>
        <CodePreview>yarn add @ant-design/pro-table</CodePreview>
        <Typography.Text
          strong
          style={{
            marginBottom: 12,
          }}
        >
          <FormattedMessage
            id="pages.welcome.advancedLayout"
            defaultMessage="Advanced layout"
          />{' '}
          <a
            href="https://procomponents.ant.design/components/layout"
            rel="noopener noreferrer"
            target="__blank"
          >
            <FormattedMessage
              id="pages.welcome.link"
              defaultMessage="Welcome"
            />
          </a>
        </Typography.Text>
        <CodePreview>yarn add @ant-design/pro-layout</CodePreview>
      </Card>
    </PageContainer>
  )
}

export default Welcome
