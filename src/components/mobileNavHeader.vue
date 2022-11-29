<template>
  <div class="top" :class="[{show:show , extend : extend}]">
    <div style="display:flex;justify-content: space-between;align-items: center;width: 100%;padding: 20px;">
      <div><img src="../assets/logo.png" alt="" width="50"></div>
      <div style="display:flex;align-items:center;font-size: 30px;">
        <div @click="type = 'login' , login = !login , show = !show , extend = !extend"><i
            :class="[login ? 'el-icon-close' : 'el-icon-s-custom']"></i></div>
        <div @click="type = 'main' , main = !main , show = !show , extend = !extend" style="margin-left:40px"><i
            :class="[main ? 'el-icon-close' : 'el-icon-s-unfold']"></i></div>
      </div>
    </div>
    <div v-if="type === 'login'"
         style="display:flex;align-items: center;border-top: 1px solid #ffffff;padding: 40px 0;text-align: center;">
      <div style="flex:1" @click="$router.push({path:'/login' , query: {type :'login'}})">登录</div>
      <div style="flex:1;" @click="$router.push({path:'/login' , query: {type :'register'}})">注册</div>
    </div>
    <div v-if="type === 'main'"
         style="display:flex;flex-direction: column;padding: 0 20px;border-top: 1px solid #ffffff;">
      <div style="display:flex;justify-content:space-between;padding: 20px;">
        <div style="color:#ff7800">小米官网</div>
        <div><i class="el-icon-arrow-right"></i></div>
      </div>
      <div @click="$router.push('/shop')" style="display:flex;justify-content:space-between;padding: 20px;">
        <div>小米商城</div>
        <div><i class="el-icon-arrow-right"></i></div>
      </div>
      <div style="display:flex;justify-content:space-between;padding: 20px;">
        <div>小米影像</div>
        <div><i class="el-icon-arrow-right"></i></div>
      </div>
      <div style="display:flex;justify-content:space-between;padding: 20px;">
        <div>MIUI</div>
        <div><i class="el-icon-arrow-right"></i></div>
      </div>
      <div style="display:flex;justify-content:space-between;padding: 20px;">
        <div>loT</div>
        <div><i class="el-icon-arrow-right"></i></div>
      </div>
      <div style="display:flex;justify-content:space-between;padding: 20px;">
        <div>云服务</div>
        <div><i class="el-icon-arrow-right"></i></div>
      </div>
      <div style="display:flex;justify-content:space-between;padding: 20px;">
        <div>天星数科</div>
        <div><i class="el-icon-arrow-right"></i></div>
      </div>
      <div style="display:flex;justify-content:space-between;padding: 20px;">
        <div>有品</div>
        <div><i class="el-icon-arrow-right"></i></div>
      </div>
      <div style="display:flex;justify-content:space-between;padding: 20px;">
        <div>小爱开放平台</div>
        <div><i class="el-icon-arrow-right"></i></div>
      </div>
      <div style="display:flex;justify-content:space-between;padding: 20px;">
        <div>企业团购</div>
        <div><i class="el-icon-arrow-right"></i></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      type: '',
      extend: false,
      login: false,
      main: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    //获取页面滚轮高度 emmmm...
    handleScroll() {
      let top = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset)
      if (top > 0) {
        this.show = true
      } else {
        this.show = false
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.top {
  font-family: 'ShuHeiTi';
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.4s ease-in;
  z-index: 99;
  color: #ffffff;
  font-size: 15px;
  height: 87px;
  overflow: hidden;
}

.show {
  background: #000;
  opacity: 0.8;
}

.extend {
  height: auto !important;
}
</style>