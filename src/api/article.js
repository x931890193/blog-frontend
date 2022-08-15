import request from './request'
import protoRoot from '@/proto/proto'
import { Message as Message } from 'element-ui'
const PATH = '/article'

async function getList(params) {
  const buf = await request({
    url: `${PATH}/list`,
    method: 'get',
    params: params
  })
  const ArticleListResp = protoRoot.lookupType('ArticleListResp')
  const res = ArticleListResp.decode(buf)
  if (res.code) {
    Message({
      message: res.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(res.msg || 'Error'))
  }
  return res
}

async function getListByClass(params) {
  const buf = await request({
    url: `${PATH}/getListByClass`,
    method: 'get',
    params
  })
  const ListByClassResp = protoRoot.lookupType('ListByClassResp')
  const res = ListByClassResp.decode(buf)
  if (res.code) {
    Message({
      message: res.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(res.msg || 'Error'))
  }
  return res
}

async function getInfo(params) {
  const buf = await request({
    url: `${PATH}/getInfo`,
    method: 'get',
    params
  })
  const ArticleOneResp = protoRoot.lookupType('ArticleOneResp')
  const res = ArticleOneResp.decode(buf)
  if (res.code) {
    Message({
      message: res.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(res.msg || 'Error'))
  }
  return res
}

export default {
  getList,
  getListByClass,
  getInfo
}
