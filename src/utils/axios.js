import axios from 'axios'
import { handleThegraphError, notiError } from '@/utils/common'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 60 * 1000,
})

const errorHandler = (error) => {
  notiError(error.message, error)
  return Promise.reject(error)
}

instance.interceptors.request.use((config) => {
  return config
}, errorHandler)

instance.interceptors.response.use((response) => {
  const { data } = response
  if ('data' in data) return data.data
  else if ('errors' in data) handleThegraphError(data)
}, errorHandler)

export default instance
