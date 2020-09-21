import axios from 'axios'
import qs from 'qs'
let fetch = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000
})


export default {
  get(url, params = {}) {
    return fetch({
      method: 'get',
      url,
      params
    })
  },
  post(url, params = {}) {
    return fetch({
      method: 'post',
      url,
      data: qs.stringify(params)
    })
  },
  put(url, params = {}) {
    return fetch({
      method: 'put',
      url,
      data: qs.stringify(params)
    })
  },
  delete(url, params = {}) {
    return fetch({
      method: 'delete',
      url,
      params
    })
  },
}

