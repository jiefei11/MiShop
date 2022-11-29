<template>
  <div style="width:100%;height:100%;padding:30px">
    <div style="color:#757575;font-size:30px;margin-bottom: 20px;">收货地址</div>
    <div style="display:flex;width:100%;flex-wrap: wrap;margin-bottom: 20px;justify-content: flex-start;">
      <div @click="showAddress = true"
           style="color: #757575;width:31%;height:200px;border: 1px solid #AAAAAA;padding: 20px;display: flex;align-items: center;justify-content:center;margin-right: 20px;margin-bottom: 20px;flex-direction: column;cursor: pointer;">
        <i class="el-icon-circle-plus-outline" style="font-size:30px"></i>
        添加新地址
      </div>
      <div v-for="(item, index) of addressList" :key="index" :class="{ defaultAdd: item.isDefault === 1 }"
           style="width:31%;height:200px;border: 1px solid #AAAAAA;padding: 20px;display: flex;flex-direction: column;margin-right: 20px;margin-bottom: 20px;cursor: pointer;"
           @mouseenter="item.show = true" @mouseleave="item.show = false">
        <div style="display:flex;flex-direction:column" @click="changeDefault(item)">
          <div style="margin-bottom: 20px;">{{ item.realName }}</div>
          <div style="margin-bottom: 5px;font-size: 14px;color: #757575;">{{ item.phone }}</div>
          <div style="margin-bottom: 5px;font-size: 14px;color: #757575;">
            {{ item.province + item.city + item.district }}
          </div>
          <div style="margin-bottom: 30px;font-size: 14px;color: #757575;">{{ item.detail }}</div>
        </div>
        <div style="display: flex;justify-content: space-between;">
          <div></div>
          <div v-if="item.show" style="font-size:14px;color:#ff7800;display: flex;">
            <span @click="editAddress(item)">修改</span>
            <span @click="delAddress(item.id)" style="margin-left:20px">删除</span>
          </div>
          <div v-else></div>
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
import {getCity, addAddress, getAddress, delAddress} from '@/api/Address'

export default {
  data() {
    return {
      show: false,
      cityList: [],
      showAddress: false,
      value: [],
      realName: '',
      phone: '',
      detail: '',
      isDefault: 0,
      addressList: [],
      id: '',
    }
  },
  created() {
    this.getCityList()
    this.getAddressList()
  },
  methods: {
    delAddress(id) {
      delAddress(id).then(res => {
        this.$message.success(res.msg)
        this.getAddressList()
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
        this.addressList = res.obj.map(e => {
          e.show = false
          return e
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
  }
}
</script>
<style lang="scss">
.defaultAdd {
  border: 1px solid #ff7800 !important;
}
</style>