<template>
  <div style="width: 100%;height: 100%;position: relative;">
    <shop-header style="position: inherit;top: 0"></shop-header>
    <Transition name="fade">
      <router-view>
      </router-view>
    </Transition>
    <div style="position: fixed;right: 0;top: 30%;z-index: 999;">
      <div
          style="display: flex;flex-direction: column;width: 84px;background:#fff;justify-content: space-between;border: 1px solid #efefef;">
        <div class="hoverColorFF7"
             style="display: flex;flex-direction: column;align-items: center;padding: 20px;box-sizing: border-box;white-space: nowrap;color:#757575;border-bottom: 1px solid #efefef">
          <span class="iconfont" style="font-size: 30px">&#xe604;</span>
          <span style="font-size: 14px">手机APP</span>
        </div>
        <div @click="toUserCenter" class="hoverColorFF7"
             style="display: flex;flex-direction: column;align-items: center;padding: 20px;box-sizing: border-box;white-space: nowrap;color:#757575;border-bottom: 1px solid #efefef">
          <span class="iconfont" style="font-size: 30px">&#xe605;</span>
          <span style="font-size: 14px">个人中心</span>
        </div>
        <div class="hoverColorFF7"
             style="display: flex;flex-direction: column;align-items: center;padding: 20px;box-sizing: border-box;white-space: nowrap;color:#757575;border-bottom: 1px solid #efefef">
          <span class="iconfont" style="font-size: 30px">&#xe659;</span>
          <span style="font-size: 14px">售后服务</span>
        </div>
        <div class="hoverColorFF7"
             style="display: flex;flex-direction: column;align-items: center;padding: 20px;box-sizing: border-box;white-space: nowrap;color:#757575;border-bottom: 1px solid #efefef">
          <span class="iconfont" style="font-size: 30px">&#xec2e;</span>
          <span style="font-size: 14px">人工客服</span>
        </div>
        <div @click="$router.push('/shop/cart')" class="hoverColorFF7"
             style="display: flex;flex-direction: column;align-items: center;padding: 20px;box-sizing: border-box;white-space: nowrap;color:#757575;border-bottom: 1px solid #efefef">
          <span class="iconfont" style="font-size: 30px">&#xe881;</span>
          <span style="font-size: 14px">购物车</span>
        </div>
      </div>
      <div @click="toTop" v-if="show" class="hoverColorFF7"
           style="display: flex;flex-direction: column;margin-top: 20px;align-items: center;background:#fff;;padding: 20px;box-sizing: border-box;white-space: nowrap;color:#757575;border: 1px solid #efefef">
        <span class="iconfont" style="font-size: 30px">&#xe691;</span>
        <span style="font-size: 14px">回顶部</span>
      </div>
    </div>
    <shop-footer style="position:inherit;bottom: 0;"></shop-footer>
  </div>
</template>

<script>
import ShopHeader from "@/components/shop/shopHeader.vue";
import ShopFooter from "@/components/shop/shopFooter.vue";

export default {
  components: {ShopFooter, ShopHeader},
  data() {
    return {
      show: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    handleScroll() {
      let top = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset)
      if (top > 500) {
        this.show = true
      } else {
        this.show = false
      }
    },
    toTop() {
      document.documentElement.scrollTop = 0;
    },
    toUserCenter() {
      let url = this.$router.resolve('/shop/userCenter/portal')
      window.open(url.href, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.hoverColorFF7 {
  transition: all 0.3s linear;

  &:hover {
    color: #ff7800 !important;
    cursor: pointer;
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