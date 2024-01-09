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
        <h1 class="gs_reveal ipsType_center">xiaomi摄影大赛</h1>
        <div class="features">
          <div class="feature ipsGrid ">
            <div
              class="featured-image-container ipsGrid_span5 gs_reveal gs_reveal_fromLeft"
            >
              <div class="card">
                <img
                  width="479"
                  src="https://img.youpin.mi-img.com/ferriswheel/3713c7a9_29a6_4fec_8310_736dcaf414d6.jpeg?w=1601&h=1200"
                  alt=""
                >
              </div>
            </div>

            <div class="ipsGrid_span7 ">
              <h2 class="heading_large gs_reveal">
                <strong>雾隐魔都</strong>
              </h2>
              <p class="gs_reveal">
                2023年上海大雾，黄浦江雾气久久不散， <br>
                "魔都"在此刻名副其实，从外滩观景廊望向陆家嘴，<br>
                东方明珠在空中若隐若现，宛如奇观。<br>
              </p>
              <p
                class="gs_reveal"
                style="text-align: right; margin-top: 20px;"
              > ------某年度好学长
                由Xiaomi 13 Pro拍摄</p>
            </div>
          </div>
          <div
            class="feature ipsSpacer_bottom_double ipsGrid ipsGrid_collapsePhone"
          >
            <div class="ipsGrid_span7 ipsType_right">
              <h2 class="heading_large gs_reveal">
                回家
              </h2>

              <p class="gs_reveal">
                看到“家”这个辞条主题时，<br>
                立马就想到了年初去云南旅行在路上拍到的这张图：<br>
                一只乌鸦衔着食物在天上飞，看上去像是要回家去喂孩子。
              </p>
              <p
                class="gs_reveal"
                style="text-align: right; margin-top: 20px;"
              > ------张骁
                由Xiaomi 13 Pro拍摄</p>
            </div>

            <div
              class="featured-image-container ipsGrid_span5 gs_reveal gs_reveal_fromRight"
            >
              <div class="card">
                <img
                  width="479"
                  src="https://img.youpin.mi-img.com/ferriswheel/de6d46b8_533b_4e70_bc36_3c130a75ba4c.jpeg?w=2000&h=1503"
                  alt=""
                >
              </div>
            </div>
          </div>
          <div
            class="feature ipsSpacer_bottom_double ipsGrid ipsGrid_collapsePhone"
          >
            <div
              class="featured-image-container ipsGrid_span5 gs_reveal gs_reveal_fromLeft"
            >
              <div class="card">
                <img
                  width="479"
                  src="https://img.youpin.mi-img.com/ferriswheel/e0bf9a15_212a_4d36_9e42_f0a2b6f50f7b.jpeg?w=2670&h=1200"
                  alt=""
                >
              </div>
            </div>

            <div class="ipsGrid_span7 ipsType_left">
              <h2 class="heading_large gs_reveal">
                <strong>放飞</strong>
              </h2>
              <p class="gs_reveal">
                周末陪女儿在郊外放风筝，傍晚的夕阳衬托着人物的轮廓，逆光的光影美轮美奂。
              </p>
              <p
                class="gs_reveal"
                style="text-align: right; margin-top: 20px;"
              > ------拾破烂的老头
                由Xiaomi 12S Ultra拍摄</p>
            </div>
          </div>

          <div
            class="feature ipsSpacer_bottom_double ipsGrid ipsGrid_collapsePhone"
          >
            <div class="ipsGrid_span7 ipsType_right">
              <h2 class="heading_large gs_reveal"><strong>孔明灯</strong>
              </h2>
              <p class="gs_reveal">
                在宁静的夜晚，天空中的星星闪烁着微弱的光芒。<br>
                此刻，一群人聚集在一起，他们的目光都聚焦在手中的孔明灯上。<br>
                孔明灯在人们手中传递，仿佛是一份温暖的祝福，传递着希望和美好的愿望。<br>
                当孔明灯缓缓升空时，人们仰望着它，脸上洋溢着幸福的笑容。<br>
                感受着那份美好的氛围和宁静的幸福。<br>
              </p>
              <p
                class="gs_reveal"
                style="text-align: right; margin-top: 20px;"
              > ------Joe摄影
                由Xiaomi 13 Pro拍摄</p>
            </div>

            <div
              class="featured-image-container ipsGrid_span5 gs_reveal gs_reveal_fromRight"
            >
              <div class="card">
                <img
                  width="479"
                  src="https://img.youpin.mi-img.com/ferriswheel/8f90ce66_87a4_476d_9271_ee8fd8dc37fd.jpeg?w=2000&h=1734"
                  alt=""
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
onMounted(() => {
  gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
    hide(elem);
    ScrollTrigger.create({
      trigger: elem,
      // markers: true,
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
        color: transparent;
        font-size: 38px;
        font-family: cursive;
        display: flex;
        justify-content: flex-start;
        &:first-child {
          justify-content: flex-end;
        }
        -webkit-text-stroke: 1px #fff;
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
    .cInnerContent {
      max-width: 1240px;
      margin-left: auto;
      margin-right: auto;
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
    }

    .ipsType_center {
      text-align: center;
    }
    h2.heading_large {
      font-size: 1.8em;
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
