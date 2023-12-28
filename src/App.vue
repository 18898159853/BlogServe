<template>
  <div class="AppMain">
    <Navbar id="navbar"></Navbar>
    <!-- 路由视图 -->
    <router-view></router-view>
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter();
watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  var scrollElement = document.getElementById("navbar");
  if (newValue !== '/') {
    scrollElement.style.display = "block";
  } else if (newValue == '/' && scrollElement) {
    scrollElement.style.display = "none";
  }
}, { immediate: true })
// 滚动条事件
onMounted(() => {
  var scrollElement = document.getElementById("navbar");
  scrollElement.style.display = "none";
  window.addEventListener('scroll', handelScrollx)
})
const handelScrollx = () => {
  var scrollElement = document.getElementById("navbar");
  if (router.currentRoute.value.path == '/') {
    if (document.documentElement.scrollTop > window.innerHeight || document.body.scrollTop > window.innerHeight) {
      scrollElement.style.display = "block";
    } else {
      scrollElement.style.display = "none";
    }
  } 
}
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handelScrollx)
})

</script>
<style lang="scss" scoped>
.AppMain {
  width: 100%;
  // padding-top:  $navBar_heaight;
  background-color: #f4f4f4;
}
</style>
