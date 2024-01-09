<template>
  <div class="Navbar">
    <div class="box">
      <div class="item">
        <router-link to="/"><img
            src="@/assets/images/logo.png"
            alt=""
          ></router-link>
      </div>
      <div
        class="item"
        v-for="(item,index) in routes"
        :key="index"
      >
        <router-link
          :to="item.path"
          @click="to"
          :class="{active:active.includes(item.name)}"
        >
          <div class="itembox">
            <i
              class="iconfont"
              :class="item.icon"
            ></i>
            <span>{{value?item.etitle:item.ctitle}}</span>
          </div>
        </router-link>
      </div>
      <div class="item">
        <a @click="OpenDev">
          <div class="itembox">
            <span>{{ value?'Admin':'后台管理' }}</span>
          </div>
        </a>
      </div>
      <div class="item">
        <el-switch
          @change="handelchange"
          v-model="value"
          inline-prompt
          active-text="En"
          inactive-text="Cn"
        />
      </div>
    </div>
    <div class="smillBox">
      <div class="smillcontent">
        <div class="smilllogo">
          <router-link to="/"><img
              src="@/assets/images/logo.png"
              alt=""
            ></router-link>
        </div>
        <div
          @click="drawer = true"
          class="smallBtn"
        >
          <i class="icon-24px iconfont"></i>
        </div>
      </div>
    </div>
    <el-drawer
      v-model="drawer"
      :with-header="false"
      append-to-body
    >
      <div
        class="drawercontent"
        :class="{activesmall:active.includes(item.name)}"
        @click="handelto(item.path)"
        v-for="(item,index) in routes"
        :key="index"
      >{{ item.ctitle }}
      </div>
    </el-drawer>
  </div>
</template>
<script setup>
import { ref, watch, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router';
import useUser from '@/store/user'

// 路由
const router = useRouter();
let active = ref('/')
watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  newValue = newValue == '/' ? '/home' : newValue
  active.value = newValue
}, { immediate: true })
// 路由列表
const routes = [
  { path: '/', name: 'home', etitle: 'Home', ctitle: '首页', icon: 'icon-shouye' },
  { path: '/article', name: 'article', etitle: 'Article', ctitle: '技术文章', icon: 'icon-jingxuanwenzhang' },
  { path: '/codes', name: 'codes', etitle: 'Code', ctitle: '干货分享', icon: 'icon-a-fenxiang2' },
  { path: '/demo', name: 'demo', etitle: 'Demo', ctitle: 'Demo演示', icon: 'icon-line-080' },
  { path: '/problem', name: 'problem', etitle: 'Problem', ctitle: '常见问题', icon: 'icon-15' },
]
const to = (path) => {
  scrollTo(0, 0)
}
const drawer = ref(false)
const handelto = (path) => {
  router.push(path)
  drawer.value = false
}
// 切换语言
const reload = inject('isRouterAlive')
const useUserStore = useUser()
const handelchange = (value) => {
  reload()
  useUserStore.changeSwitch() // 更新状态
}
const value = ref(false)
onMounted(() => {
  value.value = useUserStore.switchactive
})

const OpenDev = () => {
  window.open('http://101.201.58.143:9528/login')
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
  transition: 0.3s;
  :deep(.el-switch.is-checked) .el-switch__core {
    background-color: #65a15f !important;
    border-color: #65a15f !important;
  }
  .box {
    width: max-content;
    box-sizing: border-box;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .item {
      display: flex;
      align-items: center;
      width: 100px;
      justify-content: center;
      height: $navBar_heaight;
      line-height: $navBar_heaight;
      margin: 0 10px;
      a {
        width: 100%;
        display: flex;
        color: #000;
        justify-content: center;
        text-decoration: none;
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
      img {
        height: $navBar_heaight - 10px;
        width: $navBar_heaight - 10px;
        border-radius: 50%;
      }
    }
    .active {
      border-bottom: 2px solid #65a15f;
      color: #65a15f !important;
    }
  }
  .smillBox {
    display: none;
    .smillcontent {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .smilllogo {
        width: 60px;
        height: 60px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .smallBtn {
      margin-right: 10px;
      i {
        font-size: 24px;
      }
    }
  }
}
.drawercontent {
  border-bottom: 1px solid #e6e6e6;
  line-height: 40px;
  padding-left: 20px;
}
.activesmall {
  background-color: #65a15f;
  color: #fff !important;
}
</style>
