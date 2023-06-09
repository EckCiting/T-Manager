import Vue from "vue";
import Router from "vue-router";
import todolist from "@/pages/todoList";
import login from "@/pages/login";
import gantt from "@/pages/gantt";
import project from "@/pages/project";
import profile from "@/pages/profile";
import calender from "@/pages/calender";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      component: login
    },
    {
      path: "/projectdetail/todolist/*",
      name: "todolist",
      component: todolist
    },

    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/projectdetail/gantt/*",
      name: "gantt",
      component: gantt
    },
    {
      path: "/profile",
      name: "profile",
      component: profile
    },
    {
      path: "/project",
      name: "project",
      component: project
    },
    {
      path: "/calender",
      name: "calender",
      component: calender
    }
  ]
});
