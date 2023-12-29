<template>
  <div
    class="AppMain"
    id="AppMain"
  >
    <Navbar id="navbar"></Navbar>
    <!-- 路由视图 -->
    <el-config-provider :locale="locale">
      <router-view v-if="isRouterAlive"></router-view>
    </el-config-provider>
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, watch, provide, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
// 中英文切换
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import useUser from '@/store/user'
const useUserStore = useUser()
const switchvalue = useUserStore.switchactive;
const locale = ref(switchvalue ? null : zhCn);

const router = useRouter();
const scrollElement = ref(null); // 使用ref来存储DOM元素引用
// 初始化时获取DOM元素并隐藏滚动条
onMounted(() => {
  scrollElement.value = document.getElementById("navbar");
  if (scrollElement.value) {
    scrollElement.value.style.display = "none";
  }
  window.addEventListener('scroll', handleScroll);
});

// 监听路由变化来控制滚动条的显示/隐藏
watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  if (scrollElement.value) {
    scrollElement.value.style.display = newValue !== '/' ? "block" : "none";
  }
}, { immediate: true });

// 处理滚动事件
const handleScroll = () => {
  if (router.currentRoute.value.path === '/' && scrollElement.value) {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    scrollElement.value.style.display = scrollTop > window.innerHeight ? "block" : "none";
  }
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

</script>
<style lang="scss" scoped>
.AppMain {
  width: 100%;
  // padding-top:  $navBar_heaight;
  background-color: #f4f4f4;
  #navbar {
    display: none;
    animation: identifier 0.6s;
  }
  @keyframes identifier {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
