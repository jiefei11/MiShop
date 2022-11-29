<template>
  <div style="width:1226px;margin:0 auto;padding: 60px 0">
    <div style="display: flex">
      <div style="width:600px;height:560px;margin-right: 50px;position: relative;">
        <swiper style="position:absolute;width: 460px;height: 100%;right: 0" ref="swiperR">
          <swiper-slide v-for='(item, index) of imageArr' :key="index">
            <img :src='item' alt="">
          </swiper-slide>
        </swiper>

        <div style="width:120px;height: 100%; position: absolute;left: 0">
          <div style="height: 100%;width: 100%;position: relative">
            <div class="swiper-btn-prev"><i class="el-icon-arrow-up"></i></div>
            <div class="swiper-btn-next"><i class="el-icon-arrow-down"></i></div>
            <swiper style="height: 80%;width: 100%;" :options="options" class="swiperLeft" ref="swiperL">
              <swiper-slide v-for='(item, index) of imageArr' :key="index">
                <img :src='item' alt="" style="width: 100%;height: 100%" @click="slideTo(index)">
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
      <div style="width:576px;display: flex;flex-direction: column">
        <div style="font-size: 25px;margin-bottom: 15px">{{ storeInfo.storeName }}</div>
        <div style="font-size: 14px;margin-bottom: 15px;color: #AAAAAA">{{ storeInfo.storeInfo }}</div>
        <div style="font-size: 18px;margin-bottom: 15px;color: #ff7800">{{ skuInfo.price }}元</div>
        <div v-for="(item, index) of attrInfo" :key="index">
          <div style="margin-bottom: 15px">{{ item.privateSpecName }}</div>
          <div v-for="(spec, indexx) of item.dynamicTags" :key="indexx"
               style="display: inline-block;margin-bottom: 15px;padding: 0 15px;height: 40px;line-height:40px;text-align:center;background:#AAAAAA;margin-right: 10px;cursor: pointer;border-radius: 10px;"
               :class="[{ 'selected': spec.check }]" @click="selectPro(index, indexx)">
            <span style="white-space: nowrap;">{{ spec.attrName }}</span>
          </div>
        </div>
        <div style="margin-bottom:40px">
          <div style="margin-bottom:15px">数量:</div>
          <el-input-number v-model="num" :min="1" :max="parseInt(skuInfo.stock)"></el-input-number>
          <span style="margin-left:10px"> 剩余库存： <b style="color:#ff7800">{{ skuInfo.stock }}</b> 件</span>
        </div>
        <div style="display:flex;align-items: center;">
          <div @click="addCart"
               style="background:#ff7800;width: 300px;height: 60px;color: #ffffff;margin-right: 20px;display: flex;justify-content: center;align-items: center;cursor: pointer;">
            加入购物车
          </div>
          <div
              @click="addFavorite"
              style="background:#b0b0b0;width: 150px;height: 60px;color: #ffffff;margin-right: 20px;display: flex;justify-content: center;align-items: center;cursor: pointer;">
            <i class="iconfont" v-if="!favorite" style="font-size:20px">&#xe643;</i>
            <i class="iconfont" v-else style="font-size:30px;color: red;">&#xe613;</i>
            <span>喜欢</span>
          </div>
        </div>
      </div>
    </div>

    <div style="width:100%;margin-top: 100px;" v-html="storeInfo.description">

    </div>
  </div>
</template>
<script>
import {getProductDetail, addFavorite} from '@/api/GoodsApi'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import {addCart, getCart} from '@/api/CartApi'
import {mapMutations} from 'vuex'
import 'swiper/dist/css/swiper.css'

export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      storeInfo: {},
      attrInfo: [],
      attrValue: [],
      imageArr: [],
      options: {
        direction: 'vertical',
        slidesPerView: 3,
        centeredSlides: true,
        navigation: {
          nextEl: '.swiper-btn-next',
          prevEl: '.swiper-btn-prev',
        },
      },
      swiperR: null,
      swiperL: null,
      selectSku: [],
      skuInfo: {},
      num: 1,
      favorite: false
    }
  },
  created() {
    this.getDetail()
  },
  mounted() {
    this.$nextTick(() => {
      this.swiperR = this.$refs.swiperR.swiper
      this.swiperL = this.$refs.swiperL.swiper
      this.swiperR.controller.control = this.swiperL
      this.swiperL.controller.control = this.swiperR
    }),
        this.$router.afterEach((to, form, next) => {
          window.scrollTo(0, 0)
        })
  },
  methods: {
    ...mapMutations({
      setCart: 'SET_CART',
      setCartNumber: 'SET_CARTNUMBER'
    }),
    addFavorite() {
      addFavorite(this.$route.query.pid).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.favorite = !this.favorite
        } else {
          this.$message.error(res.msg)
        }

      })
    },
    getCart() {
      getCart().then(res => {
        this.setCart(res.obj)
        this.setCartNumber(res.obj.length)
      })
    },
    slideTo(index) {
      this.swiperL.slideTo(index, 300);
    },
    addCart() {
      addCart(this.skuInfo.unique, this.num, this.skuInfo.pid).then(res => {
        if (res.code === 200) {
          this.$message.success('成功')
          this.getCart()
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    getDetail() {
      getProductDetail(this.$route.query.pid).then(res => {
        if (res.code === 200) {
          this.storeInfo = res.obj.storeInfo
          this.imageArr = res.obj.storeInfo.imageArr.split(',')
          this.attrInfo = res.obj.attrInfo
          this.favorite = res.obj.favorite
          this.attrInfo.forEach(e => {
            let info = []
            e.dynamicTags.forEach(s => {
              let obj = {
                attrName: s,
                check: false
              }
              info.push(obj)
            })
            e.dynamicTags = info
          })

          this.attrInfo.forEach(e => {
            e.dynamicTags[0].check = true
            this.selectSku.push(e.dynamicTags[0].attrName)
          })
          this.attrValue = res.obj.attrValue
        } else {
          this.$message.warning(res.msg)
        }

      })
    },
    selectPro(index, cindex) {
      this.selectSku = []
      this.attrInfo.forEach((item, sindex) => {
        if (index === sindex) {
          item.dynamicTags.forEach(e => {
            e.check = false
          })

          item.dynamicTags[cindex].check = true
        }
      })

      this.attrInfo.forEach(item => {
        item.dynamicTags.forEach(e => {
          if (e.check) {
            this.selectSku.push(e.attrName)
          }
        })
      })
    }
  },
  watch: {
    selectSku(e) {
      let s = ''
      e.forEach(item => {
        s = s + item + ','
      })
      this.attrValue.forEach(e => {
        if (e.sku === s) {
          this.skuInfo = e
        }
      })
    }
  }
}
</script>
<style lang="scss">
.swiper-btn-prev,
.swiper-btn-next {
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: #AAAAAA;
  color: #fff;
}

.swiper-btn-prev {
  position: absolute;
  top: -50px;
  left: 44px;
}

.swiper-btn-next {
  position: absolute;
  top: inherit;
  left: 44px;
  bottom: 65px;
}

.swiperLeft .swiper-slide {
  opacity: 0.5;
}

.swiperLeft .swiper-slide-active {
  border: 1px solid $mainColor;
  box-sizing: border-box;
  opacity: 1;
}

.selected {
  background: #ff7800 !important;
  color: #ffffff;
}

.favorite {
  color: red;
}
</style>