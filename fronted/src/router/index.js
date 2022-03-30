import * as VueRouter from "vue-router";

import Home from "../pages/Home.vue";
const Login = () => import("../pages/Login.vue");
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

export default VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});
