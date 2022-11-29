<template>
  <div id="app">
    <div style="padding:15px;">
      <div v-if="!showTable">
        <div class="goods-spec">
          <span>商品规格:</span>
          <el-link type="primary" @click="addPrivateSpec" class="goods-spec-add">添加规格</el-link>
        </div>
        <div class="goods-container" v-for="(attr, index) in privateGoodsItem" :key="index">
          <div class="goods-content">
            <div class="goods-content-box">
              <div class="goods-content-left">
                <el-form label-width="80px" style="width:400px">
                  <el-form-item label="规格名">
                    <el-input v-model="attr.privateSpecName" placeholder="请输入规格名"></el-input>
                  </el-form-item>
                  <el-form-item label="规格值">
                    <el-tag v-for="tag in attr.dynamicTags" :key="tag" closable
                            :disable-transitions="false" @close="handleClose(tag, attr)">
                      {{ tag }}
                    </el-tag>
                    <el-input class="input-new-tag" v-if="attr.inputVisible" v-model="attr.inputValue"
                              :ref="`saveTagInput${index}`" size="small"
                              @keyup.enter.native="handleInputConfirm(attr.inputValue, attr)"
                              @blur="handleInputConfirm(attr.inputValue, attr)">
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small"
                               @click="showInput(attr, index)">+ 添加
                    </el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="goods-content-right">
                <el-link type="danger" @click="delPrivateSpec(index)">删除规格</el-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="goods-spec">
          <span>商品规格:</span>
        </div>
        <div class="goods-container" v-for="(attr, index) in privateGoodsItem" :key="index">
          <div class="goods-content">
            <div class="goods-content-box">
              <div class="goods-content-left">
                <el-form label-width="80px" style="width:400px">
                  <el-form-item label="规格名">
                    {{ attr.privateSpecName }}
                  </el-form-item>
                  <el-form-item label="规格值">
                    <el-tag v-for="tag in attr.dynamicTags" :key="tag" type="success">
                      {{ tag }}
                    </el-tag>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showTable">
        <p style="margin:24px 0 10px 0">价格 / 库存</p>
        <el-table ref="multipleTable" :data="tableColumnList.tableBodyList" stripe tooltip-effect="dark"
                  style="width: 100%;margin-top:1%;">
          <el-table-column :label="item.propName" :property="item.prop"
                           v-for="item in tableColumnList.tableHeaderList" :key="item.prop" align="center" fixed="left">
            <template slot-scope="scope">
              <span>{{ scope.row[scope.column.property] }}</span>
            </template>
          </el-table-column>
          <el-table-column label="价格(元)" align="center">
            <template slot-scope="scope">
              <el-input size="mini" clearable placeholder="保留两位小数点"
                        v-model="scope.row.goodsPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="库存" align="center">
            <template slot-scope="scope">
              <el-input size="mini" type="number" placeholder="请输入整数"
                        v-model="scope.row.goodsStock"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-button type="success" v-if="showButton" @click="test" style="margin-top:50px">
        {{ showTable ? '确定' : '生成表格' }}
      </el-button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      showTable: false,
      showButton: true,
      tableColumnList: {
        tableHeaderList: [],
        tableBodyList: []
        // inventory: ''
      },
      privateGoodsItem: [
        {
          privateSpecName: '', //规格名
          dynamicTags: [], //规格值数组
          inputVisible: false,
          inputValue: ''
        }
      ]
    }
  },
  computed: {
    // 计算规格
    calculateAttribute() {
      // 初始化
      let obj = {}
      this.privateGoodsItem.forEach((item) => {
        // 判断有没有输入规格名
        if (item.privateSpecName) {
          //规格名:规格值     //'颜色':'尺寸'
          obj[item.privateSpecName] = item.dynamicTags
        }
      })
      return obj
    }
  },
  watch: {
    // 监听规格数据
    calculateAttribute(newVal) {
      let cloneNewVal = JSON.parse(JSON.stringify(newVal))
      let attrName = [] //规格名数组
      let attrValue = [] //规格值数组
      for (let key in cloneNewVal) {
        attrName.push(key)
        attrValue.push(cloneNewVal[key])
      }
      // 表格内容数据（笛卡尔积算法）
      let finalArr = this.cartesianProductOf(...attrValue)

      let tableObj = {
        tableBodyList: [],
        tableHeaderList: []
      }
      // 表格内容
      tableObj.tableBodyList = finalArr.map((item) => {
        let obj = {}
        for (let i = 0; i < item.length; i++) {
          obj[attrName[i]] = item[i]
        }
        return obj
      })
      this.tableColumnList.tableBodyList = tableObj.tableBodyList //表格内容数据

      // 表头
      let skuTableArr = Object.keys(newVal)
      tableObj.tableHeaderList = skuTableArr.map((item) => {
        return {
          prop: item,
          propName: item
        }
      })
      this.tableColumnList.tableHeaderList = tableObj.tableHeaderList // 表头

    }
  },
  methods: {
    test() {
      // console.log(this.tableColumnList.tableBodyList)
      if (!this.showTable) {
        this.privateGoodsItem.forEach(e => {
          if (!e.privateSpecName || e.dynamicTags.length === 0) {
            return this.$message.warning('你还没有输入参数')
          } else {
            this.showTable = true
          }
        })
      } else {
        let obj = {
          tableColumnList: this.tableColumnList,
          attrInfo: this.privateGoodsItem
        }
        this.$emit('data', obj)
        this.showButton = false
      }

    },
    // 添加规格
    addPrivateSpec(index) {
      this.privateGoodsItem.push({
        privateSpecName: '',
        dynamicTags: [],
        inputVisible: false,
        inputValue: ''
      })
    },
    delPrivateSpec(index) {
      this.privateGoodsItem.splice(index, 1)
    },
    handleInputConfirm(val, attr) {
      if (val) {
        attr.dynamicTags.push(val)
      }
      attr.inputVisible = false
      attr.inputValue = ''
    },
    // // 动态表格的某列的必填参数
    // renderHeader(cerateElement, { column }) {
    //     return cerateElement('div', [
    //         cerateElement('span', column.label),
    //         cerateElement('span', {
    //             domProps: {
    //                 innerHTML: '*'
    //             },
    //             style: {
    //                 color: 'red',
    //                 fontSize: '16px',
    //                 marginLeft: '5px'
    //             }
    //         })
    //     ]);
    // },
    handleClose(tag, item) {
      item.dynamicTags.splice(item.dynamicTags.indexOf(tag), 1)
    },
    showInput(attr, index) {
      attr.inputVisible = true
      this.$nextTick((_) => {
        this.$refs[`saveTagInput${index}`][0].$refs.input.focus()
      })
    },
    // 笛卡尔积算法
    cartesianProductOf(...args) {
      return args.reduce(
          (total, current) => {
            let ret = []
            total.forEach((a) => {
              current.forEach((b) => {
                ret.push(a.concat([b]))
              })
            })
            return ret
          },
          [[]]
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-spec {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-left: 5px;
}

.goods-spec .goods-spec-add {
  margin-right: 15px;
}

.goods-container .button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.goods-container .input-new-tag {
  width: 90px;
  margin-right: 10px;
  vertical-align: bottom;
}

.goods-container .el-tag {
  margin-right: 10px;
}

.goods-container .goods-content {
  margin-bottom: 10px;
  padding: 14px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #fcfcfc;
}

.goods-content .goods-content-box {
  display: flex;
  align-items: center;
}

.goods-content-box .goods-content-left {
  flex: 1;
}
</style>
