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
      <div class="cInnerContent">
        <h1 class="gs_reveal ipsType_center">随拍</h1>
        <div class="features">
          <div
            class="feature ipsGrid "
            v-for="(item,index) in Photolist"
            :key="item.id"
          >
            <div
              v-if="index%2==0"
              class="featured-image-container  gs_reveal"
              :class="{'gs_reveal_fromLeft':index%2==0,'ipsGrid_span5':index%2==0 }"
            >
              <div class="card">
                <el-image
                  :hide-on-click-modal="true"
                  :preview-teleported="true"
                  :src="item.url[0]"
                  :preview-src-list="item.url"
                  :initial-index="index"
                  fit="cover"
                />
              </div>
            </div>
            <div :class="{'ipsGrid_span5':index%2==0 ,'ipsGrid_span7':index%2==1,
            'ipsType_right':index%2==1}">
              <h2 class="heading_large gs_reveal">
                <strong>{{item.title}}</strong>
              </h2>
              <p class="gs_reveal width60">
                {{
                item.content
               }}
              </p>
              <p
                class="gs_reveal width60"
                style="text-align: right; margin-top: 20px;"
              > {{item.time}}</p>
            </div>
            <div
              v-if="index%2==1"
              class="featured-image-container  gs_reveal"
              :class="{'gs_reveal_fromLeft':index%2==0,'gs_reveal_fromRight':index%2==1,
             'ipsGrid_span5':index%2==1,'ipsType_left':index%2==0}"
            >
              <div class="card">
                <el-image
                  :hide-on-click-modal="true"
                  :preview-teleported="true"
                  :src="item.url[0]"
                  :preview-src-list="item.url"
                  :initial-index="index"
                  fit="cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { somePhotolist } from '@/api/index'
gsap.registerPlugin(ScrollTrigger);

const Photolist = ref([])
const GetsomePhotolist = async () => {
  let { data } = await somePhotolist()
  data.forEach(item => {
    item.url = JSON.parse(item.url)
  })
  Photolist.value = data
}
onMounted(async () => {
  await GetsomePhotolist()
  gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
    hide(elem);
    ScrollTrigger.create({
      trigger: elem,
      onEnter: function () { animateFrom(elem) },// 当元素进入视口或某个特定区域时触发。
      onEnterBack: function () { animateFrom(elem, -1) }, //当元素再次进入视口或特定区域时触发（
      onLeave: function () { hide(elem) } // 当元素离开视口或特定区域时触发 
    });
  });
  gsap.fromTo('.AppBg',
    {
      backgroundPositionY: `-${window.innerHeight / 2}px`,
    },
    {
      backgroundPositionY: `${window.innerHeight / 2}px`,
      ease: 'none',
      scrollTrigger: {
        trigger: '.AppBg',
        scrub: true,
      }
    })
})
const animateFrom = (elem, direction) => {
  direction = direction || 1;
  var x = 0,
    y = direction * 100;
  if (elem.classList.contains("gs_reveal_fromLeft")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 100;
    y = 0;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, { x: x, y: y, autoAlpha: 0 }, {
    duration: 1.25,
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
    // background-position: top center;
    // background-attachment: fixed;
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
        // color: transparent;
        // -webkit-text-stroke: 1px #fff;
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
      bottom: 30px;
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

        50% {
          transform: translateY(0px) rotateZ(-90deg);
        }

        100% {
          transform: translateY(-20px) rotateZ(-90deg);
        }
      }
    }
  }

  .HomeContent {
    .cInnerContent {
      max-width: 1240px;
      margin-left: auto;
      margin-right: auto;
      padding-bottom: 100px;
      h1 {
        margin: 100px auto;
      }

      .feature {
        display: flex;
        align-items: center;
        margin-bottom: 30px;

        &:last-child {
          margin-bottom: 0 !important;
        }
        p {
          text-indent: 2em;
          text-align: justify;
        }
      }

      .ipsGrid {
        display: inline-block;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
      }

      .featured-image-container .card {
        padding: 10px;
      }
    }

    .ipsType_right {
      text-align: right;
      display: flex !important;
      flex-direction: column;
      align-items: flex-end;
    }
    .width60 {
      width: 60%;
    }
    .ipsType_center {
      text-align: center;
    }

    h2.heading_large {
      font-size: 1.8em;
      margin-bottom: 20px;
    }

    .ipsGrid::before,
    .ipsGrid::after {
      display: table;
      content: "";
      line-height: 0;
    }

    .ipsGrid > [class*="ipsGrid_span"] {
      display: block;
      width: 100%;
      min-height: 30px;
      box-sizing: border-box;
    }

    .ipsGrid > .ipsGrid_span5 {
      width: 40.42553191489362%;
    }

    .ipsGrid > .ipsGrid_span7 {
      width: 57.44680851063829%;
    }

    .ipsGrid > [class*="ipsGrid_span"] {
      float: left;
      margin-left: 2%;
    }

    .ipsGrid > [class*="ipsGrid_span"]:first-child {
      margin-left: 0;
    }

    .card {
      margin-bottom: 30px;
      border: 1px solid #cccccc;
      border-radius: 8px;
      overflow: hidden;
      background: #ffffff;
      box-shadow: 1px 1px 5px 1px #cccccc;
      transition: 0.3s;
    }

    img {
      max-width: 100%;
    }

    .gs_reveal {
      opacity: 0;
      visibility: hidden;
      will-change: transform, opacity;
    }
  }
}
</style>
