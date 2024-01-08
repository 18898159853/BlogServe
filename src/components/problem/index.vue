<template>
  <div class="problem viewContainer">
    <div class="problemContent">
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
