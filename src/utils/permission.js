import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth'
import { Message as Message } from 'element-ui'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration
// const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  const hasToken = getToken()
  // console.log('888')
  // if (hasToken && !store.state.user.haslogin) {
  if (hasToken) {
    await store.dispatch('user/getInfo').catch(err => {
      Message({
        message: err,
        type: 'error',
        duration: 5 * 1000
      })
    })
  }
  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
