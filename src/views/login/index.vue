<template>
  <div class="loginPage">
    <canvas id="canvas" style="display: block"></canvas>
    <div class="loginBox">
      <div class="loginTitle">
        <h1>kk工程进度填报系统 v1.0</h1>
        <!-- <p>Strive Everyday</p> -->
      </div>
      <div class="loginForm">
        <a-space direction="vertical" :size="20" style="display: flex">
          <a-input
            v-model:value="account"
            size="large"
            placeholder="请输入用户名"
          />
          <a-input-password
            v-model:value="passWord"
            size="large"
            placeholder="请输入密码"
          />
          <a-space>
            <a-input
              v-model:value="code"
              size="large"
              placeholder="请输入验证码"
            >
            </a-input>
            <div class="codeImgSty">
              <img :src="codeImg" alt="" srcset="" @click="changeCodeImg" />
            </div>
          </a-space>
          <a-button
            size="large"
            type="primary"
            style="width: 100%"
            @click="clickLogin"
            >登录</a-button
          >
        </a-space>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import initLoginBg from "./initBg.ts";
import { getCodeImg, login } from "@/api/login.ts";
import { qrSrc } from "@/utils/aTob.ts";
const initBg = () => {
  initLoginBg();
};
onMounted(() => {
  initBg();
  changeCodeImg();
  window.onresize = initBg;
});
onUnmounted(() => {
  window.removeEventListener("onresize", initBg);
});
const account = ref("");
const passWord = ref("");
const code = ref("");
const codeImg = ref<string>("");
const router = useRouter();
async function clickLogin() {
  // console.log("登录", account.value, passWord.value);
  let res = await login({
    account: account.value,
    passWord: passWord.value,
    code: code.value,
  });

  if (res.data.message == "验证码正确") {
    router.push("/home");
  }
  console.log(res.data.message);
}
async function changeCodeImg() {
  let res = await getCodeImg({ code: Math.random() });
  codeImg.value = qrSrc(res);
}
</script>
<style scoped lang="scss">
.loginPage {
  position: relative;
  .loginBox {
    width: 450px;
    height: 450px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    // border: 1px solid red;
    :deep(.ant-input),
    :deep(.ant-input-password) {
      background-color: rgba(255, 255, 255, 0);
      border-color: #1890ff;
      color: #fff;
      // height: 38px;
    }
    :deep(.ant-input)::-webkit-input-placeholder {
      color: rgba(24, 144, 255, 0.6);
    }
    :deep(.ant-input-password-icon.anticon) {
      color: #1890ff;
    }

    h1 {
      font-weight: bold;
      font-size: 22px;
      text-align: center;
      color: #fff;
    }
    p {
      text-align: center;
      margin: 20px 0;
    }
    .loginTitle {
      margin-bottom: 40px;
      position: relative;
      //   border: 1px solid pink;
      &:before,
      &:after {
        content: "";
        width: 100px;
        height: 2px;
        position: absolute;
        background: linear-gradient(to right, rgba(255, 255, 255, 0), #1976d2);
        left: -20px;
        top: 10px;
      }
      &:after {
        left: auto;
        background: linear-gradient(to left, rgba(255, 255, 255, 0), #1976d2);
        right: -20px;
      }
    }
    .codeImgSty {
      width: 100px;
      height: 34px;
    }
  }
}
</style>
