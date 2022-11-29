<template>
  <div style="display:flex;justify-content: space-between;">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>分类管理</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="save">{{ show ? '编辑' : '保存' }}
        </el-button>
      </div>
      <div v-for="(item, index) in list" :key="index" class="text item">
        <span style="width:30px;text-align:right">{{ item.id }}.</span>
        <span style="width:200px" v-show="show">{{ item.cateName }}</span>
        <el-input v-model="item.cateName" :name="index" v-show="!show" @change="change(item.cateName,item.id)"
                  style="width:200px;"/>
        <el-link type="info" @click="showDialog(item)">设置封面商品</el-link>
      </div>
    </el-card>
    <el-card v-if="Dialog" class="box-card">
      <div slot="header" class="clearfix">
        <span>封面设置</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="saveCover">确定</el-button>
      </div>
      <div style="display: flex;flex-direction: column;">
        <div style="display: flex;align-items: center;margin-bottom: 40px;">
          <span style="margin-right: 20px;">分类名称:</span>
          <span> {{ cateName }}</span>
        </div>

        <div style="display: flex;align-items: center;margin-bottom: 40px;">
          <span style="margin-right: 20px;">对应商品:</span>
          <el-select v-model="goodsId" placeholder="请选择">
            <el-option
                style="width: 250px;"
                v-for="item in goodsList"
                :key="item.id"
                :label="item.storeName"
                :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div style="display: flex;align-items: center;margin-bottom: 40px;">
          <span style="margin-right: 20px;">封面图片:</span>
          <el-upload class="upload-demo" :action="uploadUrl"
                     :on-success="handleAvatarSuccess">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">图片长宽比最好为3:1</div>
          </el-upload>
        </div>

      </div>
    </el-card>
  </div>
</template>
<script>
import {getCategory, editCategory, addCateCover} from '@/api/CategoryApi'

export default {
  data() {
    return {
      list: [],
      show: true,
      Dialog: false,
      goodsList: [],
      cateName: '',
      goodsId: '',
      coverImg: '',
      uploadUrl: 'http://localhost:8888/uploadImage',
      cid: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleAvatarSuccess(response, file, fileList) {
      this.coverImg = response.obj
      console.log(response)
    },
    saveCover() {
      let data = {
        image: this.coverImg,
        pid: this.goodsId
      }
      addCateCover(this.cid, JSON.stringify(data)).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.Dialog = false
        } else {
          this.$message.warning(res.msg)
          this.Dialog = false
        }
      })
    },
    showDialog(data) {
      this.Dialog = true
      this.cateName = data.cateName
      this.goodsList = data.goods
      this.cid = data.id
    },
    change(value, id) {
      let data = {
        id: id,
        cateName: value
      }
      editCategory(data).then(res => {
        if (res.code === 200) {
          this.$message.success('修改成功')
        }
      })
    },
    save() {
      if (this.show) {
        this.show = false
      } else {
        this.show = true
      }
    },
    getList() {
      getCategory().then(res => {
        if (res.code === 200) {
          console.log(res)
          this.list = res.obj
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  height: 30px;
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
  width: 46%;
}
</style>