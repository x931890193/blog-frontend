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
  if (res.code !== 0) {
    Message({
      message: res.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(res.msg || 'Error'))
  }
  console.log(res)
  return res
}

async function getListByClass(params) {
  return request({
    url: `${PATH}/getListByClass`,
    method: 'get',
    params
  })
}
async function getInfo(params) {
  return request({
    url: `${PATH}/getInfo`,
    method: 'get',
    params
  })
}

export default {
  getList,
  getListByClass,
  getInfo
}
