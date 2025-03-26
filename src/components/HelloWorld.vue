<script setup lang="ts">
import { StepBackwardOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
// 首先需要引入一下我们刚刚创建的store
import { useInfoStore } from "@/store/index.ts";
// 因为是个方法，所以我们得调用一下
const userInfo = useInfoStore();
defineProps<{ msg: string }>();
const value = ref("");
</script>

<template>
  <h1>{{ msg }}</h1>
  <a-input v-model:value="value" placeholder="Basic usage" />
  <StepBackwardOutlined />
  <a-button type="primary">Primary Button</a-button>
  <div>{{ userInfo.name }}----{{ userInfo.age }}</div>
</template>

<style scoped lang="scss">
.title {
  background-color: red;
}
</style>
