<template>
  <div class="loginBox">
    <div class="box">
      <div class="title">
        <div :class="[{active : type === 'login'}]" @click="type= 'login'">{{ $t('login.box.login') }}</div>
        <div :class="[{active : type === 'register'}]" @click="type = 'register'">{{ $t('login.box.register') }}</div>
      </div>
      <div class="move" :class="[{moveLeft: type === 'register'}]">
        <div class="inputBox">
          <div style="position: relative">
            <el-input v-model="username" label="123123" style="width: 350px;margin-bottom: 20px" @focus="focus(1)"
                      @blur="focusout(1)"></el-input>
            <div class="label" :class="[{inputFocus: usernamefocus}]">{{ $t('login.box.userNamePlaceHolder') }}</div>
          </div>
          <div style="position: relative">
            <el-input v-model="password" style="width: 350px;" show-password @focus="focus(2)"
                      @blur="focusout(2)"></el-input>
            <div class="label" :class="[{inputFocus: passwordfocus}]">{{ $t('login.box.passWordPlaceHolder') }}</div>
          </div>
        </div>
        <div class="readme">
          <el-checkbox v-model="read"></el-checkbox>
          <div>
            {{ $t('login.box.read') }} <span @click="agreement" style="color: #333333;margin: 0 5px;cursor:pointer;">{{
              $t('login.Agreement')
            }}</span> {{ $t('login.box.and') }} <span @click="privacy"
                                                      style="color: #333333;margin: 0 5px;cursor:pointer;">{{
              $t('login.Privacy')
            }}</span>
          </div>
        </div>
        <div class="loginBtn" @click="login">
          {{ $t('login.box.login') }}
        </div>
        <div style="text-align:center;width: 100%;font-size: 17px;color: #AAAAAA;margin-bottom: 20px">
          {{ $t('login.box.else') }}
        </div>
        <div style="display: flex;width: 100%;justify-content: space-evenly">
          <img src="../../../assets/images/icon_met8teskuz8/zhifubao.png" alt="" width="40" style="cursor:pointer;"
               @click="$message.warning('???????????????')">
          <img src="../../../assets/images/icon_met8teskuz8/weixin.png" alt="" width="40" style="cursor:pointer;"
               @click="$message.warning('????????????')">
          <img src="../../../assets/images/icon_met8teskuz8/QQ.png" alt="" width="40" style="cursor:pointer;"
               @click="$message.warning('??????QQ')">
          <img src="../../../assets/images/icon_met8teskuz8/weibo.png" alt="" width="40" style="cursor:pointer;"
               @click="$message.warning('????????????')">
        </div>
      </div>
      <div class="register" :class="[{moveRight: type === 'register'}]">
        <div v-if="!Confirm" class="inputBox">
          <div style="position: relative">
            <el-input v-model="phone" style="width: 350px;margin-bottom: 20px" @focus="focus(1)"
                      @blur="focusout(1)"></el-input>
            <div class="label" :class="[{inputFocus: phonefocus}]">{{ $t('login.box.phone') }}</div>
          </div>
          <div style="position: relative">
            <el-input v-model="VerificationCode" style="width: 350px;" show-password @focus="focus(2)"
                      @blur="focusout(2)"></el-input>
            <div class="label" :class="[{inputFocus: codefocus}]">{{ $t('login.box.VerificationCode') }}</div>
            <div class="getCode" @click="getCode">{{ $t('login.box.getCode') }}</div>
          </div>
        </div>
        <div v-if="Confirm" class="inputBox">
          <div style="position: relative">
            <el-input v-model="ConfirmPassword" style="width: 350px;margin-bottom: 20px" show-password @focus="focus(1)"
                      @blur="focusout(1)"></el-input>
            <div class="label" :class="[{inputFocus: ConfirmPasswordFocus}]">{{ $t('login.box.ConfirmPassword') }}</div>
          </div>
          <div style="position: relative">
            <el-input v-model="ConfirmRePassword" style="width: 350px;" show-password @focus="focus(2)"
                      @blur="focusout(2)"></el-input>
            <div class="label" :class="[{inputFocus: ConfirmRePasswordFocus}]">{{
                $t('login.box.ConfirmRePassword')
              }}
            </div>
          </div>
        </div>
        <div v-if="!Confirm" class="readme">
          <el-checkbox v-model="read"></el-checkbox>
          <div>
            {{ $t('login.box.read') }} <span @click="agreement" style="color: #333333;margin: 0 5px;cursor:pointer;">{{
              $t('login.Agreement')
            }}</span> {{ $t('login.box.and') }} <span @click="privacy"
                                                      style="color: #333333;margin: 0 5px;cursor:pointer;">{{
              $t('login.Privacy')
            }}</span>
          </div>
        </div>
        <div @click="register(Confirm)" class="loginBtn">
          {{ $t('login.box.register') }}
        </div>
        <div v-if="!Confirm" style="text-align:center;width: 100%;font-size: 17px;color: #AAAAAA;margin-bottom: 20px">
          {{ $t('login.box.else') }}
        </div>
        <div v-if="!Confirm" style="display: flex;width: 100%;justify-content: space-evenly">
          <img src="../../../assets/images/icon_met8teskuz8/zhifubao.png" alt="" width="40" style="cursor:pointer;"
               @click="$message.warning('???????????????')">
          <img src="../../../assets/images/icon_met8teskuz8/weixin.png" alt="" width="40" style="cursor:pointer;"
               @click="$message.warning('????????????')">
          <img src="../../../assets/images/icon_met8teskuz8/QQ.png" alt="" width="40" style="cursor:pointer;"
               @click="$message.warning('??????QQ')">
          <img src="../../../assets/images/icon_met8teskuz8/weibo.png" alt="" width="40" style="cursor:pointer;"
               @click="$message.warning('????????????')">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getCode, verification, register, login, getUserInfo} from "@/api/UserApi";
import {mapMutations} from 'vuex'
import Cookie from 'js-cookie'

export default {
  data() {
    return {
      //??????
      fromPath: '', //????????????????????????
      type: 'login', //?????????????????????
      Confirm: false, //???????????????????????????
      read: false, // ??????????????????????????????????????????
      //???????????????????????????
      usernamefocus: false, // ?????????????????????
      passwordfocus: false, // ??????????????????
      phonefocus: false, //?????????????????????
      codefocus: false, //?????????????????????
      ConfirmPasswordFocus: false, //????????????????????????
      ConfirmRePasswordFocus: false, //??????????????????????????????
      //????????????
      username: '', //?????????
      password: '', //??????
      //????????????
      phone: '', //?????????
      VerificationCode: '', //?????????
      //??????????????????
      ConfirmPassword: '', //????????????
      ConfirmRePassword: '', //??????????????????
    }
  },
  created() {
    if (this.$route.query.type) {
      this.type = this.$route.query.type
    }
  },
  //?????????????????????
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(from, 'from')
      //  ?????????vm????????????vue???????????????????????????this??????
      vm.fromPath = from.path  //??????????????????????????????
    })
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'SET_USERINFO'
    }),
    //input???????????????
    focus(num) {
      if (num === 1) {
        this.usernamefocus = true
        this.phonefocus = true
        this.ConfirmPasswordFocus = true
      } else {
        this.passwordfocus = true
        this.codefocus = true
        this.ConfirmRePasswordFocus = true
      }
    },
    //input?????????????????????
    focusout(num) {
      if (num === 1) {
        if (this.username === '') {
          this.usernamefocus = false
        } else {
          this.usernamefocus = true
        }
        if (this.phone === '') {
          this.phonefocus = false
        } else {
          this.phonefocus = true
        }
        if (this.ConfirmPassword === '') {
          this.ConfirmPasswordFocus = false
        } else {
          this.ConfirmPasswordFocus = true
        }
      } else {
        if (this.password === '') {
          this.passwordfocus = false
        } else {
          this.passwordfocus = true
        }
        if (this.VerificationCode === '') {
          this.codefocus = false
        } else {
          this.codefocus = true
        }
        if (this.ConfirmRePassword === '') {
          this.ConfirmRePasswordFocus = false
        } else {
          this.ConfirmRePasswordFocus = true
        }
      }
    },
    //???????????????
    getCode() {
      let reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
      if (!reg.test(this.phone)) {
        return this.$message.warning('????????????????????????')
      }
      if (!this.read) {
        return this.$message.warning('????????????????????????')
      }
      getCode(this.phone).then(res => {
        if (res.code === 200) {
          this.$message.success(res.obj)
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    //??????
    register(type) {
      if (this.phone === '' || this.VerificationCode === '') {
        return this.$message.warning('?????????????????????')
      }
      if (!type) {
        verification(this.phone, this.VerificationCode).then(res => {
          if (res.code === 200) {
            this.$message.warning(res.msg)
            this.Confirm = true
          } else {
            this.$message.warning(res.msg)
          }
        })
      } else {
        if (this.ConfirmPassword !== this.ConfirmRePassword) {
          return this.$message.warning('?????????????????????')
        }

        if (this.ConfirmRePassword == '' || this.ConfirmPassword == '') {
          return this.$message.warning('?????????????????????')
        }
        register(this.phone, this.ConfirmPassword).then(res => {
          if (res.code === 200) {
            console.log(res)
            this.$message.success('????????????')
            this.type = 'login'
          } else {
            this.$message.success(res.msg)
          }
        })
      }
    },
    getUserInfo() {
      getUserInfo().then(res => {
        this.setUserInfo(res.obj)
      })
    },
    //??????
    login() {
      let reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
      if (!reg.test(this.username)) {
        return this.$message.warning('????????????????????????')
      }
      if (!this.read) {
        return this.$message.warning('?????????????????????')
      }
      if (this.username === '' || this.password === '') {
        return this.$message.warning('?????????????????????')
      }
      login(this.username, this.password).then(res => {
        if (res.code === 200) {
          console.log(res)
          this.$message.success('????????????')
          Cookie.set('token', res.obj, {expires: 7})
          //?????????????????????
          this.getUserInfo()
          this.$router.push('/shop/index')
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    //?????????????????? ???????????????
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
    //?????????????????? ???????????????
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
}
</script>
<style lang="scss" scoped>
.loginBox {
  max-height: calc(100vh - 73px) !important;
  width: 440px;
  box-shadow: 1px 0px 10px -4px #000;
  display: flex;

  .box {
    display: flex;
    flex-direction: column;
    width: 440px;
    padding: 40px 45px;
    border-radius: 4px;
    position: relative;
    height: 540px;
    overflow: hidden;

    .title {
      font-family: 'ShuHeiTi';
      display: flex;
      align-items: center;
      margin-bottom: 30px;

      div {
        padding: 10px 0;
        margin-right: 20px;
        cursor: pointer;
        font-size: 22px;
        color: #838383;
        box-sizing: border-box;
      }

      .active {
        color: #000000;
      }
    }

    .register {
      position: absolute;
      transition: left 0.5s;
      top: 25%;
      left: 110%;
      width: 360px;

      .inputBox {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        .label {
          position: absolute;
          top: 19px;
          left: 14px;
          color: #AAAAAA;
          z-index: 99;
          transition: all 0.2s linear;
        }

        .getCode {
          position: absolute;
          right: 20px;
          color: #ff7800;
          font-size: 12px;
          top: 21px;
          z-index: 999;
          cursor: pointer;
        }

        .inputFocus {
          top: 7px;
          font-size: 12px;
        }

        .el-input {
          &::v-deep .el-input__inner {
            height: 60px;
            padding-top: 30px;
            font-size: 17px;
            font-family: 'ShuHeiTi';
            background-color: #f9f9f9;
            border: none;
            z-index: 99;
            position: relative;

            &::placeholder {
              position: absolute;
              font-size: 17px;
              color: #00000066;
              top: 17px;
              left: 10px;
              transition: all 0.2s linear;
            }

            &:focus {
              border: 1px solid #ff7800;
              box-shadow: 2px 2px 5px #ff7800;

              &::placeholder {
                top: 10px;
                font-size: 12px;
              }
            }
          }
        }
      }

      .readme {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #AAAAAA;

        .el-checkbox ::v-deep .el-checkbox__inner {
          width: 20px;
          height: 20px;

          &:after {
            left: 7px;
            top: 4px;
          }
        }
      }

      .loginBtn {
        width: 350px;
        height: 60px;
        margin-bottom: 20px;
        line-height: 60px;
        background: #ff7800;
        color: #ffffff;
        text-align: center;
        margin-top: 20px;
        border-radius: 10px;
        cursor: pointer;

        &:hover {
          background: #ff7844;
        }
      }
    }

    .move {
      position: absolute;
      transition: left 0.5s;
      top: 25%;
      left: 10%;
      width: 360px;

      .inputBox {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        .label {
          position: absolute;
          top: 19px;
          left: 14px;
          color: #AAAAAA;
          z-index: 99;
          transition: all 0.2s linear;
        }

        .inputFocus {
          top: 7px;
          font-size: 12px;
        }

        .el-input {
          &::v-deep .el-input__inner {
            height: 60px;
            padding-top: 30px;
            font-size: 17px;
            font-family: 'ShuHeiTi';
            background-color: #f9f9f9;
            border: none;
            z-index: 99;
            position: relative;

            &::placeholder {
              position: absolute;
              font-size: 17px;
              color: #00000066;
              top: 17px;
              left: 10px;
              transition: all 0.2s linear;
            }

            &:focus {
              border: 1px solid #ff7800;
              box-shadow: 2px 2px 5px #ff7800;

              &::placeholder {
                top: 10px;
                font-size: 12px;
              }
            }
          }
        }
      }

      .readme {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #AAAAAA;

        .el-checkbox ::v-deep .el-checkbox__inner {
          width: 20px;
          height: 20px;

          &:after {
            left: 7px;
            top: 4px;
          }
        }
      }

      .loginBtn {
        width: 350px;
        height: 60px;
        margin-bottom: 20px;
        line-height: 60px;
        background: #ff7800;
        color: #ffffff;
        text-align: center;
        margin-top: 20px;
        border-radius: 10px;
        cursor: pointer;

        &:hover {
          background: #ff7844;
        }
      }
    }

    .moveLeft {
      position: absolute;
      left: -90%;
    }

    .moveRight {
      position: absolute;
      left: 10%;
    }
  }
}
</style>