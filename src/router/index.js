// 配置路由文件

import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../view/login"   //登陆界面与注册
import home from "../view/home"         //主页
import welcome from "../view/welcome"   //附页
import UserList from "../view/UserList"//用户列表
import article from "../view/article"; //文章类别
import Articlelist from "../view/Articlelist"; //文章列表
import release from "../view/release"   //发布文章
import revise from "../view/revise" //修改
import modified from "../view/modified" //修改资料

import reset from "../view/reset" //重置密码
Vue.use(VueRouter)
const dayjs = require("dayjs");
const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Login
        }, {
            path: "/home",
            component: home,
            redirect: "/welcome",  //重定向
            children: [
                {
                    path: "/welcome",
                    component: welcome
                },
                {
                    path: "/userlist",
                    component: UserList
                },
                {
                    path: "/article",
                    component: article
                },
                {
                    path: "/Articlelist",
                    component: Articlelist
                },
                {
                    path: "/release",
                    component: release
                },
                {
                    path: "/revise",
                    component: revise
                },
                {
                    path:"/modified",
                    component:modified
                },{
                    path:"/reset",
                    component:reset
                },{
                    //文章发布
                    path:"/Articlelist",
                    component:Articlelist
                }

            ]
        }
    ]
})
export default router