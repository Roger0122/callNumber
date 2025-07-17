import { toast } from 'vue3-toastify'

const options = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 1000,
}

export function toastSimple(type = 'info', message = '') {
  switch (type) {
    case 'success':
      toast.success(message, options) 
      break
    case 'error':
      toast.error(message, options) 
      break
    case 'warn':
      toast.warning(message, options)
      break
    default:
      toast(message, options) 
  }
}
