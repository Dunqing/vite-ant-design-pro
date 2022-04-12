import { useMutation, useQuery, useQueryClient } from 'react-query'
import type {
  CurrentUser,
  FakeCaptcha,
  LoginParams,
  LoginResult,
} from './types'
import { request } from '@/libs/request'

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string
  },
  options?: Record<string, any>
) {
  return request<FakeCaptcha>('/api/login/captcha', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

const UserInfoQueryKey = '/api/currentUser'

export const useUserInfoQuery = () => useQuery<CurrentUser>(UserInfoQueryKey)

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(
    (data: LoginParams) => {
      return request<LoginResult>({
        url: '/api/login/account',
        method: 'post',
        data,
      })
    },
    {
      onSuccess(data) {
        queryClient.fetchQuery(UserInfoQueryKey)
        queryClient.setQueryData('login-data', () => data)
      },
    }
  )
}

export const useLogoutMutation = () =>
  useMutation(() => {
    return request('/api/login/outLogin', { method: 'post' })
  })
