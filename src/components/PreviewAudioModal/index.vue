<template>
  <transition name="slide-dynamic-origin">
    <div
      class="audio-preview-wrapper"
      ref="audioRef"
      :style="audioStyle"
      v-show="visible"
    >
      <section style="padding: 10px ">
        <div
          class="head"
          ref="audioHeadRef"
        >
          <div class="name">
            <i @click="show=!show" class="iconfont icon-24px"> </i>
            <span >{{ props.fileList[audioactive]?.name }}.{{ props.fileList[audioactive]?.extendName }}</span>
          </div>
          <div
            class="close-icon"
            @click="close"
          >
           <i class="iconfont icon-guanbi"> </i>
          </div>
        </div>
        <el-collapse-transition>
              <div v-show="show" class="transition-box" >
                <div class="box_item"
                 v-for="(item,index) in fileList" :key="index"
                :style="{color:audioactive==index ?'#64A15E':'#000'}">
                 <i v-show="audioactive==index" class="icon-yinle iconfont"></i> 
                  <span @click="audioactive=index">{{ item.name }}</span>
                </div>
              </div>
        </el-collapse-transition>
        <!-- 音频组件 -->
        <audio
          class="audio"
          :src="audioSrc"
          controls
          autoplay
        ></audio>
      </section>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useDraggable, useWindowSize, useElementSize } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
const props = defineProps(["fileList"]);
const show = ref(false);
const visible = ref(false);
const audioRef = ref<HTMLElement | null>(null);
const audioHeadRef = ref<HTMLElement | null>(null);
const audioactive = ref(0);
const audioSrc = computed(() => {
  return props.fileList[audioactive.value]?.src || "";
});
onMounted(() => {
  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && ( event.key == "z" ||event.key == "Z")) {
      // 检查是否按下了Ctrl+M组合键
      visible.value = !visible.value;
    }
  });
});

const { width: windowWidth, height: windowHeight } = useWindowSize();
const { width: boxWidth, height: boxHeight } = useElementSize(audioRef);

const axis = ref({ top: 40, left: windowWidth.value - boxWidth.value });
const obj = JSON.parse(sessionStorage.getItem("AudioDialogXY") as string);
if (obj && obj.top && obj.left) {
  axis.value.top = obj.top;
  axis.value.left = obj.left;
}
const { x, y } = useDraggable(audioRef, {
  initialValue: { x: axis.value.left - boxWidth.value, y: axis.value.top },
});
const audioStyle = computed(() => {
  let left: number | string = x.value;
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
  return {
    left: left + "px",
    top: top + "px",
  };
});

const close = () => {
  visible.value = false;
  // props.onClose && props.onClose()
};
</script>

<style lang="scss" scoped>
.audio-preview-wrapper {
  width: 300px;
  position: fixed;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: linear-gradient(to right, #000, rgb(var(--primary-2)));
  z-index: 9999;
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
      > span {
        margin-left: 8px;
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