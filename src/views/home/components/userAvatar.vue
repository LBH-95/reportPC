<template>
  <div class="userInfo">
    <div>管理员</div>
    <div>
      <a-dropdown :trigger="['hover']">
        <a-avatar :size="48">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <a-button type="text">用户信息</a-button>
            </a-menu-item>
            <a-menu-item key="1">
              <a-button type="text" @click="logOut">退出登录</a-button>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
function logOut() {
  router.push("./login");
}
</script>
<style scoped lang="scss">
.userInfo {
  display: flex;
  width: 130px;
  //   border: 1px solid red;
  justify-content: space-around;
  margin-right: 20px;
}
</style>
