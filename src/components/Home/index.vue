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
    <div class="HomeContent ">
      <div class="card">
        <div class="cardimg">
          <img
            src="/images/ant.svg"
            alt=""
          >
        </div>
        <div class="cardText">这是文字</div>
      </div>
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
    top: window.innerHeight - 60,
    behavior: "smooth",
  });
}


</script>
<style lang="scss" scoped>
.Home {
  height: 100%;
  background-color: #fff;
  .AppBg {
    width: 100%;
    height: 100vh;
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
      transform: translateX(-50%);
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
    // transform: translateY(-95px);
    height: 1000px;
    background-color: #fff;
    border-radius: $BorderRadius;
    // box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
    .card {
      width: 300px;
      height: 300px;
      perspective: 500px;
      position: relative;
      .cardimg,
      .cardText {
        transition: 0.3s;
        position: absolute;
        left: 0;
        top: 0;
        backface-visibility: hidden;
      }
      .cardimg {
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cardText {
        width: 100%;
        height: 100%;
        background: #000;
        color: #fff;
        transform: rotateY(180deg);
      }
      &:hover {
        .cardimg {
          transform: rotateY(-180deg);
        }
        .cardText {
          transform: rotateY(0deg);
        }
      }
    }
  }
}
</style>
