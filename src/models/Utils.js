import { notification } from 'antd'

const generateResponse = (status, statusCode, str) => {
  return {success: status, extras: {status: statusCode, message: str}}
}

const showNotification = (message='Notification', description='', duration=1000) => {
  notification.config({
    placement: 'bottomRight'
  })
  notification['warning']({
    message: message,
    description: description,
    duration: duration
  })
}

export { generateResponse, showNotification }
