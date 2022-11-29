<template>
  <div class="main">
    <div style="background:#333333;width: 100%">
      <div class="warp">
        <div class="left">
          <div @click="$router.push('/')">小米官网</div>
          <div>|</div>
          <div @click="$router.push('/shop/index')">小米商城</div>
          <div>|</div>
          <div>MIUI</div>
          <div>|</div>
          <div>IoT</div>
          <div>|</div>
          <div>云服务</div>
          <div>|</div>
          <div>天星数科</div>
          <div>|</div>
          <div>有品</div>
          <div>|</div>
          <div>小爱开放平台</div>
          <div>|</div>
          <div>企业团购</div>
          <div>|</div>
          <div>资质证照</div>
          <div>|</div>
          <div>协议规则</div>
          <div>|</div>
          <div>下载app</div>
          <div>|</div>
          <div>Select Location</div>
        </div>
        <div class="right">
          <div v-if="!userInfo.username"
               @click="$router.push({path: '/account/login' , query: {type : 'login'}})">登录
          </div>
          <div v-if="!userInfo.username"
               @click="$router.push({path: '/account/login' , query: {type : 'register'}})">注册
          </div>
          <div v-if="userInfo.username" style="width: 120px;"></div>
          <div v-if="userInfo.username" class="userInfo">
            <div style="color: #AAAAAA"><span>{{ userInfo.username }}</span><span
                class="iconfont">&#xe602;</span></div>
            <div @click="toUserCenter">个人中心</div>
            <div>评价晒单</div>
            <div @click="$router.push('/shop/userCenter/favorite')">我的喜欢</div>
            <div @click="toAccount">小米账户</div>
            <div @click="logout">退出登录</div>
          </div>
          <div>消息通知</div>
          <div v-if="userInfo.username" @click="($router.push('/shop/userCenter/orderList'))">我的订单</div>
          <div v-if="userInfo.role === 'admin'" @click="$router.push('/manageMent')">后台管理</div>
          <div class="cart" :class="[{show1 : showCart},{ haveGoods : cartNumber > 0}]"
               @mouseover="showCart = true" @mouseleave="showCart = false"><span
              class="iconfont mar-right-10">&#xe881;</span>购物车({{ cartNumber }})
          </div>
          <div :class="[{show : showCart}]" @mouseover="showCart = true" @mouseleave="showCart = false"
               style="position: absolute;box-shadow: 1px 0px 10px -4px #000;;height: 0;background:#ffffff;width: 333px;right: 0;top: 100%;z-index: 999;overflow: hidden;transition: all 0.2s linear;">
            <div style="display: flex;flex-direction: column;padding: 10px;" v-for="(item, index) of cart"
                 :key="index">
              <div style="display:flex;align-items:center;justify-content: space-between;">
                <img :src="item.attrInfo.image" alt="" width="80" height="80">
                <span
                    style="display:flex;flex-direction: column;justify-content: space-between;margin: 0 10px">
									<span style="color:#000;font-size:14px">{{ item.storeInfo.storeName }}</span>
									<span>{{ item.attrInfo.sku.substring(0, item.attrInfo.sku.length - 1) }}</span>
								</span>
                <span style="margin-left: 10px;color: #000;">{{ item.attrInfo.price }}元 x
									{{ item.cartNum }}</span>
              </div>
            </div>
            <div v-if="cart.length === 0">
              <el-empty description="你的购物车没有商品"></el-empty>
            </div>
            <div v-if="cart.length !== 0"
                 style="display:flex;justify-content: space-between;background-color: #fafafa;padding: 20px;">
              <div style="display:flex;flex-direction: column;">
                <span>共 {{ cartNumber }}件商品</span>
                <span> <b style="font-size:18px;color:#ff7800">{{ computeCartPrice }}</b> 元</span>
              </div>
              <div @click="$router.push('/shop/cart')"
                   style="display:flex;align-items:center;justify-content:center;color:#fff;background-color: #ff7800;padding: 10px;">
                去购物车结算
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CollapseTransition>
      <div v-show="isHover" class="hoverPane" @mouseover="isHover = true" @mouseleave="leave">
        <div class="paneMain">
          <div v-for="(item,index) of goodsList" :key="index" @click="toDetail(item.id)">
            <img :src="item.image" alt="">
            <span>{{ item.storeName }}</span>
            <span>{{ item.price }}元起</span>
          </div>
          {{ tabGoods }}
        </div>
      </div>
    </CollapseTransition>
    <div class="nav" @mouseleave="leave">
      <div class="left"><img src="../../assets/logo.png" alt="" width="70" @click="toIndex"
                             @mousedown="change = true" @mousemove="change = false" @mouseup="change = false"
                             :class="[{change : change}]"></div>
      <div class="center">
        <div @mouseenter="Hover('Xiaomi')">Xiaomi手机</div>
        <div @mouseenter="Hover('Redmi')">Redmi手机</div>
        <div @mouseenter="Hover('穿戴')">穿戴</div>
        <div @mouseenter="Hover('笔记本')">笔记本</div>
        <div @mouseenter="Hover('平板')">平板</div>
        <div @mouseenter="Hover('家电')">家电</div>
        <div @mouseenter="Hover('路由器')">路由器</div>
        <div>服务中心</div>
        <div>社区</div>
      </div>
      <div class="right">
        <div class="input">
          <el-input v-model="keyword">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapMutations,
  mapGetters
} from 'vuex'
import {
  getCart
} from '@/api/CartApi'
import {
  getGoods
} from '@/api/GoodsApi'
import Cookie from "js-cookie";
import {
  getUserInfo
} from '@/api/UserApi'
import 'element-ui/lib/theme-chalk/base.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

export default {
  components: {
    CollapseTransition
  },
  data() {
    return {
      fromPath: '',
      keyword: '',
      isHover: false,
      showCart: false,
      change: false,
      type: 'Xiaomi',
      goodsList: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'cart',
      'cartNumber'
    ]),
    computeCartPrice() {
      let total = 0
      this.cart.forEach(e => {
        total += e.cartNum * e.attrInfo.price
      })
      return total
    },
    tabGoods() {
      let data = {
        keyword: this.type,
        page: 1,
        size: 5,
        isDelete: 0
      }
      let list = []
      getGoods(data).then(res => {
        console.log(res, 'res')
        this.goodsList = res.obj.records
      })
    },
  },
  created() {
    if (Cookie.get('token')) {
      this.getUser()
      this.getCart()
    }
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'SET_USERINFO',
      setCart: 'SET_CART',
      setCartNumber: 'SET_CARTNUMBER'
    }),
    getCart() {
      getCart().then(res => {
        this.setCart(res.obj)
        this.setCartNumber(res.obj.length)
      })
    },
    getUser() {
      getUserInfo().then(res => {
        if (res.code === 200) {
          this.setUserInfo(res.obj)
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    toDetail(id) {
      this.$router.push({
        path: '/shop/productDetail',
        query: {
          pid: id
        }
      })
      this.$router.go(0)
    },
    Hover(type) {
      this.type = type

      this.isHover = true
    },
    toIndex() {
      this.$router.push('/')
    },
    toUserCenter() {
      let url = this.$router.resolve('/shop/userCenter/portal')
      window.open(url.href, '_blank')
    },
    toAccount() {
      let url = this.$router.resolve('/account/service/loginAndSafe')
      window.open(url.href, '_blank')
    },
    leave() {
      this.isHover = false
    },
    logout() {
      this.setUserInfo({})
      sessionStorage.clear()
      Cookie.remove('token')
      this.$message.success('退出成功')
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  position: relative;

  .hoverPane {
    width: 100%;
    height: 200px;
    box-shadow: 1px 7px 10px -10px #000;
    border-top: 1px solid #efefef;
    position: absolute;
    background: #ffffff;
    transition: all 0.3s linear;
    left: 0;
    top: 100%;
    z-index: 999;
    overflow: hidden;

    .paneMain {
      width: 1226px;
      margin: 0 auto;
      display: flex;
      height: 100%;
      box-sizing: border-box;

      div:not(:last-child) {
        border-right: 1px dashed #efefef;
      }

      div {
        flex: 1;
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        cursor: pointer;
        flex-direction: column;
        align-items: center;

        img {
          width: 100px;
          margin-bottom: 20px;
        }

        span:nth-child(3) {
          color: #ff7800;
          font-size: 12px;
        }
      }
    }
  }

  .nav {
    width: 1226px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 10px;

    .left {
      flex: 1.5;

      img {
        cursor: pointer;
        transition: all 0.1s linear;
      }
    }

    .change {
      transform: scale(0.8, 0.8) !important;
    }

    .center {
      flex: 4;
      display: flex;
      justify-content: space-between;
      height: 94px;
      line-height: 94px;

      div:hover {
        color: #ff7800;
        cursor: pointer;
      }
    }

    .right {
      margin-left: 50px;
      flex: 2;
      display: flex;
      height: 50px;

      .input {
        width: 100%;

        ::v-deep .el-input__inner {
          height: 50px;
          border-radius: 0;
        }

        ::v-deep .el-input__suffix {
          right: 0;
        }

        ::v-deep .el-input__icon {
          height: 50px;
          width: 50px;
          border-left: 1px solid #efefef;
          line-height: 50px;
          font-weight: bold;
          font-size: 20px;

          &:hover {
            background: #ff7800;
            color: #ffffff;
          }
        }
      }

    }
  }

  .warp {
    width: 1226px;
    margin: 0 auto;
    font-size: 12px;
    color: #AAAAAA;
    display: flex;
    box-sizing: border-box;

    .left {
      flex: 3;
      padding: 10px 0;
      display: flex;
      text-align: center;
      justify-content: space-between;
      align-items: center;
      margin-right: 150px;

      div:nth-child(even) {
        color: #423c37;
      }

      div:nth-child(odd):hover {
        cursor: pointer;
        color: #ffffff;
      }
    }

    .right {
      flex: 2;
      display: flex;
      text-align: center;
      justify-content: space-between;
      position: relative;
      align-items: center;

      div:hover {
        cursor: pointer;
      }

      .userInfo {
        position: absolute;
        left: 0;
        top: 0;
        width: 120px;
        text-align: center;
        height: 40px;
        display: flex;
        flex-direction: column;
        transition: all 0.2s linear;
        overflow: hidden;
        z-index: 99;

        div {
          width: 120px;
          height: 40px;
          line-height: 40px;
          color: #000000;
          z-index: 999;

          &:hover {
            color: #ff7800;
            background: #f5f5f5;
          }
        }

        &:hover {
          color: #ff7800 !important;
          height: 250px;
          line-height: 40px !important;
          color: #ff7800 !important;
          background: #ffffff;
          box-shadow: 1px 0px 10px -4px #000;
        }
      }
    }

    .cart {
      display: flex;
      align-items: center;
      background: #424242;
      height: 40px;
      width: 120px;
      font-size: 12px;
      justify-content: center;

      &:hover {
        background: #ffffff;
        color: #ff7800;
      }
    }

    .show {
      height: auto !important;;
    }

    .show1 {
      background: #fff;
    }

    .haveGoods {
      background: #ff7800;
      color: #fff;
    }
  }
}
</style>
