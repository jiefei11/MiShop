<template>
  <div class="container-main" style="width:100%;height:100%;padding:30px;display: flex;flex-direction: column;">
    <div style="display:flex;align-items:center;margin-bottom: 50px;">
      <div style="display:flex;align-items:center;margin-right: 100px;">
        <div style="width:100px;text-align: right;">商品名称：</div>
        <el-input style="width:300px" v-model="storeName"></el-input>
      </div>
      <div style="display:flex;align-items:center;margin-right: 100px;">
        <div style="width:100px;text-align: right;">商品信息：</div>
        <el-input style="width:300px" v-model="storeInfo"></el-input>
      </div>
      <div style="display:flex;align-items:center;margin-right: 100px;">
        <div style="width:100px;text-align: right;">商品价格：</div>
        <el-input style="width:300px" v-model="price"></el-input>
      </div>
    </div>
    <div style="display:flex;align-items:center;margin-bottom: 50px;">
      <div style="display:flex;align-items:center;margin-right: 100px;">
        <div style="width:100px;text-align: right;">商品库存：</div>
        <el-input style="width:300px" v-model="stock"></el-input>
      </div>
      <div style="display:flex;margin-right: 100px;align-items: center;">
        <div style="width:100px;text-align: right;">商品分类：</div>
        <el-select :value="cateName" style="width:300px" placeholder="请选择" @change="change">
          <el-option v-for="(item, index) in list" :key="index" :label="item.cateName" :value="item">
          </el-option>
        </el-select>
      </div>
      <div style="display:flex;align-items:center;margin-right: 100px;">
        <div style="width:100px;text-align: right;">商品关键字：</div>
        <el-input style="width:300px" v-model="keyword"></el-input>
      </div>
    </div>
    <div style="display:flex;align-items:center;margin-bottom: 50px;">
      <div style="width:100px;text-align: right;">商品图片：</div>
      <el-upload class="upload-demo" :action="uploadUrl" :on-change="handleChange" :file-list="fileList"
                 :on-success="handleAvatarSuccess" multiple>
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">上传错了就重新上传，understand?</div>
      </el-upload>
    </div>
    <specsgoods @data="getData"></specsgoods>
    <div style="display:flex;align-items: center;margin-bottom: 50px;margin-top: 100px;">
      <div style="display:flex;margin-right: 100px;align-items: center;">
        <div style="width:100px;text-align: right;">商品详情：</div>
        <div ref="editorElem" style="width:1300px"></div>
      </div>
    </div>

    <el-button type="warning" @click="getAll">添加</el-button>
  </div>
</template>
<script>
import {getCategory} from '@/api/CategoryApi'
import {addGoods} from '@/api/GoodsApi'
import E from "wangeditor"
import Specsgoods from './specsgoods.vue'

export default {
  components: {
    Specsgoods
  },
  data() {
    return {
      list: [],
      cateName: '',
      cid: '',
      storeName: '',
      storeInfo: '',
      price: '',
      stock: '',
      describe: '',
      uploadUrl: 'http://localhost:8888/uploadImage',
      editor: null,
      fileList: [],
      image: '',
      imageArr: [],
      skuInfo: [],
    }
  },
  mounted() {
    this.createEditor()
  },
  created() {
    this.getList()
  },
  computed: {
    keyword() {
      return this.storeName + ' ' + this.cateName + ' ' + this.storeInfo
    }
  },
  methods: {
    change(data) {
      this.cateName = data.cateName
      this.cid = data.id
    },
    getAll() {
      let data = {
        cid: this.cid,
        storeName: this.storeName,
        storeInfo: this.storeInfo,
        price: this.price,
        stock: this.stock,
        describe: this.describe,
        image: this.image,
        imageArr: this.imageArr.join(','),
        skuInfo: JSON.stringify(this.skuInfo),
        keyword: this.keyword
      }
      addGoods(data).then(res => {
        this.$message.success(res.msg)
        this.$router.back()
      })
    },
    getData(data) {
      console.log(data, 'data');
      data.tableColumnList.tableBodyList.forEach(e => {
        let sku = ''
        data.tableColumnList.tableHeaderList.forEach(h => {
          sku = sku + e[h.prop] + ','
        })
        e.sku = sku
      })
      let obj = {
        attrInfo: data.attrInfo,
        tableBodyList: data.tableColumnList.tableBodyList
      }
      this.skuInfo = obj
      console.log(this.skuInfo, 'skuInfo');
    },
    handleAvatarSuccess(response, file, fileList) {
      this.image = ''
      this.imageArr = []
      this.image = fileList[0].response.obj
      fileList.forEach(e => {
        this.imageArr.push(e.response.obj)
      });
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    getList() {
      getCategory().then(res => {
        if (res.code === 200) {
          console.log(res)
          this.list = res.obj
        }
      })
    },
    createEditor() {
      this.editor = new E(this.$refs.editorElem);//获取组件并构造编辑器
      console.log(this.editor, 'editor')
      this.editor.config.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ]
      this.editor.config.uploadImgServer = this.uploadUrl
      this.editor.config.uploadFileName = 'file' //这个需要和后台商量上传图片的名称
      this.editor.config.onchange = html => {
        this.describe = html;
        console.log(this.describe, 'describe')
      };
      this.editor.config.uploadImgHooks = {
        customInsert: function (insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，参数editor 是编辑器对象，result 是服务器端返回的结果
          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          var url = result.obj;
          insertImg(url);
          // result 必须是一个 JSON 格式字符串！！！否则报错
          console.log("successes:", result)
        }
      }
      this.editor.create(); // 创建富文本实例
    }
  }
}
</script>
<style lang="scss" scoped>

</style>