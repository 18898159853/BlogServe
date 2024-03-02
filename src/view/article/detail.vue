<template>
  <div class="viewContainer detailBox">
    <div class="datailtopbg ">
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
      <!-- <div
        class="detail_content"
        v-highlight
        v-html="obj.content"
      ></div> -->
      <v-md-preview-html
        v-highlight
        :html="obj.content"
        preview-class="vuepress-markdown-body"
        @copy-code-success="handleCopyCodeSuccess"
      ></v-md-preview-html>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getArtCate } from '@/api/index'
const router = useRouter();
const obj = ref({});
onMounted(async () => {
  scrollTo(0, 0)
  const id = router.currentRoute.value.params.id
  let { data } = await getArtCate(id)
  obj.value = data
})
const handleCopyCodeSuccess = (res) => { console.log(res); }
</script>

<style lang='scss' scoped>
.detailBox {
  margin-top: 75px;
  border-radius: $BorderRadius;
  overflow: hidden;
}
.datailtopbg {
  // background-image: url("@/assets/images/detailbg.jpg");
  // background-size: cover;
  // background-size: 100% 100%;
  height: 450px;
  width: 100%;
  border-radius: $BorderRadius;
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
    mix-blend-mode: difference;
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
  padding: 50px 70px;
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
}
:deep(pre) {
  code {
    span {
      white-space: pre-wrap;
    }
  }
}
:deep(img) {
  width: 100%;
}
:deep(video) {
  width: 100%;
}
</style>
