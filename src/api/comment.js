import request from './request'
import protoRoot from '@/proto/proto'
import { Message as Message } from 'element-ui'

const PATH = '/comment'

async function getList(params) {
  const buf = await request({
    url: `${PATH}/list`,
    method: 'get',
    params
  })
  const CommentListResp = protoRoot.lookupType('CommentListResp')
  const res = CommentListResp.decode(buf)
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

async function add(data) {
  const CommentAddRequest = protoRoot.lookupType('CommentAddRequest')
  const CommentAddRequestMessage = CommentAddRequest.encode(
    CommentAddRequest.create({
      content: data.content,
      articleId: data.articleId,
      parentId: data.parentId
    })
  ).finish()
  const blob = new Blob([CommentAddRequestMessage], { type: 'buffer' })
  const buf = await request({
    url: `${PATH}/add`,
    method: 'post',
    data: blob
  })
  const CommentAddResp = protoRoot.lookupType('CommentAddResp')
  const res = CommentAddResp.decode(buf)
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

function getInfo(params) {
  return request({
    url: `${PATH}/info`,
    method: 'get',
    params: params
  })
}

async function getTopComment(params) {
  const buf = await request({
    url: `${PATH}/getTopComment`,
    method: 'get',
    params: params
  })
  const TopCommentResp = protoRoot.lookupType('TopCommentResp')
  const res = TopCommentResp.decode(buf)
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
  getInfo,
  add,
  getTopComment
}
