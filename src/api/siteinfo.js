import request from './request'
import protoRoot from '@/proto/proto'

import { Message as Message } from 'element-ui'

const PATH = '/resource'

async function getSite() {
  const buf = request({
    url: `${PATH}/site_info`,
    method: 'get'
  })
  const SiteInfoResp = protoRoot.lookupType('SiteInfoResp')
  const res = SiteInfoResp.decode(buf)
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

async function getAbout() {
  const buf = await request({
    url: `${PATH}/about`,
    method: 'get'
  })
  const AboutResp = protoRoot.lookupType('AboutResp')
  const res = AboutResp.decode(buf)
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

export default {
  getSite,
  getAbout
}
