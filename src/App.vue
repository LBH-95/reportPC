<script setup lang="ts">
import enUS from "ant-design-vue/es/locale/en_US";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { ref } from "vue";
const locale = ref(zhCN.locale);
</script>

<template>
  <a-config-provider :locale="locale === 'en' ? enUS : zhCN">
    <div>
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<style scoped></style>
