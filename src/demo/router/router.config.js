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
export const democonstantRouterMap = [
  {
    path: '/demo',
    component: () => import('@/views/layouts/index'),
    redirect: '/demo/fullcalendar',
    meta: {
      title: '首页',
      keepAlive: false,
      needLogin: false
    },
    children: [
      {
        path: 'fullcalendar',
        name: 'FullCalendar',
        component: () => import('@/demo/views/fullcalendar/index'),
        meta: { title: '行程日历', keepAlive: false }
      },
      {
        path: 'about',
        name: 'DemoAbout',
        component: () => import('@/views/home/about'),
        meta: { title: '关于我', keepAlive: false, needLogin: false }
      }
    ]
  }
]
