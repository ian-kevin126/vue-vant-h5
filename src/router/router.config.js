/**
 * 基础路由
 * @type { *[] }
 * meta:{
 *      title:'首页' ,  //type:String   页面标题
 *      keepAlive：false, // type:Boolean 页面是否缓存 回退时 不会刷新页面
 *      needLogin:false , // type:Boolean  是否需要登录
 *      forbiddenAnimation:false,//type:Boolean 是否加转场动画
 * }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false,
      needLogin: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/home/about'),
        meta: { title: '关于我', keepAlive: false, needLogin: false }
      },
      {
        path: '/prize',
        name: 'Prize',
        component: () => import('@/views/home/prize'),
        meta: { title: '关于我', keepAlive: false, needLogin: false }
      }
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/public/404'),
    meta: { title: '打开失败-404', keepAlive: true, needLogin: false }
  }
]
