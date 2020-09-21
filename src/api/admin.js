import fetch from './fetch'


export default {
  register(params) {
    return fetch.post('/admin/register', params)
  },
  login(params) {
    return fetch.post('/admin/login', params)
  },
  auth(params) {
    return fetch.get('/admin/auth', params)
  },
  update(data) {
    return fetch.put('/admin/' + data.id, data)
  },
  list(params) {
    return fetch.get('/admin', params)
  },
  detail(params) {
    return fetch.get(`/admin/${params.id}`, params)
  },
  destroy(params) {
    return fetch.delete('/admin/' + params)
  }
}