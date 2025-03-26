import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/home/index.vue";
import Login from "@/views/login/index.vue";
import { MailOutlined, DesktopOutlined } from "@ant-design/icons-vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
    meta: { showTitle: false, title: "首页", icon: "" },
  },
  {
    path: "/login",
    component: Login,
    meta: { showTitle: false, title: "登录", icon: "" },
  },
  {
    //路由初始指向
    path: "/home",
    name: "Home",
    component: Home,
    redirect: { name: "personPermission" },
    meta: { showTitle: true, title: "系统设置", icon: MailOutlined },
    children: [
      {
        path: "/personPermission",
        name: "personPermission",
        component: () => import("@/views/personPermission/index.vue"),
        meta: { showTitle: true, title: "人员权限", icon: DesktopOutlined },
      },
      {
        path: "/fillingQuerying",
        name: "fillingQuerying",
        component: () => import("@/views/fillingQuerying/index.vue"),
        meta: { showTitle: true, title: "填报查询", icon: "" },
      },
    ],
  },
  {
    path: "/test",
    name: "test",
    component: Home,
    redirect: { name: "test1" },
    meta: { showTitle: true, title: "测试菜单", icon: MailOutlined },
    children: [
      {
        path: "/test1",
        name: "test1",
        component: () => import("@/views/test1.vue"),
        meta: { showTitle: true, title: "测试1", icon: DesktopOutlined },
      },
      {
        path: "/test2",
        name: "test2",
        component: () => import("@/views/test2.vue"),
        meta: { showTitle: true, title: "测试2", icon: "" },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    component: () => import("@/views/notFound.vue"),
    meta: { showTitle: false, title: "404", icon: "" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
