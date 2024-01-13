<template>
  <div class="article viewContainer">
    <div class="artbox">
      <!-- 文章盒子 -->
      <div class="articleLeft">
        <!-- 文章列表 -->
        <el-skeleton
          style="width: 100%"
          :loading="loading"
          animated
          :count="4"
        >
          <template #template>
            <div style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-bottom:20px;
            ">
              <el-skeleton-item
                variant="image"
                style="width: 250px; height: 180px"
              />
              <div style="
               flex:1; display:flex;height:180px;
               padding:20px ;
               justify-content: space-between;
               box-sizing: border-box;
               flex-direction: column">
                <div>
                  <el-skeleton-item
                    variant="h1"
                    style="width: 50%"
                  />
                  <el-skeleton-item
                    variant="text"
                    style="margin-right: 16px;width: 70%"
                  />
                </div>
                <el-skeleton-item
                  variant="h3"
                  style="width: 100%"
                />
              </div>
            </div>

          </template>
          <template #default>
            <div
              class="acticleitem"
              v-for="(item,index) in articleList"
              :key="item.id"
              :class="'animated-fade-up-' + index"
            >
              <div class="img">
                <img
                  :src="item.url"
                  alt=""
                />
              </div>
              <div class="cticleitemR_Box">
                <div class="top">
                  <p class="acticleitem_title">{{ item.name }}</p>
                  <p class="acticleitem_synopsis">{{ item.synopsis }}</p>
                </div>
                <div class="btm">
                  <div>
                    <p class="acticleitem_author"><el-icon>
                        <Position />
                      </el-icon>{{articleClassName(item.classify)  }}</p>
                    <p class="acticleitem_time"><el-icon>
                        <Clock />
                      </el-icon>{{ item.time }}</p>
                  </div>
                  <span @click="toinfo(item.id)">查看详情</span>
                </div>
              </div>
            </div>
          </template>
        </el-skeleton>

        <div class="pagination">
          <p>共{{_total}}条</p>
          <el-pagination
            layout=" prev, pager, next"
            v-model:current-page="pageobj.currentPage"
            v-model:page-size="pageobj.pageSize"
            :total="_total"
            :page-sizes="[4, 6, 8, 10]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <div class="articleRight">
        <div class="rightinfo">
          <img
            src="/images/logo.png"
            alt=""
          >
          <h2>Riven丶</h2>
        </div>
        <div class="rightmenu">
          2121123
        </div>
      </div>
    </div>
  </div>
</template>

<script setup  name="article">
import { getarticleList, getArtClass } from '@/api/index'
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
// 路由
const router = useRouter();
const loading = ref(true)
onMounted(async () => {
  await getList()
  await getClassList()
  // await nextTick(() => {
  //   gsap.utils.toArray(".acticleitem").forEach(function (elem) {
  //     hide(elem);
  //     ScrollTrigger.create({
  //       trigger: elem,
  //       onEnter: function () { animateFrom(elem) },// 当元素进入视口或某个特定区域时触发。
  //       onEnterBack: function () { animateFrom(elem, -1) }, //当元素再次进入视口或特定区域时触发（
  //       onLeave: function () { hide(elem) } // 当元素离开视口或特定区域时触发 
  //     });
  //   });
  // })
})

// 获取文章分类
const articleClassList = ref([])
const getClassList = async () => {
  try {
    let { data } = await getArtClass()
    articleClassList.value = data
  } catch (error) {
    console.log('获取文章分类失败', error);
  }
}
const articleClassName = (val) => {
  let arr = articleClassList.value.filter(item => item.id === val * 1)
  return arr.length > 0 ? arr[0].name : ''
}

// 跳转详情页
const toinfo = (id) => {
  router.push({ path: '/article/' + id })
}

// 分页切换
const pageobj = ref({
  pageSize: 10,
  currentPage: 1
})
const handleSizeChange = (val) => {
  pageobj.value.pageSize = val
  getList()
}
const handleCurrentChange = (val) => {
  pageobj.value.currentPage = val
  getList()
}

// 获取文章列表
const _total = ref(0)
let articleList = ref([])
const getList = async () => {
  try {
    let { data, total } = await getarticleList(pageobj.value)
    _total.value = total
    articleList.value = data
    loading.value = false
  } catch (error) {
    console.log('获取文章列表失败', error);
  }
}
const animateFrom = (elem, direction) => {
  direction = direction || 1;
  var x = 0,
    y = direction * 60;
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, { x: x, y: y, autoAlpha: 0 }, {
    duration: 1.2,
    x: 0,
    y: 0,
    autoAlpha: 1,
    ease: "expo",
    overwrite: "auto"
  });
}
const hide = (elem) => {
  // 元素在滚动到视图时隐藏
  gsap.set(elem, { autoAlpha: 0 });
}

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
      padding-bottom: 20px;
      min-height: 800px;
      .acticleitem {
        // opacity: 0;
        display: flex;
        padding: 15px;
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
        height: 180px;
        margin-bottom: 20px;
        transition: box-shadow 0.3s;
        border-radius: $BorderRadius;
        .img {
          width: 250px;
          height: 100%;
          overflow: hidden;
          img {
            transition: 0.6s;
            height: 100%;
            width: 100%;
          }
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
        &:hover {
          box-shadow: 1px 1px 15px 0px rgba(0, 0, 0, 0.1);
          .img img {
            transform: scale(1.2);
          }
        }
      }

      .pagination {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .articleRight {
      position: sticky;
      top: 75px;
      width: 20%;
      height: calc(100vh - 150px);
      border-radius: $BorderRadius;
      .rightinfo {
        height: 200px;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
        border-radius: $BorderRadius;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
      .rightmenu {
        height: 500px;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
        border-radius: $BorderRadius;
      }
    }
  }
}
</style>
