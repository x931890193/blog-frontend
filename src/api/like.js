import request from './request'
import protoRoot from '@/proto/proto'
import { Message as Message } from 'element-ui'

const PATH = '/likeOrCollect'

async function edit(data) {
  const LikeOrCollectRequest = protoRoot.lookupType('LikeOrCollectRequest')
  const LikeOrCollectRequestMessage = LikeOrCollectRequest.encode(
    LikeOrCollectRequest.create({
      id: data.id,
      flag: data.value,
      isLike: data.isLike
    })
  ).finish()
  const blob = new Blob([LikeOrCollectRequestMessage], { type: 'buffer' })
  const buf = await request({
    url: `${PATH}/edit`,
    method: 'post',
    data: blob
  })
  const BaseResp = protoRoot.lookupType('BaseResp')
  const res = BaseResp.decode(buf)
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
  const IsLikeOrCollectResp = protoRoot.lookupType('IsLikeOrCollectResp')
  const res = IsLikeOrCollectResp.decode(buf)
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
  getInfo,
  edit
}
