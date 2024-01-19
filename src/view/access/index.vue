<template>
  <div class="problem viewContainer">
    <div class="problemContent">
      <div class="card">
        <div class="cardimg">
          <img src="https://img.youpin.mi-img.com/ferriswheel/8f90ce66_87a4_476d_9271_ee8fd8dc37fd.jpeg?w=2000&h=1734"
            alt="">
        </div>
        <div class="cardText">这是文字</div>
      </div>
      <div class="card1">
        <div class="cardimg">
          <img src="https://img.youpin.mi-img.com/ferriswheel/8f90ce66_87a4_476d_9271_ee8fd8dc37fd.jpeg?w=2000&h=1734"
            alt="">
        </div>
        <div class="cardText">
          <div>这是文字</div>
          <div>这是文字</div>
          <div>这是文字</div>
        </div>
      </div>
      <h1>访客记录</h1>
      <div class="table_box">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="IP" width="180" align="center">
            <template #default="{ row }">
              <span>{{ row.ip.replace(/\.[0-9]+$/, ".***") }}</span>
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
            <p>共{{_total}}条</p>
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
import { ref, onMounted } from "vue";
import { getAccessInfo } from "@/api/index.js";
const tableData = ref([])
const pageobj= ref({
  currentPage:1,
  pageSize :10
})
const _total =ref(0)
const getAccessList = async () => {
  let { data,total } = await getAccessInfo(pageobj.value);
  tableData.value = data;
  _total.value=total
}
onMounted(() => {
  getAccessList();
})
const handleSizeChange = (val) => {
  pageobj.value.pageSize = val
  getAccessList()
}
const handleCurrentChange = (val) => {
  pageobj.value.currentPage = val
  getAccessList()
}
</script>

<style lang="scss" scoped>
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
      background: linear-gradient(to bottom, transparent 50%, #fe4e00 50%) center center / 100% 300px fixed;
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
