import useApi from 'src/composables/UseApi'

export default function pedidosService () {
  const { checkout, listByUserId } = useApi('pedido')

  return {
    checkout,
    listByUserId
  }
}
