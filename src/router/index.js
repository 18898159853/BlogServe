import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
  //路由初始指向
    path: '/',
    name: 'Home',
    component:()=>import('../components/Home/index.vue'),
  },
  {
      path: '/article',
      name: 'article',
      component:()=>import('../components/article/index.vue'),
      redirect:'/article/index',
      children:[
        {
          path:'index',
          name: 'article',
          component:()=>import('../components/article/list.vue'),
          meta:{
            keepAlive:true,
          }
        },
        {
        path:':id',
         name: 'detail',
        component:()=>import('../components/article/detail.vue'),
      }]
    },
    {
      path: '/codes',
      name: 'codes',
      component:()=>import('../components/codes/index.vue'),

    },
    {
      path: '/demo',
      name: 'demo',
      component:()=>import('../components/demo/index.vue'),
    },
    {
      path: '/problem',
      name: 'problem',
      component:()=>import('../components/problem/index.vue'),
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
