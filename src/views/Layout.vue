<template>
  <div class="warp">
    <nav-Header v-if="adaptation" style="position:sticky;top:0px;"></nav-Header>
    <mobile-Nav-Header v-else style="position:sticky;top:0px;"></mobile-Nav-Header>
    <div style="z-index: 20;width: 100%;display: flex;flex-direction: column;"
         :class="[adaptation ? 'mar-top--65' : 'mar-top--87']">
      <div @click="$router.push({ path: '/shop/productDetail', query: {pid: 11}})" style="cursor:pointer">
        <img src="../assets/images/1.jpg" alt="" width="100%" height="100%">
      </div>
      <a href="https://www.mi.com/visual?spmref=MiShop_PC.mihomepage.mtl_62eff87a352df30001adc9a5.1">
        <img src="../assets/images/2.png" alt="" width="100%" height="100%" style="cursor:pointer">
      </a>
      <div @click="$router.push({ path: '/shop/productDetail', query: {pid: 7}})" style="cursor:pointer">
        <img src="../assets/images/3.png" alt="" width="100%" height="100%">
      </div>
    </div>
    <nav-Footer v-if="adaptation"></nav-Footer>
    <div class="MobileFooter" v-else>
      了解小米
      <i class="el-icon-arrow-right"></i>
    </div>
    <el-backtop :bottom="200" :right="200" :visibility-height=300 style="z-index:999"></el-backtop>
  </div>
</template>

<script>
import navHeader from '../components/navHeader.vue'
import navFooter from '../components/navFooter.vue'
import mobileNavHeader from '../components/mobileNavHeader.vue'

export default {
  components: {
    navHeader,
    navFooter,
    mobileNavHeader
  },
  data() {
    return {
      width: document.documentElement.clientWidth,
      adaptation: true
    }
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth;
        this.width = window.fullWidth
      })()
    }
  },
  watch: {
    width(val) {
      let that = this
      if (that.width < 1184) {
        that.adaptation = false
      } else {
        that.adaptation = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.warp {
  display: flex;
  flex-direction: column;
}

.MobileFooter {
  font-family: 'ShuHeiTi';
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  cursor: pointer;
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