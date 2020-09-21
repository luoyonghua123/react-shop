import fetch from './fetch'


export default {
  create(params) {
    return fetch.post('/category', params)
  },
  update(data) {
    return fetch.put('/category/' + data.id, data)
  },
  list(params) {
    return fetch.get('/category', params)
  },
  detail(params) {
    return fetch.get(`/category/${params.id}`, params)
  },
  destroy(params) {
    return fetch.delete('/category/' + params)
  }
}