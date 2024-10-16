import useApi from 'src/composables/UseApi'

export default function produtosService () {
  const { list, post, update, remove, listById, listByIds } = useApi('produtos')

  return {
    list,
    post,
    update,
    remove,
    listById,
    listByIds
  }
}
