<template>
  <div style="width:100%;height:100%;background:#f5f5f5;padding: 30px 0;">
    <div style="width:1226px;margin: 0 auto;background: #fff;">
      <div style="width:100%;padding-top:40px;display: flex;flex-direction: column;">
        <div style="margin-left:20px;margin-bottom: 20px;font-size: 18px;">收货地址</div>
        <div
            style="display:flex;width:100%;margin-left: 20px;flex-wrap: wrap;margin-bottom: 20px;height: 200px;overflow: hidden;"
            :class="[{ showMore: show }]">
          <div v-for="(item, index) of addressList" :key="index" @click="changeDefault(item)"
               :class="{ defaultAdd: item.isDefault === 1 }"
               style="width:23%;height:200px;border: 1px solid #AAAAAA;padding: 20px;display: flex;flex-direction: column;margin-right: 20px;margin-bottom: 20px;cursor: pointer;">
            <div style="margin-bottom: 20px;">{{ item.realName }}</div>
            <div style="margin-bottom: 5px;font-size: 14px;color: #757575;">{{ item.phone }}</div>
            <div style="margin-bottom: 5px;font-size: 14px;color: #757575;">{{
                item.province + item.city +
                item.district
              }}
            </div>
            <div style="margin-bottom: 30px;font-size: 14px;color: #757575;">{{ item.detail }}</div>
            <div style="display: flex;justify-content: space-between;">
              <div></div>
              <div @click="editAddress(item)" style="font-size:14px;color:#ff7800">修改</div>
            </div>
          </div>

          <div @click="showAddress = true"
               style="color: #757575;width:23%;height:200px;border: 1px solid #AAAAAA;padding: 20px;display: flex;align-items: center;justify-content:center;margin-right: 20px;margin-bottom: 20px;flex-direction: column;cursor: pointer;">
            <i class="el-icon-circle-plus-outline" style="font-size:30px"></i>
            添加新地址
          </div>
        </div>
        <div v-if="showMore"
             style="width:100%;background:#eeeeee;height: 50px;line-height:50px;text-align: center;cursor: pointer;margin-bottom: 20px;"
             @click="show = !show">{{ show ? '收起更多地址' : '显示更多地址' }}
        </div>
        <div style="margin-left:20px;margin-bottom: 20px;font-size: 18px;">商品</div>
        <div style="display:flex;flex-direction:column;margin-left: 20px;margin-bottom: 40px;">
          <div style="display:flex;justify-content: space-between;padding: 20px 0;border-bottom: 1px solid #e0e0e0;"
               v-for="(item, index) of cartList" :key="index">
            <div style="display:flex;align-items: center;flex: 2;">
              <img :src="item.storeInfo.image" alt="" width="30" height="30">
              <span style="margin: 0 10px;">{{ item.storeInfo.storeName }}</span>
              <span>{{ item.attrInfo.sku.substring(0, item.attrInfo.sku.length - 1) }}</span>
            </div>
            <div style="display:flex;flex: 1;">
              <span style="flex:9;">{{ item.attrInfo.price }}元 x {{ item.cartNum }}</span>
              <span style="flex:2;color: #ff7800;text-align: left;">{{
                  item.attrInfo.price * item.cartNum
                }}元</span>
            </div>
          </div>
        </div>
        <div
            style="margin-left:20px;margin-bottom: 20px;font-size: 18px;display: flex;align-items: center;border-bottom: 1px solid #e0e0e0;padding-bottom: 20px;">
          <span>配送方式</span>
          <span style="font-size:14px;color:#ff7800;margin-left:100px">包邮</span>
        </div>

        <div style="display:flex;justify-content:space-between;padding: 0 40px;">
          <div></div>
          <div style="display:flex;flex-direction:column">
            <div style="display:flex;margin-bottom:10px">
              <span style="width:100px;text-align:right;">商品件数:</span>
              <span style="width:100px;text-align:right;color: #ff7800;">{{ length }}件</span>
            </div>
            <div style="display:flex;margin-bottom:10px;align-items: center;">
              <span style="width:100px;text-align:right;">应付总额:</span>
              <span style="width:100px;text-align:right;color: #ff7800;"> <span style="font-size:25px">{{
                  totalPrice
                }}</span>元</span>
            </div>
          </div>
        </div>

        <div
            style="border-top:2px solid #e5e5e5;width:100%;padding:20px 30px;display: flex;font-size: 14px;justify-content: space-between;">
          <div style="width:60%;flex-direction: column;display: flex;">
            <span>{{ activeAddress.realName }} {{ activeAddress.phone }}</span>
            <span>{{ activeAddress.province + activeAddress.city + activeAddress.district + activeAddress.detail }} <span
                @click="editAddress(activeAddress)"
                style="margin-left:20px;color:#ff7800;text-decoration: underline;cursor: pointer;">修改</span></span>
          </div>
          <div style="width:30%;display:flex;justify-content: space-between;">
                        <span @click="$router.push('/shop/cart')"
                              style="width:160px;height:40px;line-height:40px;text-align:center;border: 1px solid #e5e5e5;color: #757575;cursor: pointer;">返回购物车</span>
            <span
                @click="confirm"
                style="width:160px;height:40px;line-height:40px;text-align:center;background-color: #ff7800;margin-left: 20px;color:#fff;cursor: pointer;">立即下单</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="添加新地址" :visible.sync="showAddress" width="30%" @close="closeAddress" center>
      <div style="width:100%;display:flex;flex-direction: column;justify-content: center;">
        <div style="display:flex;align-items:center;margin-bottom: 20px;">
          <div style="width:120px;text-align:right;margin-right: 20px;">你的姓名:</div>
          <el-input style="width:250px" v-model="realName"></el-input>
        </div>
        <div style="display:flex;align-items:center;margin-bottom: 20px;">
          <div style="width:120px;text-align:right;margin-right: 20px;">你的电话:</div>
          <el-input style="width:250px" v-model="phone"></el-input>
        </div>
        <div style="display:flex;align-items:center;margin-bottom: 20px;">
          <div style="width:120px;text-align:right;margin-right: 20px;">选择地址:</div>
          <el-cascader v-model="value" :options="cityList"
                       :props="{ expandTrigger: 'hover', value: 'label', label: 'label' }"
                       style="width:250px;margin-bottom: 20px"></el-cascader>
        </div>
        <div style="display:flex;align-items:center;margin-bottom: 20px;">
          <div style="width:120px;text-align:right;margin-right: 20px;">详细地址:</div>
          <el-input style="width:250px" v-model="detail"></el-input>
        </div>
        <div style="display:flex;align-items:center;margin-bottom: 20px;">
          <div style="width:120px;text-align:right;margin-right: 20px;"></div>
          <el-checkbox v-model="isDefault" :true-label="1" :false-label="0">设为默认地址</el-checkbox>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="showAddress = false">取 消</el-button>
                <el-button type="primary" @click="addAddress">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>
<script>
import {getOrderInfo, confirmOrder} from '@/api/Order'
import {getCity, addAddress, getAddress} from '@/api/Address'

export default {
  data() {
    return {
      cartList: [],
      show: false,
      length: 0,
      totalPrice: 0,
      cityList: [],
      showAddress: false,
      value: [],
      realName: '',
      phone: '',
      detail: '',
      isDefault: 0,
      addressList: [],
      showMore: false,
      id: '',
      activeAddress: {}
    }
  },
  created() {
    this.getCartList()
    this.getCityList()
    this.getAddressList()
  },
  methods: {
    confirm() {
      confirmOrder(this.cartList).then(res => {
        if (res.msg === '支付成功') {
          this.$message.success(res.msg)
          setTimeout(() => {
            this.$router.push('/shop/userCenter/portal')
          }, 2000)
        } else {
          this.$message.warning(res.msg)
          setTimeout(() => {
            this.$router.push('/shop/userCenter/portal')
          }, 2000)
        }

      })
    },
    closeAddress() {
      this.realName = ''
      this.phone = ''
      this.value = []
      this.detail = ''
      this.isDefault = 0
      this.id = ''
    },
    changeDefault(item) {
      let data = {
        id: item.id,
        realName: item.realName,
        phone: item.phone,
        province: item.province,
        city: item.city,
        district: item.district,
        detail: item.detail,
        isDefault: 1
      }

      addAddress(data).then(res => {
        this.getAddressList()
      })
    },
    editAddress(item) {
      this.realName = item.realName
      this.phone = item.phone
      let value = item.province + ',' + item.city + ',' + item.district
      this.value = value.split(',')
      this.detail = item.detail
      this.isDefault = item.isDefault
      this.id = item.id
      this.showAddress = true
    },
    getAddressList() {
      getAddress().then(res => {
        console.log(res);
        this.addressList = res.obj
        if (this.addressList.length >= 4) {
          this.showMore = true
        }
        this.addressList.forEach(e => {
          if (e.isDefault === 1) {
            this.activeAddress = e
          }
        })

      })
    },
    addAddress() {
      let data = {}
      if (this.id) {
        data = {
          id: this.id,
          realName: this.realName,
          phone: this.phone,
          province: this.value[0],
          city: this.value[1],
          district: this.value[2],
          detail: this.detail,
          isDefault: this.isDefault
        }
      } else {
        data = {
          realName: this.realName,
          phone: this.phone,
          province: this.value[0],
          city: this.value[1],
          district: this.value[2],
          detail: this.detail,
          isDefault: this.isDefault
        }
      }
      addAddress(data).then(res => {
        this.$message.success(res.msg)
        this.getAddressList()
        this.showAddress = false
      })
    },
    getCityList() {
      getCity().then(res => {
        this.cityList = res.obj
      })
    },
    getCartList() {
      getOrderInfo(this.$route.query.cartIds).then(res => {
        console.log(res);
        this.cartList = res.obj
        let total = 0
        res.obj.forEach(e => {
          total += e.cartNum * e.attrInfo.price
        })
        this.totalPrice = total
        this.length = res.obj.length
      })
    }
  }
}
</script>
<style lang="scss">
.showMore {
  height: auto !important;;
}

.defaultAdd {
  border: 1px solid #ff7800 !important;
}
</style>