<template>
  <div class="Home">
    <Navbar id="navbar"></Navbar>
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
import {onMounted,onBeforeUnmount}from 'vue'
  // // 滚动条事件
  onMounted(()=>{
    window.addEventListener('scroll',handelScrollx)
  })
  const handelScrollx =()=> {
       var scrollElement = document.getElementById("navbar"); 
        if (document.documentElement.scrollTop > window.innerHeight || document.body.scrollTop > window.innerHeight ) {
          scrollElement.style.display = "block";
        } else {
          scrollElement.style.display = "none";
        }
  }
  onBeforeUnmount(()=>{
    window.removeEventListener('scroll',handelScrollx)
  })
  
</script>
<style lang="scss" scoped>
.Home{
  height: 100%;
  #navbar{
    display: none;
    animation: identifier .6s;
  }
  @keyframes identifier {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .AppBg{
    width: 100%;
    height: calc(100vh + 100px);
    background: url("@/assets/images/bg.jpg") ;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: top center;
    background-attachment: fixed;
    position: relative;
    .TextBox{
      position: absolute;
      width: 30%;
      left: 52%;
      top: 45%;
      transform: translate( -50%,-50% );
      .text {
        color: #fff;
        font-size: 30px;
        display: flex;
        justify-content:  flex-start ;
        &:first-child {
          justify-content:flex-end;
        }
      }
    }
  }
  .HomeContent{
    transform: translateY(-100px);
    background-color: #fff;
   box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
    height: 1000px;
  }
}
  </style>
