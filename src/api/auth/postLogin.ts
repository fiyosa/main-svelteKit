import { useMutation } from '$lib/tanstackUtil'
import { instance } from '$lib/axiosLib'

interface Payload {
  username: string
  password: string
}

export const postLogin = () =>
  useMutation(() => ({
    mutationFn: async (data: Payload) => {
      const res = await instance.post('auth/login', data)
      return res.data as { message: string }
    },
  }))
