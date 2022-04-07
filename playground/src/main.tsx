import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import IntlProvider from './locales'
import LayoutWrapper from './layouts'
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <div style={{ height: '100vh' }}>
      <Provider store={store}>
        <IntlProvider>
          <BrowserRouter>
            <LayoutWrapper />
          </BrowserRouter>
        </IntlProvider>
      </Provider>
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
)
