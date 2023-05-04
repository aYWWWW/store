<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>

        </el-breadcrumb>
        <el-card class="box-card">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" label="#">
                </el-table-column>
                <el-table-column prop="username" label="用户名">
                </el-table-column>
                <el-table-column label="邮箱">
                    <template slot-scope="scope">

                        <span v-if="scope.row.email">{{ scope.row.email }}</span>
                        <el-tag type="warning" v-if="!scope.row.email">尚未设置</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="头像">
                    <template slot-scope="scope">

                        <el-avatar v-if="scope.row.user_pic" shape="square" :size="50"
                            :src="scope.row.user_pic"></el-avatar>
                        <el-tag type="warning" v-if="!scope.row.user_pic">尚未设置</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="状态">
                    <template slot-scope="scope">
                        <div>
                            <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949">
                            </el-switch>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template slot-scope="scope">

                        <div>
                      
                            <el-button type="primary" icon="el-icon-edit"></el-button>
                            <el-button type="danger" icon="el-icon-delete" @click="Del(scope.row.id)"></el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>


        </el-card>



    </div>
</template>

<script>

import { UserDel, UserList } from "../request/api"
export default {
    data() {
        return {
            tableData: [
                
            ]
        }
    },
    mounted() {
        this.UserListFun()

        
    },
    methods: {
        UserListFun() {
            UserList().then((res) => {
                // console.log(res.data);
                if (res.status == 200) {
                    this.tableData = res.data
                    return
                }
                this.$message.error(res.msg);


            })
        },
        Del(id) {

            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                UserDel(id).then((res) => {

                    if (res.status == 200) {
                        this.$message({

                            message: res.msg,
                            type: 'success'
                        })
                        this.UserListFun()
                        return
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });



        }
    },
}
</script>

<style lang="less" scoped>

.box-card {
    margin-top: 20px;
}
</style>