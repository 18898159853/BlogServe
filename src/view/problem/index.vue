<template>
  <div class="problem viewContainer">
    <div class="problemContent">
      <div class="card">
        <div class="cardimg">
          <img
            src="https://img.youpin.mi-img.com/ferriswheel/8f90ce66_87a4_476d_9271_ee8fd8dc37fd.jpeg?w=2000&h=1734"
            alt=""
          >
        </div>
        <div class="cardText">这是文字</div>
      </div>
      <div class="card1">
        <div class="cardimg">
          <img
            src="https://img.youpin.mi-img.com/ferriswheel/8f90ce66_87a4_476d_9271_ee8fd8dc37fd.jpeg?w=2000&h=1734"
            alt=""
          >
        </div>
        <div class="cardText">
          <div>这是文字</div>
          <div>这是文字</div>
          <div>这是文字</div>
        </div>
      </div>
      <h1>Hello,word</h1>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.problem {
  margin-top: $navBar_heaight;
  padding-top: 15px;
  .problemContent {
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
    border-radius: $BorderRadius;
    height: 1000px;
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
        color: #000;
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
    .card1 {
      width: 300px;
      height: 300px;
      perspective: 80rem;
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
        transform-origin: left;
        transform:  rotateY(0);
        transition: 0.35s;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cardText {
        width: 100%;
        height: 100%;
        color: #000;
      }
      &:hover {
        .cardimg {
          transform:  rotateY(-50deg);
          box-shadow: 2.5rem 2rem 3rem rgba(0, 0, 0, 0.1);
          transition: 0.5s cubic-bezier(0.5, 1.5, 0.6, 1);
        }

        .cardText {
          transform: translateX(75%);
        }
      }
    }
    h1 {
      text-align: center;
      background: linear-gradient(to bottom, transparent 50%, #fe4e00 50%)
        center center / 100% 300px fixed;
      background-clip: text;
      color: transparent;
      -webkit-text-stroke: 1px #fe4e00;
    }
  }
}
</style>
