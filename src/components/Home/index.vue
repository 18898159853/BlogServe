<template>
  <div class="Home">
    <div class="AppBg">
      <div class="TextBox">
        <div class="text"><span>落霞与孤鹜齐飞</span></div>
        <div class="text"><span>秋水共长天一色</span></div>
      </div>
      <div class="Tobottom">
        <el-icon @click="Tobottom">
          <DArrowLeft />
        </el-icon>
      </div>
    </div>
    <div class="HomeContent viewContainer">
      首页
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
const record = {}
onMounted(() => {
})
const Tobottom = () => {
  window.scroll({
    top: window.innerHeight - 80,
    behavior: "smooth",
  });
}


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
    animation: identifier 0.5s;
    @keyframes identifier {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    .TextBox {
      position: absolute;
      width: 40%;
      left: 50%;
      top: 35%;
      transform: translate(-50%, -50%);
      .text {
        color: #fff;
        font-size: 38px;
        font-family: cursive;
        display: flex;
        justify-content: flex-start;
        &:first-child {
          justify-content: flex-end;
        }
      }
    }
    .Tobottom {
      position: absolute;
      bottom: 130px;
      left: 50%;
      i {
        font-size: 30px;
        color: #fff;
        font-weight: bold;
        animation: identifierx 1.8s infinite;
        cursor: pointer;
      }
      @keyframes identifierx {
        0% {
          transform: translateY(-20px) rotateZ(-90deg);
        }
        80% {
          transform: translateY(0px) rotateZ(-90deg);
        }
        100% {
          transform: translateY(-20px) rotateZ(-90deg);
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
