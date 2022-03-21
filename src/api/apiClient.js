import Axios from 'axios'

const apiClient = () => {
  const instance = Axios.create({
    baseURL: 'https://clipboard-server.herokuapp.com/api',
  })

  return instance
}

export default apiClient
