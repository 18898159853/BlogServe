<template>
  <div class="demo viewContainer">
    <div class="demoContent">
      <el-button
        type="primary"
        @click="to"
      >日历</el-button>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const to = () => {
  router.push('/demo/calendar')
}
</script>

<style lang="scss" scoped>
.demo {
  margin-top: $navBar_heaight;
  padding-top: 15px;
  .demoContent {
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
    height: 1000px;
  }
}
</style>
