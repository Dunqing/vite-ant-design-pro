import { configureStore } from '@reduxjs/toolkit'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type * as reduxTypes from 'redux-thunk'

import config from './config'

export default configureStore({
  reducer: config,
})
