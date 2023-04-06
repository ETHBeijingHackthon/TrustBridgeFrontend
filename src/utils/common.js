import { Notification } from '@arco-design/web-vue'

export const getAvatar = (param) =>
  `https://robohash.org/${param}.png?set=set3&size=1200x1200`

export const notiError = (content, errData) => {
  const notification = Notification.error({
    title: 'Error',
    content,
    duration: 5 * 1000,
  })
  console.error(errData || content)
  return notification
}

export const formatAddress = (address) => {
  if (address) {
    return address.slice(0, 4) + '****' + address.slice(-4)
  } else return ''
}
