import useApi from 'src/composables/UseApi'

export default function usuariosService () {
  const { post } = useApi('usuario')

  return {
    post
  }
}
