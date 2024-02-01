<template>
  <!-- 备案信息 -->
  <div class="filinginfo">
    <div>
      <a
        href="https://beian.miit.gov.cn"
        target="blank"
      >豫ICP备1666666号</a>
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
