<script setup lang="ts">
import { download } from "@/api/download";
const clickDown = () => {
  download().then((res) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([res.data]));
    a.download = "test222.zip";
    a.click();
  });
};
const open = () => {
  //这个要处理跨域问题
  window.open("http://localhost:3000/upload/stream");
};
</script>

<template>
  <div>
    <div>填报查询</div>
    <a-button size="large" type="primary" @click="clickDown">下载</a-button>
    <a-button @click="open">下载2</a-button>
  </div>
</template>

<style scoped></style>
