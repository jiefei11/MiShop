<template>
  <div class="main" :class="[{show:show}]">
    <div class="left"><img src="../assets/logo.png" alt="" width="50"></div>
    <div class="center" :class="[{color:show}]">
      <div>小米官网</div>
      <div @click="toShop">小米商城</div>
      <div>小米影像</div>
      <div>MIUI</div>
      <div>loT</div>
      <div>云服务</div>
      <div>天星数科</div>
      <div>有品</div>
      <div>小爱开放平台</div>
      <div>企业团购</div>
    </div>
    <div class="right" :class="[{color:show}]">
      <div v-if="userInfo.username" @click="$router.push('/shop/userCenter/portal')">{{ userInfo.username }}</div>
      <div v-else @click="$router.push({path:'/account/login',query: {type: 'login'}})">登录</div>
      <div>|</div>
      <div v-if="userInfo.username" @click="logout">退出</div>
      <div v-else @click="$router.push({path:'/account/login',query: {type: 'register'}})">注册</div>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapMutations
} from 'vuex'
import Cookie from "js-cookie";

export default {
  data() {
    return {
      show: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  created() {
    if (Cookie.get('token')) {
      this.getUser()
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'SET_USERINFO'
    }),
    //获取页面滚轮高度 emmmm...
    handleScroll() {
      let top = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset)
      if (top > 0) {
        this.show = true
      } else {
        this.show = false
      }
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
    logout() {
      this.setUserInfo({})
      sessionStorage.clear()
      Cookie.remove('token')
      this.$message.success('退出成功')
      this.$router.push('/')
    },
    toShop() {
      let url = this.$router.resolve('/shop')
      window.open(url.href, '_blank')
    },
  },
}
</script>
<style lang="scss" scoped>
.main {
  font-family: 'ShuHeiTi';
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  transition: all 0.4s ease-in;
  z-index: 70;
  color: #ffffff;
  font-size: 15px;

  .left {
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .center {
    flex: 6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s ease-in;
    cursor: pointer;

    div:nth-child(1) {
      color: #ff7800 !important;
    }

    div:hover {
      color: #ff7800;
    }
  }

  .right {
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in;

    div:nth-child(1) {
      cursor: pointer;

      &:hover {
        color: #ff7800;
      }
    }

    div:nth-child(2) {
      margin: 0 20px;
    }

    div:nth-child(3) {
      cursor: pointer;

      &:hover {
        color: #ff7800;
      }
    }
  }
}

.show {
  background: #000;
  opacity: 0.8;
}

.color {
  color: #ffffff !important;
}
</style>
