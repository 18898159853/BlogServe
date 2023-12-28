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
            :class="{active:active==item.path}"
            v-for="(item,index) in routes"
            :key="index"
          >
            <div
              class="itembox"
              @click="to(item.path)"
            >
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
               <span>{{item.name}}</span>
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
// import useUser from '../store/user.js'
// const store = useUser()
const router = useRouter();
let active = ref('/')
watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  active.value = newValue
}, { immediate: true })
const routes = [
  { path: '/', name: '首页', icon: 'House' },
  { path: '/article', name: '技术文章', icon: 'Guide' },
  { path: '/codes', name: '源码分享', icon: 'Share' },
  { path: '/demo', name: 'demo演示', icon: 'DataLine' },
  { path: '/myinfo', name: '我的信息', icon: 'User' },
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
