import fetch from './fetch'


export default {
  create(params) {
    return fetch.post('/article', params)
  },
  update(data) {
    return fetch.put('/article/' + data.id, data)
  },
  list(params) {
    return fetch.get('/article', params)
  },
  detail(params) {
    return fetch.get(`/article/${params.id}`, params)
  },
  destroy(params) {
    return fetch.delete('/article/' + params)
  }
}