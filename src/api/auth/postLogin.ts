import { useMutation } from '$lib/tanstackUtil'
import { instance } from '$lib/axiosLib'

interface IProps {
  payload: {
    username: string
    password: string
  }
}

export const postLogin = () =>
  useMutation(() => ({
    mutationFn: async (props: IProps) => {
      const res = await instance.post('auth/login', props.payload)
      return res.data as { message: string }
    },
  }))
