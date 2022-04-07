import { createSlice } from '@reduxjs/toolkit'

const config = createSlice({
  name: 'config',
  initialState: {
    lang: 'zh-CN',
  },
  reducers: {
    setLocale: (state, action) => {
      state.lang = action.payload
    },
  },
})

const { setLocale } = config.actions

export {
  setLocale,
}

export default config.reducer
