<template>
  <div>
    <div style="display:flex">
      <el-input placeholder="请输入内容" v-model="keyword" style="width:300px;margin-right:20px">
        <el-button slot="append" icon="el-icon-search" @click="getProductList"></el-button>
      </el-input>
      <el-button type="primary" style="margin-right:20px" @click="$router.push('/manageMent/addGoods')">添加商品
      </el-button>
      <el-button type="danger" @click="recycle">{{ show ? '回收站' : '返回' }}</el-button>
    </div>

    <div style="width:100%;text-align:center;margin: 30px 0;font-size: 30px;">{{ show ? '全部商品' : '回收站' }}</div>
    <el-table :data="list" style="width: 100%;margin-top: 20px;">
      <el-table-column label="ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <el-image style="width: 80px; height: 80px" :src="scope.row.image" fit="fit"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <div style="display:flex;flex-direction:column;justify-content: space-around;">
            <span style="white-space: nowrap;">{{ scope.row.storeName }}</span>
            <span style="margin:10px 0"></span>
            <span style="white-space: nowrap;font-size: 12px;color: #cccccc;">{{
                scope.row.storeInfo
              }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="价格" align="center">
        <template slot-scope="scope">
          <span style="color:#ff7800;font-size:18px">￥{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.stock }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销量" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sale }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.status === 1 ? '已上架' : '已下架' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div style="display:flex" v-if="show">
            <el-button type="primary" @click="offShelf(scope.row.id)">{{
                scope.row.status === 1 ? '下架' : '上架'
              }}
            </el-button>
            <el-button type="warning" @click="del(scope.row.id)">删除</el-button>
          </div>
          <div v-else style="display:flex">
            <el-button type="warning" @click="restore(scope.row.id)" style="margin-right:10px">复原</el-button>
            <el-popconfirm title="删除后将无法找回，确定吗" @confirm="deleteCompletely(scope.row.id)">
              <el-button type="danger" slot="reference">彻底删除</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination style="margin-top:40px;float:right" @current-change="handleCurrentChange" :page-size="size"
                   background layout="total, prev, pager, next" :total="total">
    </el-pagination>
  </div>
</template>
<script>
import {getGoods, delGoods, restoreGoods, deleteCompletely, offShelf} from '@/api/GoodsApi'

export default {
  data() {
    return {
      page: 1,
      size: 5,
      keyword: '',
      list: [],
      total: 0,
      show: true
    }
  },
  created() {
    this.getProductList()
  },
  methods: {
    offShelf(id) {
      offShelf(id).then(res => {
        this.$message.success(res.msg)
        this.getProductList()
      })
    },
    deleteCompletely(id) {
      deleteCompletely(id).then(res => {
        this.$message.success('已删除')
        this.getProductList()
      })
    },
    del(id) {
      delGoods(id).then(res => {
        this.$message.success('已添加到回收站')
        this.getProductList()
      })
    },
    restore(id) {
      restoreGoods(id).then(res => {
        this.$message.success('已将商品复原')
        this.getProductList()
      })
    },
    recycle() {
      this.show = !this.show
      this.getProductList()
    },
    getProductList() {
      if (this.show) {
        let data = {
          page: this.page,
          size: this.size,
          keyword: this.keyword,
          isDelete: 0
        }
        getGoods(data).then(res => {
          console.log(res)
          this.list = res.obj.records
          this.total = res.obj.total
          this.show = true
        })
      } else {
        let data = {
          page: this.page,
          size: this.size,
          keyword: this.keyword,
          isDelete: 1
        }
        getGoods(data).then(res => {
          console.log(res)
          this.list = res.obj.records
          this.total = res.obj.total
          this.show = false
        })
      }

    },
    handleCurrentChange(val) {
      this.page = val;
      this.getProductList()
    }
  }
}
</script>
<style lang="scss" scoped>
.flex {
  white-space: nowrap;
}
</style>