<template>
  <div style="display:flex;width: 100%;height: 900px;box-sizing: border-box;">
    <img v-if="adaptation && $route.path === '/account/login'" src="../../assets/images/loginBg.png" alt=""
         style="flex:1;width:100%;height:100%">
    <div style="flex:4;height: 100%;width: 100%;position: relative;box-sizing: border-box">
      <div
          style="display: flex;justify-content: space-between;align-items: center;position: absolute;top: 0;width: 100%;padding: 15px">
        <div style="display:flex;align-items:center">
          <img src="../../assets/logo.png" alt="" width="50" @click="$router.push('/')">
          <span style="font-size: 25px;font-family: 'ShuHeiTi';">{{ $t('login.title') }}</span>
        </div>
        <div class="selectedItem" style="display: flex;align-items: center;font-size: 14px;color: #838383">
          <div style="margin-left: 20px" @click="agreement">{{ $t('login.Agreement') }}</div>
          <div style="margin-left: 20px" @click="privacy">{{ $t('login.Privacy') }}</div>
          <div style="margin-left: 20px" @click="$message.warning('没写')">{{ $t('login.help') }}</div>
          <div style="margin-left: 20px">|</div>
          <div class="ChannelSelected">
            <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                          {{ language }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="zh">简体中文</el-dropdown-item>
                <el-dropdown-item command="en">English</el-dropdown-item>
                <el-dropdown-item command="ja">日本語</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div style="width: 100%;display: flex;justify-content: center;height: 100%;align-items: center;">
        <Transition name="fade">
          <router-view></router-view>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script>
import {getCode, verification, register, login} from "@/api/UserApi";
import {mapMutations} from 'vuex'
import Cookie from 'js-cookie'

export default {
  data() {
    return {
      //通用
      language: '', //语言
      width: document.documentElement.clientWidth, //页面宽度
      adaptation: true, //控制图片
    }
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'SET_USERINFO'
    }),
    // 根据下拉框的中被选中的值切换语言
    handleCommand(command) {
      if (command === "zh") {
        this.lang = "简体中文";
      } else if (command === 'en') {
        this.lang = "English";
      } else {
        this.lang = "日本語"
      }
      this.$i18n.locale = command;
      window.sessionStorage.setItem("lang", command);
      window.location.reload();
    },
    //跳转用户协议 新窗口打开
    agreement() {
      if (this.$i18n.locale === "zh") {
        let url = this.$router.resolve('/agreement_zh')
        window.open(url.href, '_blank')
      } else if (this.$i18n.locale === "en") {
        let url = this.$router.resolve('/agreement_en')
        window.open(url.href, '_blank')
      } else {
        let url = this.$router.resolve('/agreement_ja')
        window.open(url.href, '_blank')
      }
    },
    //跳转隐私政策 新窗口打开
    privacy() {
      if (this.$i18n.locale === "zh") {
        let url = this.$router.resolve('/privacy_zh')
        window.open(url.href, '_blank')
      } else if (this.$i18n.locale === "en") {
        let url = this.$router.resolve('/privacy_en')
        window.open(url.href, '_blank')
      } else {
        let url = this.$router.resolve('/privacy_ja')
        window.open(url.href, '_blank')
      }
    },
  },
  created() {
    this.type = this.$route.query.type
    //国际化语言切换
    if (this.$i18n.locale === "zh") {
      this.language = '简体中文'
    } else if (this.$i18n.locale === "en") {
      this.language = 'English'
    } else {
      this.language = '日本語'
    }
  },
  //获取上一个地址
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(from, 'from')
      //  这里的vm指的就是vue实例，可以用来当做this使用
      vm.fromPath = from.path  //获取上一级路由的路径
    })
  },
  mounted() {
    //获取页面宽度
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth;
        this.width = window.fullWidth
      })()
    }
  },
  watch: {
    //监听页面宽度
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
.selectedItem {
  div {
    cursor: pointer;

    &:hover {
      color: #ff7800;
    }
  }
}

.ChannelSelected {
  margin-left: 20px;

  .el-dropdown-link {
    &:hover {
      cursor: pointer;
    }
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