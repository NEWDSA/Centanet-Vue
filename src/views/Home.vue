<template>
  <div class="dashboard-container">
    <div class="dashboard-text">登录人: {{ loginUser.Name }} ，工号: {{ loginUser.StaffNo }}</div>

    <div v-permission="['TransactionProject','Demo']">权限控制-拥有权限代码的显示</div>
  </div>
</template>

<script>
// import permission from '@/directive/permission/index.js' // 权限判断指令
import { mapGetters } from 'vuex'
export default {
  // directives: { permission }, // 局部注册指令
  name: 'Home',
  computed: {
    ...mapGetters([
      'loginUser'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
