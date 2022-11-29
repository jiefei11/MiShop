<template>
  <div style="width: 1440px;height: 100%;padding: 80px;display: flex">
    <div
        style="flex: 1;margin-right: 20px;display: flex;flex-direction: column;box-shadow: 0px 0px 5px 0px #cccccc;font-family: ShuHeiTi;">
      <div
          style="width: 100%;background:#eeeeee;height: 245px;padding: 40px 20px;display: flex;justify-content: center;align-items: center;flex-direction: column;font-size: 19px">
        <div style="width: 80px;height: 80px;border-radius: 50%;overflow: hidden"><img :src="userInfo.avatar" alt=""
                                                                                       width="100%" height="100%"></div>
        <div style="margin-top: 20px">{{ userInfo.username }}</div>
        <div style="margin-top: 20px">{{ userInfo.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3") }}</div>
      </div>
      <div style="padding: 20px 0;display: flex;flex-direction: column;font-size: 17px;color: #333333">
        <div :class="[{type : type === 'loginAndSafe'}]"
             @click="$router.push({path: '/account/service/loginAndSafe' , query: {type: 'loginAndSafe' }})"
             style="height: 60px;width: 100%;line-height: 60px;padding-left: 40px;white-space: nowrap">
          {{ $t('service.Signinginandsecurity') }}
        </div>
        <div :class="[{type : type === 'profile'}]"
             @click="$router.push({path: '/account/service/profile' , query: {type: 'profile' }})"
             style="height: 60px;width: 100%;line-height: 60px;padding-left: 40px;white-space: nowrap">
          {{ $t('service.Personalinfo') }}
        </div>
        <div :class="[{type : type === 'identity'}]"
             @click="$router.push({path: '/account/service/identity' , query: {type: 'identity' }})"
             style="height: 60px;width: 100%;line-height: 60px;padding-left: 40px;white-space: nowrap"
        >{{ $t('service.Privacy') }}
        </div>
        <div :class="[{type : type === 'authorize'}]"
             @click="$router.push({path: '/account/service/authorize' , query: {type: 'authorize' }})"
             style="height: 60px;width: 100%;line-height: 60px;padding-left: 40px;white-space: nowrap"
        >{{ $t('service.AccountsAndpermissions') }}
        </div>
        <div :class="[{type : type === 'help'}]"
             @click="$router.push({path: '/account/service/help' , query: {type: 'help' }})"
             style="height: 60px;width: 100%;line-height: 60px;padding-left: 40px;white-space: nowrap"
        >{{ $t('service.Needhelp') }}
        </div>
      </div>
    </div>
    <div style="flex: 4;">
      <Transition name="fade">
        <router-view></router-view>
      </Transition>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import {mapGetters} from "vuex";

export default {
  name: "index",
  data() {
    return {
      type: 'loginAndSafe'
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.type = this.$route.query.type
  },
  watch: {
    //深度路由监听
    $route: {
      handler() {
        this.type = this.$route.query.type;
        //深度监听，同时也可监听到param参数变化
      },
      deep: true,
    }
  }
}
</script>

<style scoped>
.type {
  border-left: 5px solid #ff7800;
  background: #fff3e6;
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