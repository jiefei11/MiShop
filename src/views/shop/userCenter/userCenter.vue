<template>
  <div class="main">
    <div class="center">
      <div style="display: flex;align-items: center;padding: 10px 0;font-size: 12px">
        <span class="hoverColorFF7" @click="$router.push('/')">首页</span>
        <span style="margin: 0 10px">/</span>
        <span>{{ $route.meta.title }}</span>
      </div>
      <div style="display: flex;">
        <div style="flex: 1;background:#fff;margin-right: 20px;padding: 50px 40px;">
          <div style="display: flex;flex-direction: column;">
            <div style="margin-bottom: 50px;display: flex;flex-direction: column">
              <div style="font-size: 16px;margin-bottom: 25px">订单中心</div>
              <div :class="[{red : $route.path === '/shop/userCenter/orderList'}]"
                   @click="$router.push('/shop/userCenter/orderList')" class="black"
                   style="font-size: 14px;color: #757575;margin-bottom: 12px">我的订单
              </div>
              <div class="black" style="font-size: 14px;color: #757575;margin-bottom: 12px">评价订单</div>
              <div class="black" style="font-size: 14px;color: #757575;margin-bottom: 12px">话费充值订单</div>
              <div class="black" style="font-size: 14px;color: #757575;margin-bottom: 12px">以旧换新订单</div>
            </div>
            <div style="margin-bottom: 50px;display: flex;flex-direction: column">
              <div style="font-size: 16px;margin-bottom: 25px">个人中心</div>
              <div :class="[{red : $route.path === '/shop/userCenter/portal'}]"
                   @click="$router.push('/shop/userCenter/portal')" class="black"
                   style="font-size: 14px;color: #757575;margin-bottom: 12px">我的个人中心
              </div>
              <div class="black" style="font-size: 14px;color: #757575;margin-bottom: 12px">消息通知</div>
              <div class="black" style="font-size: 14px;color: #757575;margin-bottom: 12px">购买资格</div>
              <div class="black" style="font-size: 14px;color: #757575;margin-bottom: 12px">现金账户</div>
              <div class="black" style="font-size: 14px;color: #757575;margin-bottom: 12px">小米礼品卡</div>
              <div class="black" style="font-size: 14px;color: #757575;margin-bottom: 12px">现金券</div>
              <div :class="[{red : $route.path === '/shop/userCenter/favorite'}]"
                   @click="$router.push('/shop/userCenter/favorite')" class="black"
                   style="font-size: 14px;color: #757575;margin-bottom: 12px">喜欢的商品
              </div>
              <div class="black" style="font-size: 14px;color: #757575;margin-bottom: 12px">优惠券</div>
              <div :class="[{red : $route.path === '/shop/userCenter/address'}]"
                   @click="$router.push('/shop/userCenter/address')" class="black"
                   style="font-size: 14px;color: #757575;margin-bottom: 12px">收货地址
              </div>
              <div class="black" style="font-size: 14px;color: #757575;margin-bottom: 12px">红包</div>
            </div>
            <div style="margin-bottom: 50px;display: flex;flex-direction: column">
              <div style="font-size: 16px;margin-bottom: 25px">售后服务</div>
              <div class="black" style="font-size: 14px;color: #757575;margin-bottom: 12px">服务记录</div>
              <div class="black" style="font-size: 14px;color: #757575;margin-bottom: 12px">申请服务</div>
              <div class="black" style="font-size: 14px;color: #757575;margin-bottom: 12px">领取快递报销</div>
            </div>
            <div style="margin-bottom: 50px;display: flex;flex-direction: column">
              <div style="font-size: 16px;margin-bottom: 25px">账户管理</div>
              <div class="black" style="font-size: 14px;color: #757575;margin-bottom: 12px"
                   @click="$router.push('/account/service/loginAndSafe')">个人信息
              </div>
              <div class="black" style="font-size: 14px;color: #757575;margin-bottom: 12px"
                   @click="$router.push('/account/service/loginAndSafe')">修改密码
              </div>
              <div class="black" style="font-size: 14px;color: #757575;margin-bottom: 12px">注销服务</div>
            </div>
          </div>
        </div>
        <div style="flex: 5;background:#fff;">
          <Transition name="fade">
            <router-view></router-view>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userCenter",
  data() {
    return {
      type: 'userCenter',
    }
  },
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  padding-bottom: 50px;

  .center {
    width: 1226px;
    margin: 0 auto;
  }

  .black {
    &:hover {
      color: #000000 !important;
      cursor: pointer;
    }
  }

  .red {
    color: #ff7800 !important;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s linear;
  opacity: 0;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transition: opacity 0.3s linear;
}
</style>