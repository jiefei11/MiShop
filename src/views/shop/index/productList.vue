<template>
  <div v-if="flag">
    <div style="display: flex;width: 100%;padding: 20px 0;justify-content: space-between">
      <div style="font-size: 22px">{{ cateName }}</div>
      <div class="hoverColorFF7" style="cursor: pointer">查看更多 <i class="el-icon-right"></i></div>
    </div>
    <div style="width: 100%;height: 614px;display: flex">
      <div class="hoverBoxShadow" style="width: 234px;margin-right: 10px;height: 100%;"
           @click="$router.push({ path: '/shop/productDetail', query: {pid: cover.pid}})">
        <img :src="cover.image" alt="" style="width: 100%;height: 100%">
      </div>
      <div style="width: 992px;height: 100%;display: flex;flex-wrap: wrap;">
        <div v-for="item of cateGoods" :key="item.id" class="hoverBoxShadow"
             style="width: 23%;height: 300px;padding: 20px;box-sizing: border-box;margin-bottom: 14px;margin-right: 10px;background: #fff;;display: flex;flex-direction: column;justify-content: center;align-items: center;"
             @click="$router.push({ path: '/shop/productDetail' , query: { pid: item.id}})">
          <div><img :src="item.image" alt="" width="160" height="160"></div>
          <div style="margin-top: 20px;">{{ item.storeName }}</div>
          <div
              style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: center;font-size: 12px;color: #AAAAAA;margin-top: 7px;">
            {{ item.storeInfo }}
          </div>
          <dir style="color:#ff7800;margin-top: 10px;">{{ item.price }}元起</dir>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getGoodsByCid} from '@/api/GoodsApi'

export default {
  props: ['cid', 'cateName'],
  data() {
    return {
      cateGoods: [],
      flag: false,
      cover: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getGoodsByCid(this.cid).then(res => {
        this.cateGoods = res.obj.goodsList
        this.cover = JSON.parse(res.obj.cover)
        if (res.obj.goodsList.length > 0) {
          this.flag = true
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>

</style>