import { useMutation } from '$lib/tanstackUtil'
import { instance } from '$lib/axiosLib'

export const deletePermission = () =>
  useMutation(() => ({
    mutationFn: async (id: string) => {
      const res = await instance.delete(`policy/permission/${id}`)
      return res.data as { message: string }
    },
  }))
