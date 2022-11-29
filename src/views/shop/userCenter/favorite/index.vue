<template>
  <div style="width:100%;padding:30px">
    <div style="color:#757575;font-size:30px;margin-bottom: 20px;">喜欢的商品</div>
    <div style="height: 100%;display: flex;flex-wrap: wrap;">
      <div v-for="item of productList" :key="item.id"
           @mouseenter="item.show = true" @mouseleave="item.show = false"
           style="width: 28%;height: 300px;padding: 20px;box-sizing: border-box;margin-bottom: 20px;margin-right: 30px;background: #fff;;display: flex;flex-direction: column;justify-content: center;align-items: center;cursor:pointer">
        <div><img :src="item.image" alt="" width="200" height="200"></div>
        <div style="margin-top: 20px;">{{ item.storeName }}</div>
        <dir style="color:#ff7800;margin-top: 10px;">{{ item.price }}元起</dir>
        <transition name="el-zoom-in-center">
          <div
              style="display:flex;align-items:center;margin-top:30px;width:100%;justify-content:space-between;font-size:14px"
              v-if="item.show">
            <span @click="delFavorite(item.id)"
                  style="width:47%;height:30px;line-height:30px;text-align:center;border:1px solid #efefef;color:#AAAAAA">删除</span>
            <span @click="$router.push({path:'/shop/productDetail' ,query: {pid: item.id}})"
                  style="width:47%;height:30px;line-height:30px;text-align:center;color:#fff;background:#ff7800">查看详情</span>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import {getFavorite, addFavorite} from '@/api/GoodsApi';
import 'element-ui/lib/theme-chalk/base.css';

export default {
  data() {
    return {
      productList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getFavorite().then(res => {
        console.log(res);
        this.productList = res.obj.map(e => {
          e.show = false
          return e
        })
      })
    },
    delFavorite(id) {
      addFavorite(id).then(res => {
        this.$message.success(res.msg)
        this.getList()
      })
    }
  }
}
</script>
<style lang="scss">

</style>