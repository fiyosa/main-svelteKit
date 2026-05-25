import { useMutation } from '$lib/tanstackUtil'
import { instance } from '$lib/axiosLib'

export const deleteLogout = () =>
  useMutation(() => ({
    mutationFn: async () => {
      const res = await instance.delete('auth/logout')
      return res.data as { message: string }
    },
  }))
