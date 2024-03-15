<template>
  <div
    class="AppMain"
    id="AppMain"
  >
    <Navbar
      id="navbar"
      :class="isshownavbar ? 'show' : 'hide'"
    ></Navbar>
    <!-- 路由视图 -->
    <el-config-provider :locale="locale">
      <router-view v-if="isRouterAlive"></router-view>
    </el-config-provider>
    <Footer :isshowbg="isshowbg"></Footer>
    <div
      class="box"
      v-if="isshowtop"
    >
      <i
        class="iconfont icon-huojian"
        @click="toTop"
      ></i>
    </div>
  </div>
  <Audio :fileList="fileList"></Audio>

</template>
<script setup>
import Navbar from '@/view/Navbar.vue'
import Audio from "@/components/PreviewAudioModal/index.vue"
import Footer from '@/components/footer/index.vue'
import { onMounted, onBeforeUnmount, watch, provide, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
// 中英文切换
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import useUser from '@/store/user'
const useUserStore = useUser()
const switchvalue = useUserStore.switchactive;
const locale = ref(switchvalue ? null : zhCn);
const scrollTopPrev = ref(0)
const router = useRouter();
// 是否显示导航栏
const isshownavbar = ref(false)
const isshowbg = ref(false)
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
// 监听路由变化来控制滚动条的显示/隐藏
watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  isshownavbar.value = newValue !== '/' ? true : false
  isshowbg.value = newValue !== '/' ? true : false
}, { immediate: true });
// 回到顶部
const isshowtop = ref(false)
const toTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
// 滚动事件
const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  isshowtop.value = scrollTop > 800 ? true : false
  isshownavbar.value = scrollTop < scrollTopPrev.value ? true : false
  if (router.currentRoute.value.path === '/') {
    isshownavbar.value = scrollTop > window.innerHeight - 80 ? true : false
  }
  scrollTopPrev.value = scrollTop
};
// 无感刷新
const isRouterAlive = ref(true);
const reload = () => {
  const switchvalue = useUserStore.switchactive;
  locale.value = !switchvalue ? null : zhCn;
  isRouterAlive.value = false; //先关闭，
  nextTick(() => {
    isRouterAlive.value = true; //再打开
  })
}
provide('isRouterAlive', reload);

// 组件卸载前移除事件监听
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
const fileList = [
  {
    extendName: "flac",
    name: "徐佳莹-不醉不会",
    src: "http://60.205.130.133:3007/apiimg/徐佳莹-不醉不会.flac",
  },
  {
    extendName: "flac",
    name: "周深-可它爱着这个世界",
    src: "http://60.205.130.133:3007/apiimg/周深-可它爱着这个世界.flac",
  },
  {
    extendName: "flac",
    name: "周深-大鱼",
    src: "http://60.205.130.133:3007/apiimg/周深-大鱼.flac",
  },
  {
    extendName: "m4a",
    name: "周深-浮光",
    src: "http://60.205.130.133:3007/apiimg/周深-浮光.m4a",
  },
  {
    extendName: "flac",
    name: "阿梨粤-晚风心里吹",
    src: "http://60.205.130.133:3007/apiimg/阿梨粤-晚风心里吹.flac",
  },
  {
    extendName: "flac",
    name: "任素汐-胡广生",
    src: "http://60.205.130.133:3007/apiimg/任素汐-胡广生.flac",
  },
  {
    extendName: "flac",
    name: "周深-雪落下的声音",
    src: "http://60.205.130.133:3007/apiimg/周深-雪落下的声音.flac",
  }
]

</script>
<style lang="scss" scoped>
.AppMain {
  width: 100%;
  min-height: calc(100vh - $navBar_heaight);
  background: url("/src/assets/images/bg.svg") fixed;
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100%;
  .show {
    opacity: 1;
    transform: translateY(0px);
  }
  .hide {
    opacity: 1;
    transform: translateY(-65px);
  }
  .box {
    position: fixed;
    bottom: 100px;
    right: 100px;
    transition: 0.3s;
    i {
      font-size: 30px;
      cursor: pointer;
    }
    &:hover {
      color: #64a15e;
      transform: translateY(-10px);
    }
  }
}
</style>
