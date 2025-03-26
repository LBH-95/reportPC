<template>
  <div>
    <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      theme="dark"
      @click="clickMenu"
      :inline-collapsed="state.collapsed"
      :items="items"
    ></a-menu>
  </div>
</template>
<script lang="ts" setup>
import { reactive, watch, h, onMounted } from "vue";
import { RouteRecordRaw, useRouter, useRoute } from "vue-router";
import type { ItemType } from "ant-design-vue";
import { routes } from "@/router";

function getItems(routes: Array<RouteRecordRaw>): Array<ItemType> {
  let items: Array<ItemType> = [];
  for (let index = 0; index < routes.length; index++) {
    const element = routes[index];
    if (element.meta?.showTitle) {
      items.push({
        key: element.path,
        icon: () => {
          return element.meta?.icon ? h(element.meta.icon) : h("div");
        },
        children: element.children ? getItems(element.children) : undefined,
        label: element.meta?.title,
      });
    }
  }
  return items;
}

//这个key给到openKeys数组的元素，作为初始值
let firstOpenKey: string = "";
const route = useRoute();
function findKey(obj: { key: string }) {
  return obj.key === route.path;
}

const state = reactive({
  collapsed: false,
  selectedKeys: ["/"],
  openKeys: ["/"],
  preOpenKeys: ["/"],
});

const items = getItems(routes);
onMounted(() => {
  for (let i = 0; i < items.length; i++) {
    if (
      items[i]!["children"] &&
      items[i]!["children"].length > 0 &&
      items[i]!["children"].find(findKey)
    ) {
      firstOpenKey = items[i]!.key as string;
      break;
    }
  }
  state.openKeys = [firstOpenKey];
  state.selectedKeys = [route.path];
});

watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  }
);

const router = useRouter();
function clickMenu(menuItem: { key: string }) {
  router.push(menuItem.key);
}
</script>
