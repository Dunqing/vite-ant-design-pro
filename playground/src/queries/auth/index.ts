import { useMutation, useQuery, useQueryClient } from 'react-query'
import type { CurrentUser, LoginParams, LoginResult } from './types'
import { request } from '@/libs/request'

export * from './types'

const UserInfoQueryKey = '/api/currentUser'

export const useUserInfoQuery = () => useQuery<CurrentUser>(UserInfoQueryKey)

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((data: LoginParams) => {
    return request<LoginResult>({
      url: '/api/login/account',
      method: 'post',
      data,
    })
  }, {
    onSuccess() {
      queryClient.fetchQuery(UserInfoQueryKey)
    },
  })
}

export const useLogoutMutation = () => useMutation(() => {
  return request('/api/login/outLogin', { method: 'post' })
})
