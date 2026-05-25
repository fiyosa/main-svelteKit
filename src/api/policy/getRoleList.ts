import { useQuery, type CreateQueryOptions } from '$lib/tanstackUtil'
import { instance } from '$lib/axiosLib'

export const getRoleList = (options?: Partial<CreateQueryOptions>) =>
  useQuery(() => ({
    ...options,
    queryKey: ['policy', 'role'],
    queryFn: async () => {
      const res = await instance.get('policy/role')
      return res.data as { message: string; data: Record<string, unknown>[] }
    },
  }))
