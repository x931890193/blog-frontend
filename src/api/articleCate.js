import request from './request'
import protoRoot from '@/proto/proto'
import { Message as Message } from 'element-ui'

const PATH = '/article/category'

// 所有分类
async function getAllList(params) {
  const buf = await request({
    url: `${PATH}/list`,
    method: 'get',
    params
  })
  const AdminCategoryListResp = protoRoot.lookupType('AdminCategoryListResp')
  const res = AdminCategoryListResp.decode(buf)
  if (res.code) {
    Message({
      message: res.msg || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(res.msg || 'Error'))
  }
  return res
}

function getInfo(params) {
  return request({
    url: `${PATH}/getInfo`,
    method: 'get',
    params
  })
}

function add(data) {
  return request({
    url: `${PATH}/add`,
    method: 'post',
    data
  })
}

function edit(data) {
  return request({
    url: `${PATH}/edit`,
    method: 'post',
    data
  })
}

export default {
  getAllList,
  getInfo,
  add,
  edit
}
