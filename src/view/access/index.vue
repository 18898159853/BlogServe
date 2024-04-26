<template>
    <div class="problem viewContainer">
        <div class="problemContent">
            <div id="container" style="width: 100%; height: 660px"></div>
            <div style="display: flex">
                <div class="card">
                    <div class="cardimg">
                        <img
                            src="http://60.205.130.133:3007/apiimg/孔明灯.jpeg"
                            alt=""
                        />
                    </div>
                    <div class="cardText">这是文字</div>
                </div>
                <div class="card1">
                    <div class="cardimg">
                        <img
                            src="http://60.205.130.133:3007/apiimg/孔明灯.jpeg"
                            alt=""
                        />
                    </div>
                    <div class="cardText">
                        <div>这是文字</div>
                        <div>这是文字</div>
                        <div>这是文字</div>
                    </div>
                </div>
            </div>
            <h1>访客记录</h1>
            <div class="table_box">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="IP" align="center">
                        <template #default="{ row }">
                            <span>{{
                                row.ip.replace(/\.[0-9]+$/, '.***')
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="访问位置" align="center">
                        <template #default="{ row }">
                            <span>{{ row.address }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="设备信息" align="center">
                        <template #default="{ row }">
                            <div v-html="row.equipmentinfo"></div>
                        </template>
                    </el-table-column>
                    <el-table-column label="访问时间" align="center">
                        <template #default="{ row }">
                            <div>{{ row.accesstime }}</div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination" v-if="tableData.length">
                    <p>共{{ _total }}条</p>
                    <el-pagination
                        hide-on-single-page
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
        </div>
    </div>
</template>

<script setup name="problem">
import AMapLoader from "@amap/amap-jsapi-loader";
import { ref, onMounted, onUnmounted } from "vue";
import { getAccessInfo, getIpCountLnglat } from "@/api/index.js";
const tableData = ref([])
const pageobj = ref({
  currentPage: 1,
  pageSize: 10
})
const _total = ref(0)
const getAccessList = async () => {
  let { data, total } = await getAccessInfo(pageobj.value);
  tableData.value = data;
  _total.value = total
}
const getIpCountLnglatList = async () => {
  let { data } = await getIpCountLnglat();
  data.forEach(item => {
    if (item.lnglat) {
      prjMarks.value.push({
        lnglat: JSON.parse(item.lnglat),
        address: item.address,
        count: item.count
      })
    }
  });
  initMap()
}
onMounted(() => {
  getAccessList();
  getIpCountLnglatList()
  // initMap()
})
const handleSizeChange = (val) => {
  pageobj.value.pageSize = val
  getAccessList()
}
const handleCurrentChange = (val) => {
  pageobj.value.currentPage = val
  getAccessList()
}
const prjMarks = ref([])
const map = ref(null)
const initMap = () => {
  AMapLoader.load({
    "key": "e81cf4ca8615733e1756029d5215c4d6",
    "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  }).then((AMap) => {
    // 初始化地图
    map.value = new AMap.Map('container', {
      viewMode: "3D",  //  是否为3D地图模式
      zoom: 4.3,   // 初始化地图级别
      center: [106.230977, 38.487783],
      resizeEnable: true
    });
    AMap.plugin(['AMap.ToolBar', 'AMap.MapType', 'AMap.Scale', 'AMap.ControlBar', 'AMap.Geolocation'], function () {
      map.value.clearMap();
      map.value.addControl(new AMap.ToolBar());
      map.value.addControl(new AMap.MapType());
      map.value.addControl(new AMap.Scale());
      map.value.addControl(new AMap.ControlBar());
      map.value.addControl(new AMap.Geolocation());
    })
    var infoWindow;
    var style = [
      {
        url: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        anchor: new AMap.Pixel(6, 6),
        size: new AMap.Size(25, 34),
        zIndex: 3,
      },
    ];
    var mass = new AMap.MassMarks(prjMarks.value, {
      opacity: 1,
      zIndex: 111,
      cursor: 'pointer',
      style: style,
    });
    mass.setMap(map.value);
    mass.on('mouseover', function (e) {
      infoWindow.setContent("<ul style='list-style-type: none; padding: 10px; background: #000000; border: 1px solid #ccc; border-radius: 5px; font-size: 14px;'><li style='color: #ffffff;'>" + e.data.lnglat[0] + ',' + e.data.lnglat[1] + "</li><li style='color: #ffffff;'>" + e.data.address + "</li><li style='color: #ffffff;'>" + '访问次数：' + e.data.count + "</li></ul>");
      infoWindow.open(map.value, e.data.lnglat);
    });
    mass.on('mouseout', function (e) {
      map.value.clearInfoWindow();
    });
    mass.on('click', function (e) {
      map.value.panTo(e.data.lnglat)
      // map.clearInfoWindow();
    });
    // map.setDefaultCursor("pointer");
    infoWindow = new AMap.InfoWindow({
      isCustom: true,
      draggable: true, //是否可拖动
      offset: new AMap.Pixel(10, -10),
      content: '',
    });
  }).catch(e => {
    console.log(e);
  });
}
onUnmounted(() => {
  map.value && map.value.destroy()
})
</script>

<style lang="scss" scoped>
::v-deep .amap-geolocation {
    bottom: 90px !important;
    right: 20px !important;
}
.problem {
    margin-top: $navBar_heaight;
    padding: 15px 0;

    .problemContent {
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
        border-radius: $BorderRadius;
        padding-bottom: 50px;
        .card {
            width: 300px;
            height: 300px;
            perspective: 500px;
            position: relative;

            .cardimg,
            .cardText {
                transition: 0.3s;
                position: absolute;
                left: 0;
                top: 0;
                backface-visibility: hidden;
            }

            .cardimg {
                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .cardText {
                width: 100%;
                height: 100%;
                color: #000;
                transform: rotateY(180deg);
            }

            &:hover {
                .cardimg {
                    transform: rotateY(-180deg);
                }

                .cardText {
                    transform: rotateY(0deg);
                }
            }
        }

        .card1 {
            width: 300px;
            height: 300px;
            perspective: 80rem;
            position: relative;

            .cardimg,
            .cardText {
                transition: 0.3s;
                position: absolute;
                left: 0;
                top: 0;
                backface-visibility: hidden;
            }

            .cardimg {
                transform-origin: left;
                transform: rotateY(0);
                transition: 0.35s;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .cardText {
                width: 100%;
                height: 100%;
                color: #000;
            }

            &:hover {
                .cardimg {
                    transform: rotateY(-50deg);
                    box-shadow: 2.5rem 2rem 3rem rgba(0, 0, 0, 0.1);
                    transition: 0.5s cubic-bezier(0.5, 1.5, 0.6, 1);
                }

                .cardText {
                    transform: translateX(75%);
                }
            }
        }

        h1 {
            text-align: center;
            background: linear-gradient(to bottom, #fe4e00 50%, transparent 50%)
                center center / 100% 1000px fixed;
            background-clip: text;
            color: transparent;
            -webkit-text-stroke: 1px #fe4e00;
        }
        .table_box {
            padding: 0 50px;
        }
        .pagination {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
}
</style>
