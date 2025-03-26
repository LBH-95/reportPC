import { createApp } from 'vue'
import 'reset-css'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.mount("#app");

console.log("环境变量", import.meta.env);
