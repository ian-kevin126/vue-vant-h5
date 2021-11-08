import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/router/router.config.js'
import { democonstantRouterMap } from '@/demo/router/router.config.js'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

/**
 *  处理路由  判断页面 方向 前进 还是回退
 */
function dealWithRoute(from, to) {
  const routersArr = (sessionStorage.getItem('routers') && sessionStorage.getItem('routers').split(',')) || []
  if (routersArr.length === 0) {
    routersArr.push(from.path)
    routersArr.push(to.path)
  } else {
    // console.log(routersArr.indexOf(to.path))
    if (routersArr.indexOf(to.path) !== -1) {
      // this.transitionName='slide-right'
      to.meta.isBack = true
      routersArr.splice(routersArr.indexOf(to.path) + 1, 100)
    } else {
      // this.transitionName='slide-left'
      to.meta.isBack = false
      routersArr.push(to.path)
    }
  }
  sessionStorage.setItem('routers', routersArr.join(','))
}

// let routerMap = Object.assign([], constantRouterMap, democonstantRouterMap);
constantRouterMap.push.apply(constantRouterMap, democonstantRouterMap)
const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    // base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 权限   动态路由 修改的时候 需要调用该方法  重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 1  路由守卫  进入页面之前
router.beforeEach((to, from, next) => {
  // 1 填写 页面标题
  document.title = to.meta.title
  // 2 记录页面路由
  dealWithRoute(from, to)
  // 3 校验token  跳转路由
  if (to.meta.needLogin && !localStorage.token) {
    next({
      path: 'login',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})

// 2  路由守卫
router.afterEach(route => {
  console.log('router.afterEach route ', route)
  /* 	if (route.meta.title && route.meta.isBack) {
		//是回退 才刷新
		if (document.title && document.title != route.meta.title) {
			location.reload(); //刷新页面标题  reload  document.title 会被置空
		} else {
			document.title = route.meta.title;
		}
	} */
})

// Loading chunk 15 failed  有可能是更新的文件变更后hash 造成找不到原先缓存的文件造成的
router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed) {
    router.replace(targetPath)
  }
})

export default router
