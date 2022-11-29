<template>
  <div class="container-main">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>首页轮播图设置</span>
        <el-upload class="upload-demo" :action="uploadUrl"
                   style="float: right; padding: 3px 0"
                   :on-success="handleAvatarSuccess"
                   :show-file-list="false"
                   :before-upload="handleBeforeUpload">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <el-row>
        <el-col :span="12" :gutter="20" v-for="(item, index) of Images" :key="index" style="position:relative">
          <img :src="item" alt="" style="width:100%;height:368px">
          <i class="el-icon-close" style="position:absolute;top:10px;right: 10px;font-size: 20px;cursor: pointer;"
             @click="remove(index)"></i>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import {uptBanner, getBanner} from '@/api/Settings'

export default {
  data() {
    return {
      uploadUrl: 'http://localhost:8888/uploadImage',
      Images: [],
    }
  },
  created() {
    this.getBanner()
  },
  methods: {
    handleAvatarSuccess(response, file, fileList) {
      fileList.forEach(e => {
        this.Images = [e.response.obj, ...this.Images]
      });
      this.Images = [...new Set(this.Images)]
      this.submit()
    },
    handleBeforeUpload() {
      if (this.Images.length >= 4) {
        this.$message.warning('最多上传4张图')
        return false
      } else {
        return true
      }
    },
    submit() {
      uptBanner(this.Images.join(',')).then(res => {
        this.$message.success(res.msg)
      })
    },
    getBanner() {
      getBanner().then(res => {
        console.log(res)
        this.Images = res.obj
      })
    },
    remove(index) {
      this.Images.splice(index, 1)
      this.submit()
    }
  }
}
</script>
<style lang="scss">
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  display: flex;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 50%;
}
</style>