<template>
    <div>
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            <el-breadcrumb-item>重置密码</el-breadcrumb-item>

        </el-breadcrumb>

        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm">
            <el-col :span="20">

                <el-form-item label="旧密码" prop="passa">
                    <el-input type="password" v-model="ruleFormA.passa"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="mima(id, ruleFormA.passa, ruleForm.pass)">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-col>
        </el-form>
    </div>
</template>

<script>
import { UserAdmin, pwd } from '../request/api'
export default {
    data() {

        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            id: "",

            ruleFormA: {
                passa: '',
            },

            ruleForm: {
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
        }

    },
    mounted() {
        this.user()
        // this.mima()
    },
    methods: {
        user() {
            UserAdmin().then((res) => {
                this.id = res.data.id
                console.log(res);
            })
        },
        mima() {
            pwd(this.id, this.ruleFormA.passa, this.ruleForm.pass).then((res) => {
                console.log(res);
                if (res.status == 200) {
                    this.$message({

                        message: res.msg,
                        type: 'success'
                    })
                    return
                }
                this.$message.error('修改失败,请从新输入');
            })
        },




        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};

</script>
<style>
.demo-ruleForm {
    margin-top: 105px;
}
</style>