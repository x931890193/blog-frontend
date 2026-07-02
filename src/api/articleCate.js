import request from './request'
import protoRoot from '@/proto/proto'
import { Message as Message } from 'element-ui'

const PATH = '/article/category'

// 所有分类
async function getAllList(params) {
  const buf = await request({
    url: `${PATH}/list`,
    method: 'get',
    params
  })
  const AdminCategoryListResp = protoRoot.lookupType('AdminCategoryListResp')
  const res = AdminCategoryListResp.decode(buf)
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

async function getInfo(params = {}) {
  const res = await getAllList()
  const id = Number(params.id || params.categoryId)
  return {
    code: 0,
    obj: res.rows.find(item => Number(item.id) === id) || null
  }
}

function add(data) {
  return Promise.reject(new Error('分类新增请在管理后台操作'))
}

function edit(data) {
  return Promise.reject(new Error('分类编辑请在管理后台操作'))
}

export default {
  getAllList,
  getInfo,
  add,
  edit
}
