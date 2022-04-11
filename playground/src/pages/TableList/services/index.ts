import { useMutation } from 'react-query'
import { message } from 'antd'
import type { RuleList, RuleListItem } from '../types'
import { request } from '@/libs/request'

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number
    /** 页面的容量 */
    pageSize?: number
  },
  options?: Record<string, any>,
) {
  return request<RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  }).then(res => res.data)
}

export const useRuleMutation = () => {
  return {
    updateRule: useMutation('/api/rule', async(options?: Record<string, any>) => {
      const hide = message.loading('Configuring')
      try {
        await request({
          method: 'PUT',
          ...options,
        })
        hide()
        message.success('Configuration is successful')
        return true
      }
      catch (error) {
        hide()
        message.error('Configuration failed, please try again!')
        return false
      }
    }).mutateAsync,
    addRule: useMutation('/api/rule', async(options?: Record<string, any>) => {
      const hide = message.loading('正在添加')
      try {
        await request({
          method: 'POST',
          ...options,
        })
        hide()
        message.success('Added successfully')
        return true
      }
      catch (error) {
        hide()
        message.error('Adding failed, please try again!')
        return false
      }
    }).mutateAsync,
    removeRule: useMutation('/api/rule', async(fields: RuleListItem[]) => {
      const hide = message.loading('Configuring')
      try {
        await request({
          method: 'PUT',
          ...fields,
        })
        hide()

        message.success('Configuration is successful')
        return true
      }
      catch (error) {
        hide()
        message.error('Configuration failed, please try again!')
        return false
      }
    }).mutateAsync,
  }
}
