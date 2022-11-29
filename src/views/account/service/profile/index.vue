<template>
  <div style="width: 100%;height: 100%;font-family: ShuHeiTi;padding: 20px 10px;box-shadow: 0px 0px 5px 0px #cccccc;">
    <div style="display: flex;flex-direction: column;width: 100%">
      <div style="display: flex;align-items: center;margin-bottom: 30px">
        <div style="width: 4px;height: 20px;background:#000;"></div>
        <div style="font-size: 19px;margin-left: 7px">{{ $t('service.Personalinfo') }}</div>
      </div>
      <div style="margin-top: 40px;display: flex;height: 50px;align-items: center">
        <div style="text-align:right;width: 150px;margin-right: 20px">头像</div>
        <div style="width: 60px;height: 60px;border-radius: 50%;overflow: hidden"><img :src="userInfo.avatar" alt=""
                                                                                       width="100%" height="100%"></div>
        <div v-if="showEdit"
             style="height: 50px;line-height: 50px;width: 300px;text-align:right;font-size: 20px;cursor: pointer"
             @click="showChangeAvatar = true"><i class="el-icon-arrow-right"></i></div>

        <el-dialog
            :visible.sync="showChangeAvatar"
            width="25%"
            center
        >
          <div style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center">
            <el-upload
                class="upload-demo"
                drag
                :action="uploadUrl"
                :limit="1"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将头像拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </el-dialog>
      </div>
      <div style="margin-top: 40px;display: flex;height: 50px;align-items: center">
        <div style="text-align:right;width: 150px;margin-right: 20px">昵称</div>
        <div v-if="!showEdit" style="height: 50px;line-height: 50px;width: 360px;">{{ userInfo.username }}</div>
        <div v-else class="inputBox">
          <el-input v-model="username" style="width: 360px"></el-input>
        </div>
      </div>
      <div style="margin-top: 40px;display: flex;height: 50px;align-items: center">
        <div style="text-align:right;width: 150px;margin-right: 20px">性别</div>
        <div style="height: 50px;line-height: 50px;width: 360px;">男</div>
      </div>
      <div style="margin-top: 40px;display: flex;height: 50px;align-items: center">
        <div style="text-align:right;width: 150px;margin-right: 20px"></div>
        <div
            style="width: 360px;height: 60px;line-height: 60px;text-align:center;background-color:#ff7800;color: #ffffff;cursor:pointer;"
            @click="Edit">
          {{ showEdit ? '保存' : '编辑' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {editInfo} from '@/api/UserApi'

export default {
  name: "index",
  data() {
    return {
      showEdit: false,
      username: '',
      showChangeAvatar: false,
      uploadUrl: 'http://localhost:8888/uploadImage',
      avatar: ''
    }
  },
  created() {
    this.username = this.userInfo.username
    this.avatar = this.userInfo.avatar
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'SET_USERINFO'
    }),
    handleAvatarSuccess(res) {
      this.avatar = res.obj
      this.$message.success('头像上传成功，点击保存即可修改')
      this.showChangeAvatar = false
    },
    Edit() {
      if (this.showEdit === false) {
        this.showEdit = true
      } else {
        editInfo(this.avatar, this.username).then(res => {
          if (res.code === 200) {
            this.setUserInfo(res.obj)
            this.$message.success('修改成功')
            this.showEdit = false
          } else {
            this.$message.warning(res.msg)
            this.showEdit = false
          }
        })
      }
    },
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
}
</script>

<style scoped lang="scss">
.inputBox {
  .el-input {
    &::v-deep .el-input__inner {
      height: 50px;
      font-family: 'ShuHeiTi';
      background-color: #f9f9f9;
      border: none;
      z-index: 99;

      &:focus {
        border: 1px solid #ff7800;
        box-shadow: 2px 2px 5px #ff7800;
      }
    }
  }
}
</style>