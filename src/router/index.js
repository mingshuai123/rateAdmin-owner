import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    name:'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
// 注册
  {
    path: '/register',
    name:'register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 申请
  // {
  //   path: '/Apply',
  //   name:'Apply',
  //   component: () => import('@/views/form/index'),
  //   hidden: true,
  // },

  // 场所评级
  {
    path: '/',
    component: Layout,
    redirect: '/rating',
    name:'personal',
    // meta: { title: '场所评级', icon: 'dashboard'},
    children: [
      {
        path: 'rating',
        name: 'rating',
        component: () => import('@/views/rating/index.vue'),
        meta: { title: '场所评级', icon: 'dashboard'}
      },
      {
        path: 'edit',
        name: 'edit',
        component: () => import('@/views/rating/edit.vue'),
        meta: { title: '场所评级', icon: 'dashboard'},
        hidden:true
      },

      {
        path: 'Apply',
        name: 'Apply',
        component: () => import('@/views/rating/apply.vue'),
        meta: { title: '场所评级申请', icon: 'dashboard'},
        hidden:true,
      },
    ]
  },

 
    
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }

];

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
export const dynamicRouter = [
  {
    path: '/business',
    component: Layout,
    redirect: '/business/businessIndex',
    name:'business',
    meta: { title: '', icon: 'dashboard' , roles: 1},
    children: [
      {
        path: 'businessIndex',
        name: 'businessIndex',
        component: () => import('@/views/business'),
        meta: { title: '经营信息', icon: 'dashboard',roles: 1}
      }
    ]
  },

  {
    path: '/service',
    component: Layout,
    redirect: '/service/serviceIndex1',
    name:'service',
    meta: { title: '转型升级服务', icon: 'dashboard' , roles: 1},
    children: [
      {
        path: 'serviceIndex1',
        name: 'serviceIndex1',
        component: () => import('@/views/service/index1'),
        meta: { title: '公共文化服务', icon: 'dashboard',roles: 1}
      },
      {
        path: 'serviceIndex2',
        name: 'serviceIndex2',
        component: () => import('@/views/service/index2'),
        meta: { title: '企业文化培训', icon: 'dashboard',roles: 1}
      },
      {
        path: 'serviceIndex3',
        name: 'serviceIndex4',
        component: () => import('@/views/service/index3'),
        meta: { title: '赛事活动服务', icon: 'dashboard',roles: 1}
      }
    ]
  },

  {
    path: '/credits',
    component: Layout,
    redirect: '/credits/creditsList',
    name:'credits',
    meta: { title: '', icon: 'dashboard' , roles: 0},
    children: [
      {
        path: 'creditsList',
        name: 'creditsList',
        component: () => import('@/views/credits'),
        meta: { title: '积分兑换', icon: 'dashboard' , roles: 0}
      },
      {
        path: 'creditsInfo',
        name: 'creditsInfo',
        component: () => import('@/views/credits/detail.vue'),
        meta: { title: '商品详情', icon: 'dashboard' , roles: 0},
        hidden:true,
      },
    ]
  },
  // 投诉与反馈
  {
    path: '/complain',
    component: Layout,
    redirect: '/complainindex',
    name:'complain',
    meta: { title: '', icon: 'dashboard', roles: 1},
    children: [
        {
        path: 'complainindex',
        name: 'complainindex',
        component: () => import('@/views/complain'),
        meta: { title: '投诉与反馈', icon: 'dashboard', roles: 1}
      }
    ]
  },

  {
    path: '/download',
    component: Layout,
    redirect: '/download1',
    name:'download',
    meta: { title: '', icon: 'dashboard', roles: 0},
    children: [
        {
        path: 'download1',
        name: 'download1',
        component: () => import('@/views/table/index.vue'),
        meta: { title: '文档下载', icon: 'dashboard', roles: 0}
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true ,meta:{roles: 0}}
];

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
