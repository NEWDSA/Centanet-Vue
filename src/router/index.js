import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * path:'/'                       url路径
 * hidden: true                   不显示在左侧菜单列表
 * component:Layout               加载的vue组件
 * name:'router-name'             vue-router 路由名称
 * meta : {
    title: 'title'               左侧菜单标题
    icon: 'svg-name'             左侧菜单图标
    affix：false                 是否固定于Tags中，默认为false
    noCache:false                不缓存组件信息，默认为false缓存信息， 设置为true则表示不存组件信息
    noScroll:false               模板组件不出现el-scrollbar滚动，默认为false出现滚动组件， 设置为true则表示不需要出现滚动组件
  }
  children : []                  子节点
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/Home',
    children: [{
      path: 'Home',
      name: 'Home',
      component: () => import('@/views/Home'),
      meta: { title: '首页', icon: 'dashboard', affix: true }
    }, {
      path: 'extable',
      name: 'extable',
      component: () => import('@/views/extable'),
      meta: { title: 'table', icon: 'dashboard' }
    }, {
      path: 'edit',
      name: 'edit',
      component: () => import('@/views/edit'),
      hidden: true,
      meta: { title: 'edit' }
    }]
  }

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!

]

export const asyncRoutes = [
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'TransactionProject',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
