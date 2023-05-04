<style src="@wangeditor/editor/dist/css/style.css"></style>
<template>
    <div>


        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>文章类别</el-breadcrumb-item>

        </el-breadcrumb>
        <!-- 新增分类按钮 -->
        <el-button type="primary" plain class="el-breadcrumb" @click="dialogVisible = true">新增分类</el-button>

    <el-dialog title="新增分类" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="*分类名称" prop="pass">
                    <el-input type="text" v-model="ruleForm.pass" placeholder="请输入分类名称"></el-input>
                </el-form-item>
                <el-form-item label="*分类别名" prop="checkPass">
                    <el-input type="text" v-model="ruleForm.checkPass" placeholder="请输入分类别名"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = true">确 定</el-button>
            </span>
                            </el-dialog> 

        <!-- 编辑分类 -->

        <el-dialog title="编辑分类" :visible.sync="B_dialogVisible" width="30%" :before-close="handleClose">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="*分类名称" prop="pass">
                    <el-input type="username" v-model="ruleForm.pass" autocomplete="on" placeholder="请输入分类名称"></el-input>
                </el-form-item>
                <el-form-item label="*分类别名" prop="checkPass">
                    <el-input type="username" v-model="ruleForm.checkPass" autocomplete="on"
                        placeholder="请输入分类别名"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="B_dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click=" gx(ruleForm.id, ruleForm.name, ruleForm.alias)">确定</el-button>
            </span>
        </el-dialog>

        <!-- 文章内容 -->
        <el-card class="box-card">
            <template>
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column type="index" label="序号">
                    </el-table-column>
                    <el-table-column prop="name" label="文章分类">
                    </el-table-column>
                    <el-table-column label="分类别名">
                        <template slot-scope="scope">

                            <span> {{ scope.row.alias }}</span>
                        </template>

                    </el-table-column>
                    <el-table-column label="操作" width="500">

                        <template slot-scope="scope">


                            <el-button type="primary" icon="el-icon-edit" @click="hxa(scope.row.id)" plain
                                class="el-breadcrumb" :before-close="handleClose"></el-button>
                            <el-button type="danger" icon="el-icon-delete" @click="Del(scope.row.id)"></el-button>

                        </template>

                    </el-table-column>
                </el-table>
            </template>
        </el-card>

    </div>
</template>

<script>
import { article, articleDel, hx, bja } from '../request/api'

export default {

    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入分类名称'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入分类别名'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            dialogVisible: false,
            B_dialogVisible: false,
            ruleForm: {
                id: '',
                pass: '',
                checkPass: '',

            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],

            },
            tableData: [],
        };

    },

    mounted() {
        this.articleFun()
    },
    methods: {
        hxa(id) {
            this.B_dialogVisible = true
            console.log(id);
            hx(id).then((res) => {
                console.log(res);
                if (res.status == 200) {
                    this.ruleForm.id = res.date.id
                    this.ruleForm.pass = res.date.name
                    this.ruleForm.checkPass = res.date.alias


                }

            })
        },
        articleFun() {
            console.log(123);
            article().then((res) => {
                console.log(res);
                if (res.status == 200) {
                    this.tableData = res.date
                    return
                }
                this.$message.error(res.msg)
            })
        },

        gx() {
           this. B_dialogVisible = false,
            bja(this.ruleForm.id, this.ruleForm.pass, this.ruleForm.checkPass).then((res) => {
               
                console.log(res);
                if (res.status == 200) {
                    this.$message({
                        message: res.msg,
                        type: 'success',
                   
                    })
                    this.articleFun()
                    return
                }
           
                this.$message.error(res.msg)

            })





        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
       
        Del(id) {

            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                articleDel(id).then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        this.$message({

                            message: res.msg,
                            type: 'success'
                        })
                        this.articleFun()
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
    }

}



</script>

<style lang="less" scoped>
.box-card {
    margin-top: 20px;
}
</style>