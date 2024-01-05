<template>
  <div class="fullcalendar">
    <!-- 操作栏 -->
    <div class="actionBar">
      <div class="left">
        <div
          class="today"
          @click="today"
        >{{switchvalue?'today':'今天'}}</div>
        <div class="bts">
          <el-icon @click="prev">
            <ArrowLeft />
          </el-icon>
          <el-icon @click="next">
            <ArrowRight />
          </el-icon>
        </div>
        <h3>{{ title }}</h3>
      </div>
      <el-tabs
        class="right"
        v-model="TabactiveName"
      >
        <el-tab-pane
          :label="switchvalue?'day':'日'"
          name="timeGridDay"
        ></el-tab-pane>
        <el-tab-pane
          :label="switchvalue?'week':'周'"
          name="timeGridWeek"
        ></el-tab-pane>
        <el-tab-pane
          :label="switchvalue?'mouth':'月'"
          name="dayGridMonth"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <!-- 日历  -->
    <full-calendar
      ref="Calendar"
      :options="calendarOptions"
    >
      <template v-slot:eventContent="arg">
        <el-popover
          placement="bottom"
          width="350"
          trigger="click"
          transition="el-zoom-in-center"
          popper-class="popoverClass"
        >
          <template #reference>
            <div>
              <span class="title">
                <span class="status"></span>
                {{ arg.event.title }}</span>
            </div>
          </template>
          <div class="popoverBox">
            <div class="lookHeaderbts">
              <el-icon
                @click="handelEdit"
                title="编辑"
              >
                <Edit />
              </el-icon>
              <el-popconfirm
                @confirm="handelDel"
                title="确定删除这个日程吗？"
                confirm-button-text="确定"
                cancel-button-text="取消"
              >
                <template #reference>
                  <el-icon title="删除">
                    <Delete />
                  </el-icon>
                </template>
              </el-popconfirm>
              <el-icon
                title="关闭"
                @click="closepop"
              >
                <Close />
              </el-icon>
            </div>
            <h3>{{ form.title }}</h3>
            <p>{{ form.start }} <i></i> {{ form.end }}</p>
            <div class="row">
              <el-icon>
                <Refrigerator />
              </el-icon>
              <span>展厅/会议室/会议室1 （4楼）</span>
            </div>
            <div class="row">
              <el-icon title="备注">
                <Notebook />
              </el-icon>
              <span>{{ form.remarks }}</span>
            </div>
            <div class="row">
              <el-icon title="成员">
                <User />
              </el-icon>
              <div>
                <span>研发部/10位参与者 <i>8人已接受 1人待定 1人已拒绝</i>
                </span>
                <div class="imgbox">
                  <div
                    v-for="item in 12"
                    :key="item"
                    class="imgitem"
                  >
                    <img
                      src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F4d40b566-1f0a-4f8d-bc97-c513df8775b3%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1706174375&t=37f105d6df96b2a6db3911b74cbdc5fe"
                      alt=""
                    />
                    <span>名字</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="popoverBts">
              <el-button type="primary">已接受</el-button>
              <el-button>拒绝</el-button>
              <el-button>待定</el-button>
            </div>
          </div>
        </el-popover>
      </template>
    </full-calendar>
    <!--日程新增弹窗start-->
    <el-dialog
      v-model="dialogVisible"
      :before-close="close"
      :modal="false"
      :lock-scroll="false"
      class="mydialog"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleFormRef"
        hide-required-asterisk
        label-width="40px"
        class="demo-ruleForm"
      >
        <el-form-item prop="title">
          <el-input
            v-model="form.title"
            placeholder="添加主题"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="会议成员"
          prop="member"
        >
          <template #label>
            <el-icon>
              <User />
            </el-icon>
          </template>
          <el-select
            v-model="form.member"
            clearable
            filterable
            placeholder="请选择成员"
          >
            <el-option
              v-for="item in userList"
              :key="item.userId"
              :label="item.name"
              :value="item.userId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item required>
          <template #label>
            <el-icon>
              <Timer />
            </el-icon>
          </template>
          <div
            class="box"
            style="display: flex"
          >
            <el-form-item
              prop="startDate"
              style="margin-bottom: 0"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.startDate"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
            <div class="StEdtime">
              <el-form-item
                prop="startTime"
                style="margin-bottom: 0"
              >
                <el-time-select
                  placeholder="选择时间"
                  v-model="form.startTime"
                  start="00:00"
                  step="00:30"
                  end="23:30"
                  style="width: 100%"
                >
                </el-time-select>
              </el-form-item>
              ---
              <el-form-item
                prop="endTime"
                style="margin-bottom: 0"
              >
                <el-time-select
                  placeholder="选择时间"
                  v-model="form.endTime"
                  start="00:00"
                  step="00:30"
                  end="23:30"
                  :minTime="form.startTime"
                  style="width: 100%"
                ></el-time-select>
              </el-form-item>
            </div>
            <el-form-item
              prop="endDate"
              style="margin-bottom: 0"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.endDate"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item>
          <template #label>
            <el-icon>
              <Refrigerator />
            </el-icon>
          </template>
          <el-input
            type="text"
            v-model="form.remarks"
            placeholder="添加会议室"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="备注"
          prop="remarks"
        >
          <template #label>
            <el-icon title="备注">
              <Notebook />
            </el-icon>
          </template>
          <el-input
            type="text"
            placeholder="添加描述"
            :rows="1"
            v-model="form.remarks"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="
          display: flex;
          justify-content: flex-end;
          border-top: 1px solid #ccc;
          padding-top: 20px;
        ">
        <el-button @click="close">取消</el-button>
        <el-button
          type="primary"
          @click="submitForm(ruleFormRef)"
        >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, onMounted, watch, nextTick } from 'vue'
import { getcalendar, addcalendar, editcalendar, delcalendar } from '@/api/index.js'
import useUser from '@/store/user'
import Qs from "qs";
import _ from 'lodash' //导入loadsh插件
// // 引入日历组件
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid"; //日历格子显示
import timeGridPlugin from "@fullcalendar/timegrid"; //日历时间线视图
import interactionPlugin from "@fullcalendar/interaction"; //拖拽插件
const switchvalue = ref(false)
const calendarApi = ref(null)
onMounted(() => {
  getMonthList()
  calendarApi.value = Calendar.value.getApi()
  title.value = calendarApi.value.view.title;
})
// 月 周 日 切换 监听
const TabactiveName = ref('dayGridMonth')
watch(() => TabactiveName, (newValue, oldValue) => {
  switch (newValue.value) {
    case "dayGridMonth":
      calendarApi.value.changeView("dayGridMonth")
      title.value = calendarApi.value.view.title;
      break;
    case "timeGridWeek":
      calendarApi.value.changeView("timeGridWeek")
      title.value = calendarApi.value.view.title;
      break;
    case "timeGridDay":
      calendarApi.value.changeView("timeGridDay")
      title.value = calendarApi.value.view.title;
      break;
    default:
      break;
  }
}, {
  deep: true
})
// 日历配置项
const calendarOptions = ref({
  height: window.innerHeight - 110,
  plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin], //引入的插件，比如fullcalendar/daygrid，fullcalendar/timegrid引入后才可显示月，周，日
  initialDate: new Date(), // 日历第一次加载时显示的初始日期。
  initialView: "dayGridMonth", // 默认为那个视图（月：dayGridMonth，周：timeGridWeek，日：timeGridDay）
  headerToolbar: false,
  buttonText: {
    today: "今天",
    month: "月",
    week: "周",
    day: "日",
  },
  firstDay: 1, // 设置一周中显示的第一天是哪天，周日是0，周一是1，类推
  locale: "zh-cn", // 切换语言，当前为中文
  eventColor: "#FFA34E", // 全部日历日程背景色
  aspectRatio: 1.65, // 设置日历单元格宽度与高度的比例。
  displayEventTime: false, // 是否显示时间
  allDaySlot: false,
  slotLabelFormat: {
    hour: "2-digit", //numeric
    minute: "2-digit",
    meridiem: false,
    hour12: false, // 设置时间为24小时
  },
  events: [],
  eventDrop: (e) => {
    eventDrop(e)
  }, // 拖动日历日程事件
  dateClick: (e) => {
    handleDateClick(e)  // 点击事件
  },
  select: function (e) { // 日期选择事件
    handleDateSelect(e)
  },
  eventClick: function (e) { // 被选日期点击事件
    handleEventClick(e)
  },
  editable: true, // 是否可以进行（拖动、缩放）修改
  eventStartEditable: true, // Event日程开始时间可以改变，默认true，如果是false其实就是指日程块不能随意拖动，只能上下拉伸改变他的endTime
  eventDurationEditable: true, // Event日程的开始结束时间距离是否可以改变，默认true，如果是false则表示开始结束时间范围不能拉伸，只能拖拽
  selectable: true, // 是否可以选中日历格
  selectMinDistance: 0, // 选中日历格的最小距离
  dayMaxEvents: true, // 每个日历格最多显示多少个日程
  weekends: true, // 是否在任何日历视图中包括周六/周日列。
  navLinks: false, // 确定日名和周名是否可单击
  slotEventOverlap: false, // 相同时间段的多个日程视觉上是否允许重叠，默认true允许

})

// 表单绑定
const form = ref({
  title: "",
  userid: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  remarks: "", // 备注
  member: "", //成员
})
// 表单校验规则
const rules = ref({
  title: [{ required: true, message: "请输入会议主题", trigger: "blur" }],
  userId: [
    { required: true, message: "请选择会议室使用人", trigger: "change" },
  ],
  startDate: [
    { required: true, message: "请选择开始日期", trigger: "change" },
  ],
  startTime: [
    { required: true, message: "请选择开始时间", trigger: "change" },
  ],
  endDate: [
    { required: true, message: "请选择结束日期", trigger: "change" },
  ],
  endTime: [
    { required: true, message: "请选择结束时间", trigger: "change" },
  ],
  remark: [
    { required: true, message: "请填写会议备注", trigger: "blur" },
  ],
})
// 成员下拉框
const userList = ref([
  {
    userId: 1,
    name: "张三",
  },
  {
    userId: 2,
    name: "李四",
  },
  {
    userId: 3,
    name: "王五",
  },
])

// 绑定日历实例
const Calendar = ref(null)
// 日历标题
const title = ref('')
// 切换日历语言
const useUserStore = useUser()
switchvalue.value = useUserStore.switchactive;
calendarOptions.value.locale = switchvalue.value ? "en-us" : "zh-cn"


// 获取数据
const subList = ref([]) // 存储数据
const getMonthList = async () => {
  let { data } = await getcalendar()
  subList.value = data
  data.forEach((element) => {
    element.color = "rgba(100,161,94,0.15)";
    element.member = +element.member;
  });
  calendarOptions.value.events = data;
}
// 拖动事件ee
const eventDrop = async (e) => {
  let start = formatDate(e.event.start);
  let end = formatDate(e.event.end);
  let id = e.event.id;
  await editcalendar(Qs.stringify({ start, end, id }))
  getMonthList();
  ElMessage({
    message: '修改成功',
    type: 'success',
  })
}
// 点击事件
const handleDateClick = (e) => { }
// 点击日程标签事件
const handleEventClick = (e) => {
  const id = e.event.id;
  const obj = subList.value.filter((item) => item.id == id);
  nextTick(() => {
    form.value = _.cloneDeep(obj[0]); //回显数据
    getShowTime(form.value.start, form.value.end);
  });
}
// 日期选择事件
const dialogVisible = ref(false)
const handleDateSelect = (e) => {
  let start = e.start
  let date = new Date(e.end);
  date.setMinutes(date.getMinutes() - 1);  // 减去30分钟  
  let end = date.toUTCString();
  closepop()
  form.value = {
    title: "",
    userid: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    remarks: "", // 备注
    member: "", //成员
  };
  let startTime = formatDate(start);
  let endTime = formatDate(end);
  getShowTime(startTime, endTime);
  dialogVisible.value = true;
  let x = e.jsEvent.clientX
  let y = e.jsEvent.clientY
  dialogPosition(x, y)
}
// 编辑
const handelEdit = (e) => {
  closepop()
  dialogVisible.value = true;
  dialogPosition(e.clientX, e.clientY) // 设置位置
}
// 添加
const ruleFormRef = ref()
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      let obj = {
        start: `${form.value.startDate} ${form.value.startTime}`,
        end: `${form.value.endDate} ${form.value.endTime}`,
        userid: "8",
        title: form.value.title,
        remarks: form.value.remarks,
        member: form.value.member,
      }
      if (form.value.id) {
        //修改
        obj.id = form.value.id
        await editcalendar(Qs.stringify(obj))
        getMonthList();
        ElMessage({
          message: '修改成功',
          type: 'success',
        })
      } else {
        //添加
        await addcalendar(Qs.stringify(obj))
        getMonthList();
        ElMessage({
          message: '添加成功',
          type: 'success',
        })
      }
      dialogVisible.value = false;
    } else {
      console.log("error submit!!");
      return false;
    }
  });
}
//关闭弹窗，重置表单
const close = () => {
  dialogVisible.value = false;
  ruleFormRef.value.resetFields()
}
// 删除
const handelDel = async () => {
  let id = form.value.id;
  await delcalendar(Qs.stringify({ id }))
  getMonthList()
  ElMessage({
    message: '删除成功',
    type: 'success',
  })
}
// 设置弹窗位置
const dialogPosition = (x, y) => {
  //盒子 height 400 width 500
  const height = 400
  const width = 500
  let criticalwidth = window.innerWidth - width
  let criticalheight = window.innerHeight - height
  const left = x < criticalwidth ? x : x - width
  const top = y < criticalheight ? y : y - height
  nextTick(() => {
    document.querySelector(".mydialog").style.top = top + "px";
    document.querySelector(".mydialog").style.left = left + "px";
  })
}
// 全局点击  用于关闭popover
const closepop = () => { document.body.click() }

// 处理时间
const getShowTime = (beginDate, endDate) => {
  form.value.startDate = dealWithTime(beginDate);
  form.value.startTime = getHoursMin(beginDate);
  form.value.endDate = dealWithTime(endDate);
  form.value.endTime = getHoursMin(endDate);
}
// 获取时分时间
const getHoursMin = (value) => {
  return value.substring(11, 16);
}
// 处理会议时间格式
const dealWithTime = (date) => {
  let newDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec(date)[0];
  return newDate;
}
// 格式化时间
const formatDate = (inputDateString) => {
  const date = new Date(inputDateString);
  const year = date.toISOString().slice(0, 4);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}`;
}
const today = () => {
  calendarApi.value.today()
  title.value = calendarApi.value.view.title;
}
const next = () => {
  calendarApi.value.next()
  title.value = calendarApi.value.view.title;
}
const prev = () => {
  calendarApi.value.prev()
  title.value = calendarApi.value.view.title;
}
</script>

<style lang='scss' scoped>
.fullcalendar {
  .actionBar {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      color: #4e4e4e;
      .today {
        width: 66px;
        height: 40px;
        border-radius: 8px;
        border: 1px solid #d5d5d5;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        &:hover {
          background: rgba(100, 161, 94, 0.1) !important;
          color: #64a15e;
        }
      }
      .bts {
        margin: 0 30px;
        width: 70px;
        display: flex;
        justify-content: space-between;
        i {
          cursor: pointer;
          font-size: 20px;
        }
      }
      h3 {
        font-size: 18px;
        margin: 0 !important;
      }
    }
  }

  .title {
    padding-left: 10px;
    overflow: hidden;
    color: #696969;
    .status {
      height: 8px;
      width: 8px !important;
      border-radius: 50%;
      display: inline-block;
      background-color: #64a15e;
    }
  }

  .active-list,
  .room-list:hover {
    background-color: #3aa1ff;
    color: #fff;
  }
  .line {
    text-align: center;
  }
}
.popoverBox {
  .lookHeaderbts {
    display: flex;
    justify-content: flex-end;
    i {
      font-size: 20px;
      cursor: pointer;
      margin-left: 10px;
    }
  }
  h3 {
    color: #64a15e;
    font-weight: bold;
    margin: 20px 0 10px 0 !important;
  }
  p {
    color: #64a15e;
    margin: 0 !important;
    i {
      margin: 0 5px;
    }
  }
  .row {
    display: flex;
    margin: 20px 0;
    & > i {
      margin-right: 10px;
      font-size: 18px;
    }
    span {
      font-size: 12px;
      i {
        font-size: 10px;
        color: #ccc;
      }
    }
    .imgbox {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      .imgitem {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          margin: 0 10px;
        }
      }
    }
  }
  .popoverBts {
    display: flex;
    justify-content: space-around;
  }
}
</style>
