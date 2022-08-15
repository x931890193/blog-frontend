import request from './request'
import protoRoot from '@/proto/proto'
import { Message as Message } from 'element-ui'

const PATH = '/resource'

function getResourceList(params) {
  return request({
    url: `${PATH}/getList`,
    method: 'get',
    params
  })
}

function uploadResource(data) {
  return request({
    url: `${PATH}/add`,
    method: 'post',
    data
  })
}

async function uploadFile(data) {
  const buf = await request({
    url: `${PATH}/upload`,
    method: 'post',
    data,
    headers: { 'Content-Type': '*' }
  })
  const UploadFileResp = protoRoot.lookupType('UploadFileResp')
  const res = UploadFileResp.decode(buf)
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

// 删除
function deleteResource(data) {
  return request({
    url: `${PATH}/delete`,
    method: 'post',
    data
  })
}

export default {
  getResourceList,
  uploadResource,
  deleteResource,
  uploadFile
}
