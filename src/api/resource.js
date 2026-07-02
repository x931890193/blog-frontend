import request from './request'
import protoRoot from '@/proto/proto'
import { Message as Message } from 'element-ui'

const PATH = '/resource'

function getResourceList(params) {
  return Promise.resolve({
    code: 0,
    list: [],
    rows: [],
    total: 0
  })
}

function uploadResource(data) {
  return uploadFile(data)
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
  return Promise.reject(new Error('前台不支持删除资源'))
}

export default {
  getResourceList,
  uploadResource,
  deleteResource,
  uploadFile
}
