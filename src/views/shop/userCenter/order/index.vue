<template>
  <div style="width:100%;height:100%;padding:50px;">
    <div style="color:#757575;font-size:30px;margin-bottom: 20px;">我的订单</div>
    <div style="display:flex;margin-top:30px;width:50%;justify-content:space-between;color:#757575;">
      <div :class="{active: status === ''}" @click="tabClick('')" style="cursor:pointer">全部有效订单</div>
      <div style="width:1px;height:20px;background:#e5e5e5"></div>
      <div :class="{active: status === '0'}" @click="tabClick('0')" style="cursor:pointer">待支付</div>
      <div style="width:1px;height:20px;background:#e5e5e5"></div>
      <div :class="{active: status === '1'}" @click="tabClick('1')" style="cursor:pointer">待收货</div>
      <div style="width:1px;height:20px;background:#e5e5e5"></div>
      <div :class="{active: status === '5'}" @click="tabClick('5')" style="cursor:pointer">订单回收站</div>
    </div>
    <div v-if="orderList.length !== 0" style="margin-top:20px;border:1px solid #efefef"
         v-for="(item, index) of orderList" :key="index" @mouseenter="item.show = true" @mouseleave="item.show = false">
      <div style="display:flex;padding:20px;border-bottom:1px solid #e5e5e5;flex-direction:column;position:relative">
        <div v-if="item.show" style="position:absolute;display:flex;right:10px;top:10px">
          <span v-if="item.status === 0 && status !== '5'"
                style="cursor:pointer;color:#ff7800;text-decoration: underline;"
                @click="payment(item.orderId)">支付</span>
          <span v-if="item.status === 0"
                style="margin-left:20px;cursor:pointer;color:#ff7800;text-decoration: underline;"
                @click="delOrder(item.orderId)">删除</span>
          <span v-if="status === '5'" style="margin-left:20px;cursor:pointer;color:#ff7800;text-decoration: underline;"
                @click="delOrder(item.orderId)">彻底删除</span>
        </div>
        <div v-if="item.status === 0" style="font-size:18px;color:#B0B0B0;margin-bottom:15px">待支付</div>
        <div v-if="item.status === 1" style="font-size:18px;color:#B0B0B0;margin-bottom:15px">待收货</div>
        <div v-if="item.status === 2" style="font-size:18px;color:#B0B0B0;margin-bottom:15px">已收货</div>
        <div style="display:flex;justify-content:space-between;">
          <div style="flex:7;display:flex;align-items:center;font-size:14px;color:#757575;height:30px;margin-top:9px">
            <div>{{ item.createTime }}</div>
            <div style="width:1px;height:14px;background:#e5e5e5;margin: 0 5px"></div>
            <div>{{ item.realName }}</div>
            <div style="width:1px;height:14px;background:#e5e5e5;margin: 0 5px"></div>
            <div>订单号：{{ item.orderId }}</div>
          </div>
          <div style="flex:3;font-size:14px;color:#757575;text-align:right;height:30px">
            <div v-if="item.status === 1">实付金额：<span
                style="font-size:28px;color:#333333;white-space:nowrap">{{ item.totalPrice }}</span>元
            </div>
            <div v-if="item.status === 0">待付金额：<span
                style="font-size:28px;color:#333333;white-space:nowrap">{{ item.totalPrice }}</span>元
            </div>
          </div>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;padding:20px">
        <div style="flex:7;display:flex;flex-direction:column;flex-wrap:wrap">
          <div style="display:flex;align-items:center;font-size:14px;color:#333333;width:100%"
               v-for="(attr, indexx) of item.attrInfo" :key="indexx">
            <div><img :src="attr.image" alt="" width="80" height="80"></div>
            <div style="display:flex;flex-direction:column;justify-content:space-between;margin-left:30px">
              <div>{{ attr.storeInfo.storeName }} {{ attr.sku.substring(0, attr.sku.length - 1) }}</div>
              <div>{{ attr.price }}元 x {{ attr.cartNum }}</div>
            </div>
          </div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;font-size:12px;color:#757575">
          <div
              style="width:120px;height:30px;line-height:30px;text-align:center;border:1px solid #b0b0b0;cursor:pointer">
            订单详情
          </div>
          <div v-if="status !== '5'"
               style="width:120px;height:30px;line-height:30px;text-align:center;border:1px solid #b0b0b0;cursor:pointer;margin:10px 0">
            申请售后
          </div>
          <div v-else @click="restoreOrder(item.orderId)"
               style="width:120px;height:30px;line-height:30px;text-align:center;border:1px solid #b0b0b0;cursor:pointer;margin:10px 0">
            还原订单
          </div>
          <div
              style="width:120px;height:30px;line-height:30px;text-align:center;border:1px solid #b0b0b0;cursor:pointer">
            联系客服
          </div>
        </div>
      </div>
    </div>
    <div v-if="orderList.length === 0"
         style="width:100%;height:80%;display:flex;align-items:center;justify-content:center">
      <el-empty description="当前没有订单" :image-size="300"></el-empty>
    </div>
    <el-pagination
        @current-change="handleCurrentChange"
        :page-size="size"
        layout="total, prev, pager, next"
        :total="total"
        background
        :hide-on-single-page="value"
        style="text-align:center;width:100%;margin-top:20px">
    </el-pagination>
  </div>
</template>
<script>
import {getOrderList, delOrder, restoreOrder, payment} from '@/api/Order'

export default {
  data() {
    return {
      status: '',
      orderList: [],
      page: 1,
      size: 2,
      total: 0,
      value: true
    }
  },
  created() {
    if (this.$route.params.status) {
      this.status = this.$route.params.status
    }
    this.getOrderList()
  },
  methods: {
    payment(orderId) {
      payment(orderId).then(res => {
        this.$message.success(res.msg)
        this.getOrderList()
      })
    },
    getOrderList() {
      getOrderList(this.status, this.size, this.page).then(res => {
        console.log(res);
        this.orderList = res.obj.records.map(e => {
          e.show = false
          return e
        })
        this.total = res.obj.total
        this.value = res.obj.pages <= 1 ? true : false
      })
    },
    delOrder(orderId) {
      delOrder(orderId).then(res => {
        if (this.status === '5') {
          this.$message.success('已将订单彻底删除')
        } else {
          this.$message.success('已将订单移至回收站')
        }
        this.getOrderList()
      })
    },
    restoreOrder(orderId) {
      restoreOrder(orderId).then(res => {
        this.$message.success('已还原订单')
        this.getOrderList()
      })
    },
    tabClick(status) {
      this.status = status
      this.page = 1
      this.getOrderList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getOrderList()
    }
  }
}
</script>
<style lang="scss">
.test {
  justify-content: space-between;

}

.active {
  color: #ff7800;
}
</style>