<template>
  <div class="codes viewContainer">
    <div class="codesContent">
      <div
        v-for="item in list"
        :key="item.id"
      >
        <div
          class="codesTitle"
          v-if="item.children.length"
        >
          {{ item.shareCateName }}
        </div>
        <el-row :gutter="20">
          <el-col
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="6"
            v-for="(item1,index) in item.children"
            :key="item1.id"
            :class="'animated-fade-up-' + index"
            @click="to(item1.url)"
          >
            <div class="item">
              <img
                :src="item1.logo"
                alt=""
              >
              <div class="text">
                <h3>{{item1.name}}</h3>
                <p>{{item1.text}}</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { frontEnd, backend, Blog } from './index.js'
import { onMounted, ref } from 'vue';
import { getShareList } from '@/api/index'
const list = ref([])
const getSList = async () => {
  let { data } = await getShareList()
  list.value = data
  console.log(data);
}
onMounted(() => {
  getSList()
})
const to = (url) => {
  window.open(url)
}
</script>

<style lang="scss" scoped>
.codes {
  margin-top: $navBar_heaight;
  padding-top: 15px;
  .codesContent {
    border-radius: $BorderRadius;
    padding-bottom: 50px;

    .codesTitle {
      margin: 30px 0 50px 0;
      font-size: 28px;
      text-align: center;
    }
    .el-row {
      .item {
        margin-bottom: 20px;
        height: 100px;
        padding: 10px !important;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 60px;
          height: 60px;
          margin-right: 15px;
          transition: all 0.8s;
        }
        &:nth-child(4n) {
          margin-right: 0 !important;
        }
        .text {
          h3 {
            margin-bottom: 5px;
          }
          p {
            color: #99a9bf;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        &:hover {
          background-color: #64a15e;
          // background-image: linear-gradient(to right, #fff, 50%, #64a15e);
          img {
            width: 0px;
            height: 0px;
            opacity: 0;
          }
          .text {
            width: 100%;
            // background-image: linear-gradient(to right, #64a15e, 30%, white);
            // background-clip: text;
            // -webkit-background-clip: text;
            // -webkit-text-fill-color: transparent;
            h3,
            p {
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
