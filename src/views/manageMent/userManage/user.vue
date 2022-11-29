<template>
  <el-table
      :data="userList"
      style="width: 100%">
    <el-table-column
        label="ID"
        width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.id }} </span>
      </template>
    </el-table-column>
    <el-table-column
        label="用户名"
        width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.username }}</span>
      </template>
    </el-table-column>
    <el-table-column
        label="密码"
        width="380">
      <template slot-scope="scope">
        <span>{{ scope.row.password }}</span>
      </template>
    </el-table-column>
    <el-table-column
        label="手机号"
        width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.phone }}</span>
      </template>
    </el-table-column>
    <el-table-column
        label="权限"
        width="180">
      <template slot-scope="scope">
        <el-tag type="success">{{ scope.row.role === 'admin' ? '管理员' : '游客' }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
        label="状态"
        width="180">
      <template slot-scope="scope">
        <el-tag>{{ scope.row.status === 1 ? '正常' : '封禁' }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
        label="头像"
        width="180">
      <template slot-scope="scope">
        <el-avatar :src="scope.row.avatar"></el-avatar>
      </template>
    </el-table-column>
    <el-table-column
        label="操作"
        width="180">
      <template slot-scope="scope">
        <el-button type="danger" @click="setInterdiction(scope.row.id)">{{ scope.row.status === 1 ? '封禁' : '启用' }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<script>
import {allUser, Interdiction} from '@/api/UserApi'

export default {
  data() {
    return {
      userList: []
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    getAll() {
      allUser().then(res => {
        console.log(res);
        this.userList = res.obj
      })
    },
    setInterdiction(id) {
      Interdiction(id).then(res => {
        this.$message.success(res.msg)
        this.getAll()
      })
    }
  }
}
</script>
<style lang="scss">
table {
  margin-bottom: 0;
}
</style>