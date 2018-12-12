import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

const router = new Router({
  mode: 'history',
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }

  const auth = router.app.$options.store.state.auth;
  const navindex = to.meta.NavIndex;
  // alert(navindex);

  // console.log(to.path);

  if (auth && to.path.indexOf('/auth/') !== -1) {
    next('/')
  } else {
    next()
  }
})

Vue.use(Router)

export default router
