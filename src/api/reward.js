import request from './request'
import protoRoot from '@/proto/proto'

import { Message as Message } from 'element-ui'

const PATH = '/reward'

async function getRewardList() {
  const buf = await request({
    url: `${PATH}/list`,
    method: 'get'
  })
  const RewardResp = protoRoot.lookupType('RewardResp')
  const res = RewardResp.decode(buf)
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
  getRewardList
}
