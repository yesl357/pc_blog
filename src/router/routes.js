export default [
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/Register')
  },
  // 首页路由配置
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
    meta: {
      title: '首页入口',
      NavIndex: 0
    }
  },
  //文章页路由
  {
    path: '/types',
    name: 'Types',
    component: () => import('@/views/Articles')
  },
  //文章列表页
  {
    path: '/articles',
    name: 'Articles',
    component:() => import('@/views/Article'),

  },
  //文章详情页
  {
    path: '/article',
    name: 'Detail',
    component:() => import('@/views/Detail'),
    meta: {
      title: '文章详情'
    }
  },
  // 其他未配置的路由都跳转到首页
  {
    path: '*',
    // 重定向
    redirect: '/'
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/my',
    name: 'My',
    component:() => import('@/views/My'),
    meta: {
      title: '我的简历',
      NavIndex: 2
    }
  },

]
