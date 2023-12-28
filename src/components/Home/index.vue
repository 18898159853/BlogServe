<template>
  <div class="Home">
    <div class="AppBg">
      <div class="TextBox">
        <div class="text"><span>落霞与孤鹜齐飞</span></div>
        <div class="text"><span>秋水共长天一色</span></div>
      </div>
    </div>
    <div class="HomeContent viewContainer">
      首页
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
})


</script>
<style lang="scss" scoped>
.Home {
  height: 100%;
  .AppBg {
    width: 100%;
    height: calc(100vh + 100px);
    background: url("@/assets/images/bg.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: top center;
    background-attachment: fixed;
    position: relative;
    .TextBox {
      position: absolute;
      width: 30%;
      left: 52%;
      top: 45%;
      transform: translate(-50%, -50%);
      .text {
        color: #fff;
        font-size: 30px;
        display: flex;
        justify-content: flex-start;
        &:first-child {
          justify-content: flex-end;
        }
      }
    }
  }
  .HomeContent {
    transform: translateY(-100px);
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
    height: 1000px;
  }
}
</style>
