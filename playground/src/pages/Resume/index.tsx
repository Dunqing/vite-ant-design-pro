import React from 'react'
import { Resume } from '@resumejs/components'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { useIntl } from 'react-intl'
import resume from './RESUME.md?raw'

const Admin: React.FC = () => {
  const intl = useIntl()
  return (
    <PageHeaderWrapper
      title={intl.formatMessage({
        id: 'pages.resume.title',
        defaultMessage: 'Resume written in markdown',
      })}
    >
      <Resume>
        {resume}
      </Resume>
    </PageHeaderWrapper>
  )
}

export default Admin
