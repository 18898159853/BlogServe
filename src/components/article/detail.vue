<template>
  <div class="detail">
    <div class="detail_header">
      <el-icon @click="router.go(-1)">
        <ArrowLeft />
      </el-icon>
    </div>
    <div class="detail_title">
      <h1>{{ obj.name }}</h1>
    </div>
    <div class="detail_time">发布时间：{{ obj.time }}</div>
    <!-- <div class="detail_synopsis">{{ obj.synopsis }}</div>
    <div class="detail_classify">{{ obj.classify }}</div> -->
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
  // 打印
  console.log(router.currentRoute.value.params.id)
  let { data } = await getArtCate(router.currentRoute.value.params.id)
  obj.value = data
})
</script>

<style lang='scss' scoped>
.detail {
  padding: 50px 100px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  min-height: calc(100vh - 75px);
  position: relative;
  .detail_header {
    position: absolute;
    top: 20px;
    left: 20px;
    i {
      font-size: 30px;
      cursor: pointer;
    }
    margin-bottom: 20px;
  }
  .detail_title {
    margin-bottom: 10px;
  }
  .detail_time {
    margin-bottom: 50px;
  }
}
:deep(pre) {
  background-color: #cccccc30 !important;
}
</style>
