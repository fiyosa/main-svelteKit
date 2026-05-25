import { useMutation } from '$lib/tanstackUtil'
import { instance } from '$lib/axiosLib'

interface IProps {
  payload: {
    name: string
    notes?: string
  }
}

export const postPermission = () =>
  useMutation(() => ({
    mutationFn: async (data: IProps) => {
      const res = await instance.post('policy/permission', data.payload)
      return res.data as { message: string }
    },
  }))
