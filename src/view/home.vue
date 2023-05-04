<template>
    <div class="container">

        <el-container>
            <el-header>
                <div class="header_left">
                    <div class="h_img">
                        <img src="../assets/css/tx1.jpg" alt="">
                    </div>

                    <h3>后台管理系统</h3>
                </div>

                <div class="header_right">
                    <el-button type="info" @click="Exit">退出</el-button>
                    <p style="margin:0 10px">{{ username }}</p>

                    <div class="h_img_r">
                        <img :src="user_pic" alt="">
                    </div>


                </div>
            </el-header>
            <el-container>
                <!-- 左条形框 -->
                <el-aside width="170px">

                    <el-menu background-color="#545c64" text-color="#fff" router active-text-color="#ffd04b" unique-opened>
                        <el-submenu :index="item.id" v-for="item in list" :key="item.id">
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span>{{ item.title }}</span>
                            </template>
                            <el-menu-item-group>

                                <el-menu-item :index="i.url" v-for="i in item.children" :key="i.nid">{{ i.title}}</el-menu-item>

                            </el-menu-item-group>

                        </el-submenu>

                    </el-menu>



                  </el-aside>

                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { UserAdmin } from '../request/api'
export default {
    data() {
        return {
            list: [{
                id: "1",
                title: "用户管理",
                icon: "el-icon-user-solid",
                children: [
                    {nid: "1-1",title: '用户列表', url:"/userlist"}
            ],
            },
            {
                id: "2",
                title: "文章管理",
                icon: "el-icon-folder-opened",
                children:
                    [
                        { nid: "2-1", title: "文章类别" ,url:"/article"},
                        { nid: "2-2", title: "文章列表" ,url:"/Articlelist"},
                        { nid: "2-3", title: "文章发布" ,url:"/release"},
                    ]
            },
            {
                id: "3",
                title: "个人中心",
                icon: "el-icon-setting",
                children:
                    [
                        { nid: " 3-1", title: "修改资料" ,url:"/modified"},
                        { nid: " 3-2", title: "重置密码" ,url:"/reset"},

                    ]
            }
            ]
        }
    },
    computed: {
        username() {
    
            return this.$store.state.user.username
        },
        user_pic() {
            return this.$store.state.user.user_pic
        }
    },
    mounted() {
        this.UserInfo()
    },
    methods: {
        UserInfo() {
            UserAdmin().then((res) => {
                // 获取到的数据库vuex

                this.$store.commit("User", res.data)
            })
        },
        Exit() {
            sessionStorage.removeItem("token")
            this.$router.push("/")

        }
    },
}
</script>

<style lang="less" scoped>
.container {
    height: 100%;

    .el-container {
        height: 100%;

        .el-header {
            display: flex;
            justify-content: space-around;
            background-color: antiquewhite;

            .header_left,
            .header_right {
                width: 48%;
                height: 100%;
                // background-color: red;
            }

            .header_left {
                display: flex;
                align-items: center;

                .h_img {
                    width: 60px;
                    height: 60px;
                    background-color: #fff;
                    border-radius: 50%;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                    }

                }

                h3 {
                    margin-left: 10px;
                }
            }

            .header_right {
                display: flex;
                align-items: center;
                flex-direction: row-reverse;

                .h_img_r {
                    width: 55px;
                    height: 55px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 2px solid #fff;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }

        .el-aside {
            background-color: aqua;
            .el-menu{
                border: none !important;
            }
            .elsubmenu i{
                color: #fff !important;
            }
            // css穿透
            ::v-deep    .el-submenu_title i{
               color: #fff !important;
            }
        }
        .el-aside{
            background-color: aqua;
            .el-menu{
                border: none !important;
                background-color: aqua;
            }
        }
        .el-main {
            background-color: #26A65B;
            padding-bottom :90px;
            box-sizing: border-box;
        }
    }
}
</style>

