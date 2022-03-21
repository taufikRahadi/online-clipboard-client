import apiClient from './apiClient'

export const getClipboardByCode = (code) => {
  console.log(code)
  return apiClient()
    .get(`/clipboard/${code}`)
    .then(({ data }) => {
      return Promise.resolve(data)
    })
    .catch(({ response }) => {
      return Promise.reject(response)
    })
}

export const createClipboard = (payload) => {
  return apiClient()
    .post('/clipboard', payload)
    .then(({ data }) => {
      return Promise.resolve(data)
    })
    .catch(({ response }) => {
      return Promise.reject(response)
    })
}
