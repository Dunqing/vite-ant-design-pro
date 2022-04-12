import React from 'react'
import { QueryClientProvider as Provider, QueryClient } from 'react-query'
import { request } from '@/libs/request'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      select(response: any) {
        return response.data
      },
      queryFn: ({ queryKey }) => {
        return request(queryKey[0] as any)
      },
    },
  },
})

export default function QueryClientProvider({
  children,
}: React.PropsWithChildren<Record<string, any>>) {
  return <Provider client={queryClient}>{children}</Provider>
}
