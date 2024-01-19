import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
  //路由初始指向
    path: '/',
    name: 'Home',
    component:()=>import('../view/Home/index.vue'),
    meta: { title: '首页' }
  },
  {
      path: '/article',
      name: 'article',
      component:()=>import('../view/article/index.vue'),
      redirect:'/article/index',
      meta: { title: '随笔文章' },
      children:[
        {
          path:'index',
          name: 'article',
          component:()=>import('../view/article/list.vue'),
          meta:{
            keepAlive:true,
          }
        },
        {
        path:':id',
         name: 'detail',
        component:()=>import('../view/article/detail.vue'),
      }]
    },
    {
      path: '/codes',
      name: 'codes',
      component:()=>import('../view/codes/index.vue'),
      meta: { title: '网站分享' }
    },
    {
      path: '/demo',
      name: 'demo',
      component:()=>import('../view/demo/index.vue'),
      meta: { title: 'Demo展示' }
    },
    {
      path: '/access',
      name: 'access',
      component:()=>import('../view/access/index.vue'),
      meta: { title: '访客记录' }
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})
export default router
