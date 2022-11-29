<template>
  <div style="width: 100%;height: 100%;font-family: ShuHeiTi;padding: 20px 10px;box-shadow: 0px 0px 5px 0px #cccccc;">
    <div style="display: flex;flex-direction: column;width: 100%">
      <div style="display: flex;align-items: center;margin-bottom: 30px">
        <div style="width: 4px;height: 20px;background:#000;"></div>
        <div style="font-size: 19px;margin-left: 7px">{{ $t('service.SigninMethod') }}</div>
      </div>
      <div
          style="display: flex;cursor: pointer;;padding: 15px 20px;align-items: center;justify-content: space-between;color: #333333">
        <div style="display: flex;align-items: center;">
          <img src="../../../../assets/images/shouji.png" alt="" width="30" height="30">
          <span style="margin-left: 10px">{{ $t('service.Recoveryphone') }}</span>
        </div>
        <div style="display: flex;align-items: center;">
          <span>{{ userInfo.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3") }}</span>
          <i class="el-icon-arrow-right"
             style="font-size: 20px;color: #AAAAAA;margin-left: 10px;font-weight: bold;"></i>
        </div>
      </div>
      <div @click="showEmailSetting = true"
           style="display: flex;cursor: pointer;padding: 15px 20px;align-items: center;justify-content: space-between;color: #333333">
        <div style="display: flex;align-items: center;">
          <img src="../../../../assets/images/youxiang.png" alt="" width="30" height="30">
          <span style="margin-left: 10px">{{ $t('service.Recoveryemail') }}</span>
        </div>
        <div style="display: flex;align-items: center;">
          <span style="color: #ff7800">{{ userInfo.email ? userInfo.email : $t('service.None') }}</span>
          <i class="el-icon-arrow-right"
             style="font-size: 20px;color: #AAAAAA;margin-left: 10px;font-weight: bold;"></i>
        </div>
      </div>
      <div @click="showPasswordSetting = true"
           style="display: flex;cursor: pointer;padding: 15px 20px;align-items: center;justify-content: space-between;color: #333333">
        <div style="display: flex;align-items: center;">
          <img src="../../../../assets/images/mima.png" alt="" width="30" height="30">
          <span style="margin-left: 10px">{{ $t('service.Resetpassword') }}</span>
        </div>
        <div style="display: flex;align-items: center;">
          <i class="el-icon-arrow-right"
             style="font-size: 20px;color: #AAAAAA;margin-left: 10px;font-weight: bold;"></i>
        </div>
      </div>
      <div
          style="display: flex;cursor: pointer;padding: 15px 20px;align-items: center;justify-content: space-between;color: #333333">
        <div style="display: flex;align-items: center;">
          <img src="../../../../assets/images/zhanghao.png" alt="" width="30" height="30">
          <span style="margin-left: 10px">{{ $t('service.ThirdPartyAccounts') }}</span>
        </div>
        <div style="display: flex;align-items: center;">
          <i class="el-icon-arrow-right"
             style="font-size: 20px;color: #AAAAAA;margin-left: 10px;font-weight: bold;"></i>
        </div>
      </div>
    </div>
    <div style="display: flex;flex-direction: column;width: 100%;margin-top: 40px">
      <div style="display: flex;align-items: center;margin-bottom: 30px">
        <div style="width: 4px;height: 20px;background:#000;"></div>
        <div style="font-size: 19px;margin-left: 7px">{{ $t('service.AccountAndSecurity') }}</div>
      </div>
      <div
          style="display: flex;cursor: pointer;padding: 15px 20px;align-items: center;justify-content: space-between;color: #333333">
        <div style="display: flex;align-items: center;">
          <img src="../../../../assets/images/mibao.png" alt="" width="30" height="30">
          <span style="margin-left: 10px">{{ $t('service.SecurityQuestions') }}</span>
        </div>
        <div style="display: flex;align-items: center;">
          <span style="color: #ff7800">{{ $t('service.None') }}</span>
          <i class="el-icon-arrow-right"
             style="font-size: 20px;color: #AAAAAA;margin-left: 10px;font-weight: bold;"></i>
        </div>
      </div>
      <div
          style="display: flex;cursor: pointer;padding: 15px 20px;align-items: center;justify-content: space-between;color: #333333">
        <div style="display: flex;align-items: center;">
          <img src="../../../../assets/images/shebei.png" alt="" width="30" height="30">
          <span style="margin-left: 10px">{{ $t('service.ManageDevices') }}</span>
        </div>
        <div style="display: flex;align-items: center;">
          <i class="el-icon-arrow-right"
             style="font-size: 20px;color: #AAAAAA;margin-left: 10px;font-weight: bold;"></i>
        </div>
      </div>
    </div>
    <el-dialog
        :title="$t('service.Addemailaddress')"
        :visible.sync="showEmailSetting"
        width="25%"
        center>
      <div
          style="width: 100%;height: 100%;display: flex;justify-content: center;flex-direction: column;align-items: center;">
        <el-steps :active="active" style="width: 80%;color: #ff7800 " :align-center="true">
          <el-step :title="$t('service.Enteremailaddress')"></el-step>
          <el-step :title="$t('service.Verifyemailaddress')"></el-step>
        </el-steps>
        <div v-if="!isEamil" class="inputBox">
          <div style="position: relative">
            <el-input v-model="email" style="width: 350px;margin-bottom: 20px" @focus="emailfocus = true"
                      @blur="(email !== '' ? emailfocus = true : emailfocus = false)"></el-input>
            <div class="label" :class="[{inputFocus: emailfocus}]">{{ $t('service.Email') }}</div>
          </div>
        </div>
        <div v-if="isEamil">我们向 <span style="color:#ff7800">{{ email }}</span> 发送了验证邮件</div>
        <div v-if="isEamil" class="inputBox">
          <div style="position: relative">
            <el-input v-model="code" style="width: 350px;margin-bottom: 20px" @focus="codefocus = true"
                      @blur="(code !== '' ? codefocus = true : codefocus = false)"></el-input>
            <div class="label" :class="[{inputFocus: codefocus}]">{{ $t('login.box.VerificationCode') }}</div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="!isEamil" style="margin-top: 12px;width: 200px" @click="next">{{
            $t('service.Next')
          }}</el-button>
        <el-button v-if="isEamil" @click="(showEmailSetting = false , isEamil = false , email = '')"
                   style="width: 150px">取 消</el-button>
        <el-button v-if="isEamil" type="primary" @click="confirmEmail" style="width: 150px">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
        :title="$t('service.Resetpassword')"
        :visible.sync="showPasswordSetting"
        width="30%"
        center
    >
      <div
          style="width: 100%;height: 100%;display: flex;justify-content: center;flex-direction: column;align-items: center;">
        <div class="inputBox">
          <div style="position: relative">
            <el-input v-model="password" show-password style="width: 350px;" @focus="passwordfocus = true"
                      @blur="(password !== '' ? passwordfocus = true : passwordfocus = false)"></el-input>
            <div class="label" :class="[{inputFocus: passwordfocus}]">{{ $t('service.NewPassword') }}</div>
          </div>
        </div>
        <div class="inputBox">
          <div style="position: relative">
            <el-input v-model="rePassword" show-password style="width: 350px;margin-bottom: 20px"
                      @focus="rePasswordfocus = true"
                      @blur="(rePassword !== '' ? rePasswordfocus = true : rePasswordfocus = false)"></el-input>
            <div class="label" :class="[{inputFocus: rePasswordfocus}]">{{ $t('service.ConfirmPassword') }}</div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showPasswordSetting = false" style="width: 150px;height: 60px">{{
        $t('service.cancel')
      }}</el-button>
    <el-button type="primary" @click="resetPwd" style="width: 150px;height: 60px">{{ $t('service.submit') }}</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
import {sendEmail, getUserInfo, confirmEmail, resetPwd} from "@/api/UserApi";
import {mapGetters, mapMutations} from "vuex";
import Cookie from "js-cookie";

export default {
  name: "index",
  data() {
    return {
      showEmailSetting: false,
      showPasswordSetting: false,
      active: 1,
      isEamil: false,
      email: '',
      emailfocus: false,
      code: '',
      codefocus: false,
      password: '',
      passwordfocus: false,
      rePassword: '',
      rePasswordfocus: false
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
    getUserInfo() {
      getUserInfo().then(res => {
        this.setUserInfo(res.obj)
      })
    },
    resetPwd() {
      if (this.password === '' || this.rePassword === '') {
        return this.$message.warning('请填写完整')
      }
      if (this.password !== this.rePassword) {
        return this.$message.warning('两次密码不一致')
      }

      resetPwd(this.password).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.setUserInfo({})
          sessionStorage.clear()
          Cookie.remove('token')
          this.$message.success('退出成功')
          this.$router.push('/account/login')
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    confirmEmail() {
      if (this.code == '') {
        return this.$message.warning('请填写验证码')
      }
      confirmEmail(this.email, this.code).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.getUserInfo()
          this.showEmailSetting = false
          this.active = 1
          this.isEamil = false
        } else {
          this.$message.warning(res.msg)
        }
      })

    },
    next() {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (!this.email) {
        return this.$message.warning('邮箱不能为空')
      } else if (!reg.test(this.email)) {
        return this.$message.warning('邮箱格式不合法')
      } else {
        this.isEamil = true
        this.active++
        sendEmail(this.email)
      }
    }
  },
}
</script>

<style scoped lang="scss">
.inputBox {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 20px;

  .label {
    position: absolute;
    top: 23px;
    font-size: 15px;
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
      font-size: 20px;
      font-family: 'ShuHeiTi';
      background-color: #f9f9f9;
      border: none;
      z-index: 99;
      position: relative;

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
</style>