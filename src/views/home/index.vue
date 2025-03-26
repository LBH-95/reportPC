<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      width="230"
    >
      <div class="logo">
        {{ collapsed ? "v1.0" : "kk工程进度填报系统 v1.0" }}
      </div>
      <mainMenu></mainMenu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        class="layoutHeader"
        style="background: #fff; padding: 0"
      >
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <div class="userInfo">
          <userAvatar></userAvatar>
        </div>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <breadcrumb></breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <router-view> </router-view>
        </div>
      </a-layout-content>

      <!-- <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import mainMenu from "./components/mainMenu.vue";
import breadcrumb from "./components/breadcrumb.vue";
import userAvatar from "./components/userAvatar.vue";
import { ref } from "vue";

const collapsed = ref<boolean>(false);
</script>
<style lang="scss" scoped>
.layoutHeader {
  display: flex;
  justify-content: space-between;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  line-height: 32px;
  text-align: center;
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
