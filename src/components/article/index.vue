<template>
  <div class="article viewContainer">
    <div
      class="artbox"
      v-if="type"
    >
      <!-- 文章盒子 -->
      <div class="articleLeft">
        <!-- 文章列表 -->
        <div
          class="acticleitem"
          v-for="item in articleList"
          :key="item.id"
        >
          <img
            :src="item.url"
            alt=""
          />
          <div class="cticleitemR_Box">
            <div class="top">
              <p class="acticleitem_title">{{ item.name }}</p>
              <p class="acticleitem_synopsis">{{ item.synopsis }}</p>
            </div>
            <div class="btm">
              <div>
                <p class="acticleitem_author"><el-icon>
                    <Position />
                  </el-icon>{{ item.classify }}</p>
                <p class="acticleitem_time"><el-icon>
                    <Clock />
                  </el-icon>{{ item.time }}</p>
              </div>
              <span
                @click="router.push({ path: '/article/' + item.id })">查看详情</span>
            </div>
          </div>
        </div>
      </div>
      <div class="articleRight">
        123
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

  
<script setup>
import { getarticleList } from '@/api/index'
import { ref, onMounted, watch } from 'vue'

import { useRouter } from 'vue-router';
// 路由
const router = useRouter();
const type = ref('article');
watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  type.value = newValue === '/article' ? true : false;
}, { immediate: true })

let articleList = ref([])
onMounted(async () => {
  let { data } = await getarticleList()
  articleList.value = data
})
</script>

<style lang="scss" scoped>
.article {
  padding-top: 15px;
  min-height: calc(100vh - 75px);
  .artbox {
    display: flex;
    justify-content: space-between;
    .articleLeft {
      width: 78%;
      .acticleitem {
        display: flex;
        padding: 15px;
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
        height: 180px;
        margin-bottom: 20px;
        img {
          width: 250px;
          height: 100%;
        }
        .cticleitemR_Box {
          flex: 1;
          margin-left: 20px;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          .top {
            .acticleitem_title {
              font-size: 26px;
              margin-bottom: 10px;
            }
            .acticleitem_synopsis {
              color: #919191;
            }
          }
          .btm {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #595959;
            div {
              display: flex;
              i {
                margin-right: 5px;
              }
              .acticleitem_author {
                margin-right: 20px;
                display: flex;
                align-items: center;
              }
              .acticleitem_time {
                display: flex;
                align-items: center;
              }
            }
            span {
              color: #64a15e;
              cursor: pointer;
            }
          }
        }
      }
    }
    .articleRight {
      background-color: #fff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
      width: 20%;
    }
  }
}
</style>
