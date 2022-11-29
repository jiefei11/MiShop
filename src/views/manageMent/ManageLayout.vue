<template>
  <el-container>
    <el-aside width="300px" style="z-index:999">
      <div
          style="height:60px;border-bottom:1px solid #efefef;font-size: 20px;font-family: 'ShuHeiTI';display: flex;align-items: center;justify-content: center;">
        <img src="../../assets/logo.png" alt="" width="60">
        商城管理系统
      </div>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
        <el-menu-item index="/manageMent/index">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/manageMent/goodsManage">
          <i class="el-icon-menu"></i>
          <span slot="title">商品管理</span>
        </el-menu-item>
        <el-menu-item index="/manageMent/categoryManage">
          <i class="el-icon-menu"></i>
          <span slot="title">分类管理</span>
        </el-menu-item>
        <el-menu-item index="/manageMent/userManage">
          <i class="el-icon-document"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/manageMent/orderManage">
          <i class="el-icon-document"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-menu-item index="/manageMent/webSettings">
          <i class="el-icon-setting"></i>
          <span slot="title">网站设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="background:#ffffff;box-shadow: 0px -1px 10px -1px #000;display: flex;align-items: center;">
        Header
      </el-header>
      <el-container>
        <el-header height="40px" style="display: flex;align-items: center;" v-show="routers.length > 0">
          <el-tag v-for="(tag, index) in routers" :key="index" @click="$router.push(tag.path)"
                  :class="[{'activeTag': $route.path === tag.path}]" closable @close="handleClose(tag)"
                  style="margin-right: 10px;cursor: pointer;">
            {{ tag.name }}
          </el-tag>
        </el-header>
        <el-main style="background:#fafafa;box-shadow: 0px 2px 10px -1px #000;font-family: 'ShuHeiTi';">
          <Transition name="fade">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </Transition>
        </el-main>
      </el-container>

    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "ManageLayout",
  data() {
    return {
      routers: [],
      show: false
    }
  },
  methods: {
    handleClose(tag) {
      this.routers.splice(this.routers.indexOf(tag), 1);
    }
  },
  watch: {
    $route(e) {
      let obj = {
        name: e.meta.title,
        path: e.fullPath
      }
      let empty = {}
      this.routers.push(obj)
      //去重  
      this.routers = this.routers.reduce((item, next) => {
        empty[next.name] ? '' : empty[next.name] = true && item.push(next)
        return item
      }, [])
    }
  }
}
</script>

<style lang="scss">

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

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  height: 929px;
}

.activeTag {
  background: #cccccc !important;
  color: #000 !important;
}

::v-deep .el-tag {
  &:hover {
    background: #D3DCE6;
  }
}


.container-main {
  height: calc(100vh - 140px) !important; //控制子路由页高度，59px是顶部navbar的高度
  overflow-y: scroll !important; //添加并更改子路由页滚动条样式
  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d8d8d8;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track-piece {
    background: transparent;
  }
}

</style>