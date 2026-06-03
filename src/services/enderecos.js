import useApi from 'src/composables/UseApi'

export default function enderecosService () {
  const { listByUserId, post, update, remove } = useApi('endereco')

  return {
    listByUserId,
    post,
    update,
    remove
  }
}
