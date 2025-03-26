<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item v-for="item of breadcrumbItems" :key="item.name">{{
      item.meta.title
    }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, RouteLocationMatched } from "vue-router";
const route = useRoute();
let breadcrumbItems = ref<RouteLocationMatched[]>();
watch(
  () => route.path,
  () => {
    breadcrumbItems.value = route.matched;
  },
  { immediate: true }
);
</script>

<style scoped></style>
