<template>
  <div class="Navbar">
    <el-row>
      <el-col :span="5">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content bg-purple-light">
          <div class="item">
            <router-link to="/"><img
                src="@/assets/images/logo.png"
                alt=""
              ></router-link>
          </div>
          <div
            class="item"
            :class="{active:active.includes(item.name)}"
            v-for="(item,index) in routes"
            :key="index"
          >
            <div
              class="itembox"
              @click="to(item.path)"
            >
              <i
                class="iconfont"
                :class="item.icon"
              ></i>
              <span>{{item.title}}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
let active = ref('/')
watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  newValue = newValue == '/' ? '/home' : newValue
  active.value = newValue
}, { immediate: true })
const routes = [
  { path: '/', name: 'home', title: 'Home', icon: 'icon-shouye' },
  { path: '/article', name: 'article', title: 'Article', icon: 'icon-jingxuanwenzhang' },
  { path: '/codes', name: 'codes', title: 'Code', icon: 'icon-a-fenxiang2' },
  { path: '/demo', name: 'demo', title: 'Demo', icon: 'icon-dianshi-' },
  { path: '/myinfo', name: 'myinfo', title: 'MyInfo', icon: 'icon-wodexinxi' },
]
const to = (path) => {
  router.push(path)
  scrollTo(0, 0)
}


</script>

<style lang="scss" scoped>
.Navbar {
  position: fixed;
  min-width: 100%;
  width: max-content;
  top: 0px;
  left: 0px;
  z-index: 1993;
  height: $navBar_heaight;
  background-color: $navBar_bg;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  transition: 0.5s;
  .bg-purple-light {
    display: flex;
    .item {
      display: flex;
      align-items: center;
      width: 100px;
      justify-content: center;
      height: $navBar_heaight;
      line-height: $navBar_heaight;
      margin: 0 10px;
      a {
        display: flex;
      }
      img {
        height: $navBar_heaight - 10px;
        width: $navBar_heaight - 10px;
        border-radius: 50%;
      }
      .itembox {
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: #65a15f;
        }
        span {
          font-size: 16px;
          font-family: "DingTalk-JinBuTi";
          margin-left: 5px;
        }
      }
    }
    .active {
      border-bottom: 2px solid #65a15f;
      color: #65a15f;
    }
  }
}
</style>
