import useApi from 'src/composables/UseApi'

export default function produtosService () {
  const { list, post, update, remove, listById, listByIds } = useApi('produto')

  return {
    list,
    post,
    update,
    remove,
    listById,
    listByIds
  }
}
