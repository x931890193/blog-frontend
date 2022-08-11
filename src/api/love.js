import request from './request'
const PATH = '/love'

function add(data) {
  return request({
    url: `${PATH}/add`,
    method: 'post',
    data
  })
}

export default {
  add
}
