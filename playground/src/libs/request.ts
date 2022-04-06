import axios from 'axios'

export const request = axios.create({
  headers: {
    'content-type': 'application/json;charset=UTF-8',
  },
  timeout: 5000,
})

request.interceptors.request.use((config) => {
  return config
})

request.interceptors.response.use((response) => {
  return response
})
