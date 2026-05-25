import { useQuery, type CreateQueryOptions } from '$lib/tanstackUtil'
import { instance } from '$lib/axiosLib'

export const getUser = (options?: Partial<CreateQueryOptions>) =>
  useQuery(() => ({
    ...options,
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const res = await instance.get('auth/user')
      return res.data as { message: string; data: Record<string, unknown> }
    },
  }))
