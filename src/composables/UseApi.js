import { api } from 'src/boot/axios'

export default function useApi (url) {
  const list = async () => {
    try {
      const { data } = await api.get(url)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const post = async (form) => {
    try {
      const { data } = await api.post(url, form)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const checkout = async (enderecoId) => {
    try {
      const { data } = await api.post(`${url}/checkout`, { enderecoId })
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const update = async (form) => {
    try {
      const { data } = await api.put(`${url}/${form.id}`, form)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const remove = async (form) => {
    try {
      const { data } = await api.delete(`${url}/${form.id}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const listById = async (id) => {
    try {
      const { data } = await api.get(`${url}/${id}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const login = async (form) => {
    const { data } = await api.post(`${url}/login`, form)
    return data
  }

  const listByIds = async (ids) => {
    try {
      console.log(ids)
      const { data } = await api.post(`${url}/findByIds`, ids)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const listByUserId = async () => {
    try {
      const { data } = await api.get(`${url}/me`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    list,
    post,
    update,
    remove,
    listById,
    login,
    checkout,
    listByIds,
    listByUserId
  }
}
