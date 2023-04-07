import { Notification } from '@arco-design/web-vue'

export const getAvatar = (param) =>
  `https://robohash.org/${param}.png?set=set3&size=1200x1200`

export const getCoverUri = (uri) => {
  if (uri) return `https://${uri}.ipfs.w3s.link/`
  else return ''
}

export const notiError = (content, errData) => {
  const notification = Notification.error({
    title: 'Error',
    content,
    duration: 5 * 1000,
  })
  console.error(errData || content)
  return notification
}

export const notiWaiting = (content) => {
  const notification = Notification.info({
    title: 'Waiting...',
    content,
    duration: 300 * 1000,
  })
  return notification
}

export const handleThegraphError = (err) => {
  const { errors } = err
  let _err = ''
  for (let i = 0; i < errors.length; ++i) {
    const current = errors[i]
    _err += current.message + `${i == errors.length - 1 ? '' : '; '}`
  }

  notiError(_err)
  console.error(err)
}

export const formatAddress = (address) => {
  if (address) {
    return address.slice(0, 4) + '****' + address.slice(-4)
  } else return ''
}
