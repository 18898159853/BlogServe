import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
  //路由初始指向
    path: '/',
    name: 'Home',
    component:()=>import('../view/Home/index.vue'),
  },
  {
      path: '/article',
      name: 'article',
      component:()=>import('../view/article/index.vue'),
      redirect:'/article/index',
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

    },
    {
      path: '/demo',
      name: 'demo',
      component:()=>import('../view/demo/index.vue'),
    },
    {
      path: '/problem',
      name: 'problem',
      component:()=>import('../view/problem/index.vue'),
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
