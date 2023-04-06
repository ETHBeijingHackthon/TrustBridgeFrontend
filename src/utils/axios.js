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
  const {
    config: { baseURL },
    data,
  } = response
  if (baseURL === import.meta.env.VITE_BASE_URL) {
    if ('data' in data) return data
    else if ('errors' in data) handleThegraphError(data)
  } else {
    const { code } = data
    if (code === 200) return data.data
    else {
      if (code !== 4225 && code !== 4226 && code != 9116) {
        console.log(data)
        // notiError(
        //   CHECK_ERROR,
        //   // data.message || Array.isArray(data.msg) ? data.msg[0].msg : data.msg,
        //   data
        // )
      }

      return Promise.reject(data)
    }
  }
}, errorHandler)

export default instance
