import request from './request'
import protoRoot from '@/proto/proto'
import { Message as Message } from 'element-ui'

const PATH = '/user'

function login() {
  return request({
    url: `${PATH}/login`,
    method: 'get'
  })
}

function logout() {
  return request({
    url: `${PATH}/logout`,
    method: 'post'
  })
}

async function getInfo() {
  const buf = await request({
    url: `${PATH}/getUserInfo`,
    method: 'get'
  })
  const UserInfoResp = protoRoot.lookupType('UserInfoResp')
  const res = UserInfoResp.decode(buf)
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

function getWebBlogUser() {
  return request({
    url: `${PATH}/getWebBlogUser`,
    method: 'get'
  })
}

function edit(data) {
  return request({
    url: `${PATH}/edit`,
    method: 'post',
    data
  })
}

async function getLinkList() {
  const buf = await request({
    url: `link/list`,
    method: 'get'
  })
  const LinkListResp = protoRoot.lookupType('LinkListResp')
  const res = LinkListResp.decode(buf)
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
  login,
  logout,
  getInfo,
  edit,
  getWebBlogUser,
  getLinkList
}
