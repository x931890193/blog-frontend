import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  scrollBehavior: (to, from, savedPosition) => {
    // console.log('to, from, savedPosition', to, from, savedPosition)
    if (to.name === 'Detail' || to.name === 'Home') {
      return {
        y: 0
      }
    } else {
      return {
        y: 670
      }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: () => import('@/views/detail/index'),
      meta: {
        title: '详情页'
      }
    },

    {
      path: '/archive',
      name: 'Archive',
      component: () => import('@/views/archive/index'),
      meta: {
        title: '归档'
      }
    },
    {
      path: '/friendslink',
      name: 'Friendslink',
      component: () => import('@/views/friendslink/index'),
      meta: {
        title: '友链'
      }
    },
    {
      path: '/reward',
      name: 'Reward',
      component: () => import('@/views/reward/index'),
      meta: {
        title: '赞赏'
      }
    },
    {
      path: '/message',
      name: 'Message',
      component: () => import('@/views/message/index'),
      meta: {
        title: '留言板'
      }
    },
    {
      path: '/aboutme',
      name: 'Aboutme',
      component: () => import('@/views/aboutme/index'),
      meta: {
        title: '关于'
      }
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('@/views/user/index'),
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/likeCollect',
      name: 'LikeCollect',
      component: () => import('@/views/likeCollect/index'),
      meta: {
        title: '喜欢/收藏'
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
export default router
