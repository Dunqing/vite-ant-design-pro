import axios from 'axios'

export const request = axios.create({
  headers: {
    'content-type': 'application/json;charset=UTF-8',
  },
  baseURL: '/',
  timeout: 5000,
})

request.interceptors.request.use((config) => {
  return config
})

request.interceptors.response.use((response) => {
  if (response.data)
    return response.data

  return response
})
