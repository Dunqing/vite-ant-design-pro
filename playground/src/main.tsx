import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import IntlProvider from './locales'
import LayoutWrapper from './layouts'
import QueryClientProvider from './queries'

ReactDOM.render(
  <React.StrictMode>
    <div style={{ height: '100vh' }}>
      <QueryClientProvider>
        <IntlProvider>
          <BrowserRouter>
            <LayoutWrapper />
          </BrowserRouter>
        </IntlProvider>
      </QueryClientProvider>
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
)
