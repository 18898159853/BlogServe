<template>
  <!-- 备案信息 -->
  <div
    class="filinginfo"
    :style="[{background: props.isshowbg?'':'#fff'}]"
  >
    <div>
      <a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2024047255号-1</a>
      <p>
        <img
          src="/images/publicSecurity.png"
          alt=""
        >
        <a
          href="https://beian.mps.gov.cn/#/query/webSearch"
          target="blank"
        >公安备案号188888888888
        </a>
      </p>
      <a>Copyright © 2024 - 2026 | Powered by Riven</a>
    </div>
  </div>
</template>

<script setup >
import { defineProps } from 'vue';
const props = defineProps(['isshowbg'])
</script>

<style lang='scss' scoped>
.filinginfo {
  padding: 50px 0;
  display: flex;
  justify-content: center;
  text-align: center;
  a {
    text-decoration: none;
    font-size: 14px;
    color: #999aaa;
  }
  img {
    width: 16px;
    height: 16px;
  }
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 0;
  }
}
</style>
