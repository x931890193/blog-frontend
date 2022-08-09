import request from './index'
import protoRoot from '@/proto/proto'

import { Message as Message } from 'element-ui'

const PATH = '/reward'

async function getRewardList() {
  const buf = await request({
    url: `${PATH}/getList`,
    method: 'get'
  })
  const RewardResp = protoRoot.lookupType('RewardResp')
  const res = RewardResp.decode(buf)
  if (res.code !== 0) {
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
