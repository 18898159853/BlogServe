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
      children:[{
        path: 'calendar',
        name: 'calendar',
        component:()=>import('../components/demo/components/calendar.vue'),
      }]
    },
    {
      path: '/myinfo',
      name: 'myinfo',
      component:()=>import('../components/myinfo/index.vue'),
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
