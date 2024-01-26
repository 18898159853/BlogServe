<template>
  <div class="audio-preview" ref="audioRef" :style="audioStyle" v-show="visible">
    <section style="padding: 10px ">
      <div class="head">
        <div class="name">
          <i @click="show = !show" class="iconfont icon-24px"> </i>
          <span>{{ props.fileList[audioactive]?.name }}.{{ props.fileList[audioactive]?.extendName }}</span>
        </div>
        <div class="close-icon" @click="close">
          <i class="iconfont icon-guanbi"> </i>
        </div>
      </div>
      <el-collapse-transition>
        <div v-show="show" class="transition-box">
          <div class="box_item" v-for="(item, index) in fileList" :key="index"
            :style="{ color: audioactive == index ? '#64A15E' : '#000' }">
            <i v-show="audioactive == index" class="icon-yinle iconfont"></i>
            <span @click="audioactive = index; show = false">{{ item.name }}</span>
          </div>
        </div>
      </el-collapse-transition>
      <!-- 音频组件 -->
      <audio class="audio" :src="audioSrc" controls autoplay @timeupdate="updata" :volume="volume"></audio>
    </section>
    <div class="showaudio" @click="showaudio" v-if="trLeftBtn" >
      <el-icon>
        <DArrowLeft />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDraggable, useWindowSize, useElementSize } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
const props = defineProps(['fileList']);
// 显示歌曲列表
const show = ref(false);
const visible = ref(false);
const audioRef = ref<HTMLElement | null>(null);
const audioactive = ref(0);
const audioSrc = computed(() => {
  return props.fileList[audioactive.value]?.src || "";
});
onMounted(() => {
  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && (event.key == "z" || event.key == "Z")) {
      // 检查是否按下了Ctrl+z组合键
      visible.value = !visible.value;
    }
  });
});

// 获取元素的宽高 和 窗口的宽高
const { width: windowWidth, height: windowHeight } = useWindowSize();
const { width: boxWidth, height: boxHeight } = useElementSize(audioRef);

const axis = ref({ top: 40, left: windowWidth.value - boxWidth.value });
const obj = JSON.parse(sessionStorage.getItem("AudioDialogXY") as string);
if (obj && obj.top && obj.left) {
  axis.value.top = obj.top;
  axis.value.left = obj.left;
}
// 设置元素可以拖动
const { x, y } = useDraggable(audioRef, {
  initialValue: { x: axis.value.left - boxWidth.value, y: axis.value.top },
});
// 动态设置播放器的样式
const audioStyle = computed(() => {
  let left: number | string = x.value-10;
  let top: number | string = y.value;
  if (x.value > windowWidth.value - boxWidth.value) {
    left = windowWidth.value - boxWidth.value;
  }
  if (x.value < 0) {
    left = 0;
  }
  if (y.value > windowHeight.value - boxHeight.value) {
    top = windowHeight.value - boxHeight.value;
  }
  if (y.value < 0) {
    top = 0;
  }
  sessionStorage.setItem("AudioDialogXY", JSON.stringify({ top, left }));
  // 判断是否贴边
  if (left == windowWidth.value - boxWidth.value && audioRef.value) {
    audioRef.value.style.transform = "translateX(300px)";
    trLeftBtn.value = true;
  } else {
    audioRef.value ? audioRef.value.style.transform = "translate`X(-10px)" : ''
    trLeftBtn.value = false;
  }
  return {
    left: left + "px",
    top: top + "px",
  };
});
const volume = ref(.5);
// 播放器左侧的按钮
const trLeftBtn = ref(false)
// 左侧按钮点击
const showaudio = () => {
  audioRef.value ? audioRef.value.style.transform = "translateX(-10px)" : ''
  trLeftBtn.value = false
}
// 检测音频是否播放完毕
const updata = () => {
  var audio = document.querySelector("audio");
  if (audio) {
    if (audio.duration == audio.currentTime) {
      audioactive.value = props.fileList.length - 1 == audioactive.value ? 0 : audioactive.value + 1;
    }
  }
}
const close = () => {
  visible.value = false;
};
</script>

<style lang="scss" scoped>
.audio-preview {
  width: 300px;
  position: fixed;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: linear-gradient(to right, #000, rgb(var(--primary-2)));
  z-index: 9999;
  transition-property: transform;
  transition: transform .3s;

  .head {
    color: #000;
    font-size: 16px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: move;
    user-select: none;

    &:active {
      cursor: move;
    }

    .name {
      display: flex;
      align-items: center;

      >span {
        margin-left: 8px;
      }

      i {
        cursor: pointer;
      }
    }

    .close-icon {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0);
      transition: all 0.2s;
      cursor: pointer;

      svg {
        transition: all 0.2s;
      }

      &:hover {
        background: rgba(0, 0, 0, 0.1);

        svg {
          transform: scale(1.3);
        }
      }
    }
  }

  .showaudio {
    position: absolute;
    left: -40px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 40px;

    i {
      font-size: 24px;
       animation: identifierx 1.3s infinite;
    }
     @keyframes identifierx {
      0% {
        transform: translateX(0);
      }
      60% {
         transform: translateX(-20px);
      }
      100% {
        transform: translateX(0px);
      }
     }        
  }

  .transition-box {
    .box_item {
      cursor: pointer;
      margin-bottom: 5px;
    }
  }

  .audio {
    width: 100%;
    height: 30px;

    &::-webkit-media-controls-enclosure {
      background: #fff;
    }
  }
}
</style>
