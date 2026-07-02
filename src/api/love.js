import request from './request'
import protoRoot from '@/proto/proto'
import { Message as Message } from 'element-ui'

const PATH = '/love'

async function add(data) {
  const buf = await request({
    url: `${PATH}/add`,
    method: 'post',
    data
  })
  const BaseResp = protoRoot.lookupType('BaseResp')
  const res = BaseResp.decode(buf)
  if (res.code) {
    Message({
      message: res.msg || '点赞失败',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(res.msg || '点赞失败'))
  }
  return {
    status: 1,
    msg: res.msg,
    loveCount: res.msg
  }
}

export default {
  add
}
