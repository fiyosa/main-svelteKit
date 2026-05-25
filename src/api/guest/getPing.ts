import { useQuery, type CreateQueryOptions } from '$lib/tanstackUtil'
import { instance } from '$lib/axiosLib'

export const getPing = (options?: Partial<CreateQueryOptions>) =>
  useQuery(() => ({
    ...options,
    queryKey: ['ping'],
    queryFn: async () => {
      const res = await instance.get('ping')
      return res.data as { message: string; data: { id: number; hash: string } }
    },
  }))
