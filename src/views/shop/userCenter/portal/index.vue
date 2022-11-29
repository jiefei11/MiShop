<template>
  <div style="width: 100%;padding: 50px">
    <div style="display: flex;border-bottom: 1px solid #efefef;padding-bottom: 40px">
      <div style="flex: 1;align-items: center;justify-content: center;box-sizing: border-box">
        <div style="display: flex;">
          <div
              style="width:160px;height: 160px;border-radius: 50%;border: 3px solid #efefef;overflow: hidden;margin-right: 20px;">
            <img :src="userInfo.avatar" alt="" width="160px">
          </div>
          <div style="display: flex;flex-direction: column;justify-content: center">
            <div style="font-size: 24px;margin-bottom: 10px">{{ userInfo.username }}</div>
            <div style="font-size: 14px;color: #B0B0B0;margin-bottom: 10px">{{ message }}</div>
            <div style="color: #ff7800;cursor: pointer;font-size: 12px"
                 @click="$router.push('/account/service/loginAndSafe')">修改个人信息>
            </div>
          </div>
        </div>
      </div>
      <div
          style="flex: 1;display: flex;flex-direction: column;box-sizing: border-box;padding-left: 70px;justify-content: center;font-size: 14px;color: #757575;">
        <div style="margin-bottom: 10px;margin-top: 20px">账户安全：<span
            style="color: #ff7800">{{ (userInfo.phone !== null && userInfo.email !== null) ? '较高' : '普通' }}</span>
        </div>
        <div style="margin-bottom: 10px">绑定手机：{{
            userInfo.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")
          }}
        </div>
        <div style="margin-bottom: 10px">绑定邮箱：{{ userInfo.email ? userInfo.email : '未绑定' }}</div>
      </div>
    </div>
    <div style="display: flex;padding: 50px 0;flex-direction: column;color: #757575">
      <div style="display: flex;margin-bottom: 60px">
        <div style="flex: 1">
          <div style="display: flex;align-items: center;">
            <div
                style="width: 100px;height: 100px;border-radius: 50%;background:#ff6709;display: flex;align-items: center;justify-content: center;margin-right: 20px">
              <span class="iconfont" style="font-size: 60px;color: white">&#xe608;</span>
            </div>
            <div style="display: flex;flex-direction: column;justify-content: center">
              <div style="font-size: 18px;margin-bottom: 5px">待支付的订单： <span style="color: #ff7800">{{
                  paymentNum
                }}</span></div>
              <div style="font-size: 14px" class="hoverColorFF7"
                   @click="$router.push({name: 'orderList',params: {status : '0'}})">查看待支付的订单<i
                  class="el-icon-arrow-right"></i></div>
            </div>
          </div>
        </div>
        <div style="flex: 1">
          <div style="display: flex;align-items: center;">
            <div
                style="width: 100px;height: 100px;border-radius: 50%;background:#8bc34a;display: flex;align-items: center;justify-content: center;margin-right: 20px">
              <span class="iconfont" style="font-size: 60px;color: white">&#xe7a2;</span>
            </div>
            <div style="display: flex;flex-direction: column;justify-content: center">
              <div style="font-size: 18px;margin-bottom: 5px">待收获的订单： <span style="color: #ff7800">{{
                  ReceiptNum
                }}</span></div>
              <div style="font-size: 14px" class="hoverColorFF7"
                   @click="$router.push({name: 'orderList',params: {status : '1'}})">查看待收获的订单<i
                  class="el-icon-arrow-right"></i></div>
            </div>
          </div>
        </div>
      </div>
      <div style="display: flex">
        <div style="flex: 1">
          <div style="display: flex;align-items: center;">
            <div
                style="width: 100px;height: 100px;border-radius: 50%;background:#2196f3;display: flex;align-items: center;justify-content: center;margin-right: 20px">
              <span class="iconfont" style="font-size: 60px;color: white">&#xe607;</span>
            </div>
            <div style="display: flex;flex-direction: column;justify-content: center">
              <div style="font-size: 18px;margin-bottom: 5px">待评价商品数： <span style="color: #ff7800">0</span></div>
              <div style="font-size: 14px" class="hoverColorFF7">查看待评价商品<i class="el-icon-arrow-right"></i></div>
            </div>
          </div>
        </div>
        <div style="flex: 1">
          <div style="display: flex;align-items: center;">
            <div
                style="width: 100px;height: 100px;border-radius: 50%;background:#ffab00;display: flex;align-items: center;justify-content: center;margin-right: 20px">
              <span class="iconfont" style="font-size: 60px;color: white">&#xe643;</span>
            </div>
            <div style="display: flex;flex-direction: column;justify-content: center">
              <div style="font-size: 18px;margin-bottom: 5px">喜欢的商品： <span style="color: #ff7800">{{
                  favoriteNum
                }}</span></div>
              <div style="font-size: 14px" class="hoverColorFF7" @click="$router.push('/shop/userCenter/favorite')">
                查看喜欢的商品<i class="el-icon-arrow-right"></i></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {getOrderList} from '@/api/Order'
import {getFavorite} from '@/api/GoodsApi'

export default {
  name: "index",
  data() {
    return {
      message: '',
      favoriteNum: 0,
      paymentNum: 0,
      ReceiptNum: 0
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    getNum() {
      getFavorite().then(res => {
        this.favoriteNum = res.obj.length
      })
      getOrderList(0, 1, 1).then(res => {
        this.paymentNum = res.obj.total
      })
      getOrderList(1, 1, 1).then(res => {
        this.ReceiptNum = res.obj.total
      })
    }
  },
  created() {
    let hour = new Date().getHours();
    if (hour <= 10) {
      this.message = '早上好~'
    } else if (hour > 10 && hour < 14) {
      this.message = '中午好~'
    } else if (hour > 14 && hour < 18) {
      this.message = '下午好~'
    } else {
      this.message = '晚上好~'
    }
    this.getNum()
  }
}
</script>

<style scoped lang="scss">
.hoverColorFF7 {
  &:hover {
    color: #ff7800 !important;
    cursor: pointer;
  }
}
</style>