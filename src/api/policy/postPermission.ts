import { useMutation } from '$lib/tanstackUtil'
import { instance } from '$lib/axiosLib'

interface Payload {
  name: string
  notes?: string
}

export const postPermission = () =>
  useMutation(() => ({
    mutationFn: async (data: Payload) => {
      const res = await instance.post('policy/permission', data)
      return res.data as { message: string }
    },
  }))
