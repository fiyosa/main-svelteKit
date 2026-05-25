import { useMutation } from '$lib/tanstackUtil'
import { instance } from '$lib/axiosLib'

interface IProps {
  param: {
    permission_id: string
  }
}

export const deletePermission = () =>
  useMutation(() => ({
    mutationFn: async (props: IProps) => {
      const res = await instance.delete(`policy/permission/${props.param.permission_id}`)
      return res.data as { message: string }
    },
  }))
