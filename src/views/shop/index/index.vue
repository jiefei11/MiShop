<template>
  <div class="main">
    <div class="container">
      <div class="menuAndBanner">
        <div class="menu">
          <div style="width: 100%;height: 100%;position: relative">
            <div class="menuList" v-for="item of categoryList" :key="item.id" @mouseleave="index = 0"
                 @mouseenter="index = item.id" :class="{hover : index === item.id}">
              <span>{{ item.cateName }}</span>
              <span><i class="el-icon-caret-right"></i></span>
              <transition name="el-fade-in-linear">
                <div class="Pane" v-if="item.id === index">
                  <div style="display: flex;flex-direction: column;flex-wrap:wrap;width: 23%;height: 100%;">
                    <div style="display: flex;align-items: center;height: 20%;margin-right: 20px;"
                         @click="$router.push({path: '/shop/productDetail', query: {pid : good.id}})"
                         v-for="(good, index) of item.goods" :key="index">
                      <img :src="good.image" alt="" width="40" height="40">
                      <span
                          style="color: #000;margin-left: 20px;font-weight: bold;">{{ good.storeName }}</span>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

          </div>
        </div>
        <el-carousel trigger="click" height="460px" arrow="always">
          <el-carousel-item v-for="(item, index) of Banner" :key="index">
            <img :src="item" alt="" style="width:100%;height:100%">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="btm">
        <div class="six">
          <div>
            <div><span class="iconfont">&#xe63e;</span><span>保障服务</span></div>
            <div><span class="iconfont">&#xe729;</span><span>企业团购</span></div>
            <div><img src="../../../assets/images/F.png" style="margin-bottom: 5px;width: 24px;"
                      alt=""><span>F码通道</span></div>
          </div>
          <div>
            <div><span class="iconfont">&#xe603;</span><span>米粉卡</span></div>
            <div><span class="iconfont">&#xe639;</span><span>以旧换新</span></div>
            <div><span class="iconfont">&#xe66f; </span><span>话费充值</span></div>
          </div>
        </div>
        <div class="threeImg">
          <div @click="$router.push({ path: '/shop/productDetail', query: {pid: 11}})"><img
              src="../../../assets/images/xiaomifold2.jpg" alt=""></div>
          <div @click="$router.push({ path: '/shop/productDetail', query: {pid: 7}})"><img
              src="../../../assets/images/xiaomicivi2.jpg" alt=""></div>
          <div @click="$router.push({ path: '/shop/productDetail', query: {pid: 16}})">
            <img src="../../../assets/images/xiaomiwatchs1.jpg" alt=""></div>
        </div>
      </div>
    </div>
    <div class="product">
      <div class="list">
        <div style="height: 120px;width: 100%;cursor: pointer;"
             @click="$router.push({ path: '/shop/productDetail', query: {pid: 8}})"><img
            src="../../../assets/images/1.webp" alt="" width="100%"></div>
        <div v-for="item of categoryList" :key="item.id">
          <productList :cid="item.id" :cate-name="item.cateName">
          </productList>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {
  getCategory
} from "@/api/CategoryApi";
import productList from "./productList.vue"
import {
  getBanner
} from '@/api/Settings'
import {
  getGoods
} from "@/api/GoodsApi";
import 'element-ui/lib/theme-chalk/base.css';

export default {
  components: {
    productList
  },
  data() {
    return {
      categoryList: [],
      show: false,
      cateGoods: [],
      Banner: [],
      index: 0
    }
  },
  created() {
    this.getCategoryList()
    this.getBanner()
  },
  methods: {
    getCategoryList() {
      getCategory().then(res => {
        if (res.code === 200) {
          console.log(res)
          this.categoryList = res.obj
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    getBanner() {
      getBanner().then(res => {
        this.Banner = res.obj
      })
    }

  },
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  position: relative;

  .container {
    width: 1226px;
    margin: 0 auto;

    .menuAndBanner {
      height: 460px;
      width: 100%;
      border: 1px solid #efefef;
      position: relative;
      margin-bottom: 10px;

      .menu {
        position: absolute;
        width: 234px;
        height: 100%;
        left: 0;
        background-color: rgba(0, 0, 0, .5);
        z-index: 100;
        display: flex;
        flex-direction: column;

        div {
          .menuList {
            display: flex;
            color: #fff;
            font-size: 14px;
            z-index: 2000;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 10%;
            padding: 0 30px;
            cursor: pointer;
          }
        }

        .Pane {
          position: absolute;
          top: 1px;
          left: 234px;
          height: 100%;
          width: 992px;
          background: #fff;
          box-shadow: 1px 0px 10px -4px #000;
          opacity: 1;
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
        }

        .hover {
          background-color: #ff7800;
          color: #fff
        }

      }

      ::v-deep .el-carousel__arrow--left {
        left: 250px;
      }
    }

    .btm {
      width: 100%;
      height: 170px;
      display: flex;
      margin-bottom: 20px;

      .six {
        width: 234px;
        height: 100%;
        background: #5f5750;
        padding: 5px;
        box-sizing: border-box;

        div {
          width: 100%;
          height: 80px;
          display: flex;

          div {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #AAAAAA;

            &:hover {
              color: #fff;
              cursor: pointer;
            }

            span:nth-child(1) {
              font-size: 24px;
              margin-bottom: 5px;
            }

            span:nth-child(2) {
              font-size: 12px;
            }
          }
        }
      }

      .threeImg {
        display: flex;
        height: 100%;
        width: 992px;

        div {
          margin-left: 10px;
          flex: 1;
          border: 1px solid #efefef;
          transition: all 0.3s linear;

          &:hover {
            box-shadow: 1px 0px 10px -4px #000;
            cursor: pointer;
          }
        }
      }
    }
  }

  .product {
    width: 100%;
    background: #f5f5f5;

    .list {
      width: 1226px;
      margin: 0 auto;
      padding-top: 20px;
    }
  }
}
</style>
