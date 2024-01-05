<template>
  <div class="demo viewContainer">
    <div class="demoContent">
      <!-- 日历  -->
      <div class="demotitle">{{switchvalue?'CalendarView':'日历视图'}}
        <span>({{switchvalue?'Editable':'可编辑'}})</span>
      </div>
      <div class="calendar">
        <calendar></calendar>
      </div>
      <div class="demotitle">{{switchvalue?'Fireworks':'烟花'}}</div>
      <el-button
        @click="tofirework('/html/fireworks.html')">{{switchvalue?'Fireworks':'烟花'}}</el-button>
      <div class="demotitle">{{switchvalue?'FollowerSpider':'随动蜘蛛'}}</div>
      <el-button
        @click="tofirework('html/spider.html')">{{switchvalue?'FollowerSpider':'随动蜘蛛'}}</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import calendar from './components/calendar.vue'
import useUser from '@/store/user'
const useUserStore = useUser()
const switchvalue = ref(false)
switchvalue.value = useUserStore.switchactive;
const tofirework = (path) => {
  window.open(path)
}

</script>

<style lang="scss" scoped>
.demo {
  padding-top: 15px;
  .demoContent {
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
    border-radius: $BorderRadius;
    .demotitle {
      height: 60px;
      line-height: 60px;
      font-size: 28px;
      text-align: center;
      font-family: "DingTalk-JinBuTi";
      text-align: center;
      border-bottom: 2px solid #64a15e;
      span {
        font-size: 20px;
        color: #64a15e;
      }
    }
    .calendar {
      padding: 0 20px;
    }
  }
}
</style>
