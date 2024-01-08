<template>
  <div class="datailtopbg">
    <img
      :src="obj.url"
      alt=""
    >
    <div class="detail_header">
      <el-icon @click="router.go(-1)">
        <ArrowLeft />
      </el-icon>
    </div>
  </div>
  <div class="detail">
    <div class="detail_title">
      <h1>{{ obj.name }}</h1>
    </div>
    <div class="detail_time">发布时间：{{ obj.time }}</div>
    <div
      class="detail_content"
      v-html="obj.content"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getArtCate } from '@/api/index'
const router = useRouter();
const obj = ref({});
onMounted(async () => {
  const id = router.currentRoute.value.params.id
  let { data } = await getArtCate(id)
  obj.value = data
})
</script>

<style lang='scss' scoped>
.datailtopbg {
  // background-image: url("@/assets/images/detailbg.jpg");
  // background-size: cover;
  // background-size: 100% 100%;
  height: 450px;
  width: 100%;
  position: relative;
  animation: fade-up 0.5s;
  @keyframes fade-up {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  img {
    height: 100%;
    width: 100%;
  }
  .detail_header {
    position: absolute;
    top: 20px;
    left: 20px;
    i {
      font-size: 24px;
      cursor: pointer;
      color: #fff;
      border: 1px solid #fff;
      border-radius: 50%;
      padding: 3px;
    }
    margin-bottom: 20px;
  }
}
.detail {
  padding: 50px 100px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  min-height: calc(100vh - 75px);

  .detail_title {
    margin-bottom: 10px;
  }
  .detail_time {
    margin-bottom: 50px;
  }
  .detail_content {
    padding: 20px;
    background-color: #cccccc30 !important;
  }
}
:deep(pre) {
  padding: 20px;
  background-color: #cccccc30 !important;
}
</style>
