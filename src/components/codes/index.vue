<template>
  <div class="codes viewContainer">
    <div class="codesContent">
      <div class="codesTitle">
        前端网站
      </div>
      <div class="codesList">
        <div
          class="codesItem"
          v-for="(item,index) in arr"
          :key="item"
          :class="'animated-fade-up-' + index"
          @click="to(item.url)"
        >
          <h3>{{item.name}}</h3>
          <p>{{item.text}}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
const arr = [{
  name: 'Vue.js',
  url: 'https://vuejs.org/',
  text: 'Vue.js 是一款构建数据驱动的 web 界面的渐进式框架。与其他庞大的框架不同，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，也便于与第三方库或已有项目整合'
},
{
  name: 'React.js',
  url: 'https://reactjs.org/',
  text: 'React 是一个用于构建用户界面的 JavaScript 库。它由 Facebook 开发并开源，用于构建用户界面。React 可以使你构建大型、复杂的单页应用，而且只使用了 JavaScript 作为编程语言。'
},

{
  name: 'Angular.js',
  url: 'https://angular.io/',
  text: 'Angular 是一个开源的 JavaScript 客户端应用框架，使用 TypeScript 语言进行开发。Angular 的目标是解决前端开发者在日常工作中遇到的问题，如模板的使用、脏检查和路由等。它使用了一个组件化的方法来构建单页应用，这使得开发、测试和重构变得更加容易。'
},
{
  name: 'Webpack',
  url: 'https://webpack.dev/',
  text: 'Webpack 是一个静态模块打包器，主要用于将模块化的代码打包成浏览器可以执行的 JavaScript 文件。它能够处理图片、CSS、字体等资源文件，并支持热更新和代码分割等功能。Webpack 的配置灵活，可以满足各种复杂的需求。'
},
{
  name: 'Axios',
  url: 'https://axios-http.com/',
  text: 'Axios 是一个基于 Promise 的 HTTP 客户端，可以在浏览器和 Node.js 中使用。它提供了一种简单的方法来发送 HTTP 请求，并支持拦截请求和响应、转换请求和响应数据等功能。Axios 还支持取消请求、自动转换 JSON 数据、客户端支持防止 CSRF 等特性。'
},
{
  name: 'Element-ui',
  url: 'https://element.eleme.cn/#/zh-CN',
  text: '桌面端组件库'
},
{
  name: 'Ant Design of React',
  url: 'https://ant.design/docs/react/introduce-cn',
  text: '企业级产品'
}]
const to = (url) => {
  window.open(url)
}
</script>

<style lang="scss" scoped>
.codes {
  margin-top: $navBar_heaight;
  padding-top: 15px;
  .codesContent {
    border-radius: $BorderRadius;
    height: 1000px;
    .codesTitle {
      margin: 30px 0 50px 0;
      font-size: 28px;
      text-align: center;
    }
    .codesList {
      display: grid;
      grid-template-columns: 22% 22% 22% 22%;
      grid-template-rows: 180px 180px 180px 180px;
      grid-gap: 4%;
      .codesItem {
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
        &:nth-child(4n) {
          margin-right: 0 !important;
        }
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
