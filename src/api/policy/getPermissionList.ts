import { useQuery, type CreateQueryOptions } from '$lib/tanstackUtil'
import { instance } from '$lib/axiosLib'

export const getPermissionList = (options?: Partial<CreateQueryOptions>) =>
  useQuery(() => ({
    ...options,
    queryKey: ['policy', 'permission'],
    queryFn: async () => {
      const res = await instance.get('policy/permission')
      return res.data as { message: string; data: Record<string, unknown>[] }
    },
  }))
