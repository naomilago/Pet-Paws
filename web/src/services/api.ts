import axios from 'axios'

const api = axios.create({
  baseURL: 'https://3333-d9d762b3-0d28-43a7-a121-4b68e84430c6.ws-us02.gitpod.io'
})

export default api