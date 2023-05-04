<template>
    <div class="container">
        <img src="../assets/css/11.jpg" class="container">
        <div class="login_box">
            <div class="login_left">
                <h2>welcome</h2>
                <h3>后台管理系统</h3>
            </div>
            <div class="login_right" v-if="show">
                <div class="pint_box">
                    <img src="../assets/css/tx1.jpg" alt="">
                </div>
                <div class="form_box">
                    <el-form :model="ruleForm" :rules="rules" ref="Login_From" class="demo-ruleForm">
                        <el-form-item prop="username">
                            <el-input v-model="ruleForm.username" placeholder="请输入用户名"
                                prefix-icon="el-icon-user-solid"></el-input>

                        </el-form-item>

                        <el-form-item prop="password">
                            <el-input v-model="ruleForm.password" placeholder="请输入用户名" show-password
                                prefix-icon="el-icon-milk-tea"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <el-button type="success" @click="LoginFun">登陆</el-button>
                <div class="logon_box">
                    <span @click="show = !show">账户注册</span>

                </div>
            </div>
            <div class="box_logon_right" v-show="!show">
                <h3>用户注册</h3>
                <div class="logon_from">
                    <el-form :model="LogonFrom" :rules="LogonRules" ref="LoginFrom" class="demo-ruleForm">
                        <el-form-item prop="uname">
                            <el-input v-model="LogonFrom.uname" placeholder="请输入用户名"
                                prefix-icon="el-icon-user-solid"></el-input>
                        </el-form-item>


                        <el-form-item prop="pwt">
                            <el-input v-model="LogonFrom.pwt" placeholder="请输入密码" show-password
                                prefix-icon="el-icon-milk-tea"></el-input>
                        </el-form-item>


                        <el-form-item prop="pwts">
                            <el-input v-model="LogonFrom.pwts" placeholder="请再次输入密码" show-password
                                prefix-icon="el-icon-milk-tea"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <el-button type="success" style="width: 100%;" @click="LogonFun">注册</el-button>
                <div class="loginswitch">
                    <span @click="show = !show">登陆</span>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { Enroll, Login } from "../request/api"
export default {
    data() {

        var validatePass = (rule, value, callback) => {
            if (value == this.LogonFrom.pwt) {

                callback()
                return
            }
            callback(new Error('两次输入密码不一致!'));
        }
        return {
            show: true,
            ruleForm: {
                username: "",
                password: ""
            },
            LogonFrom: {
                uname: "",
                pwt: "",
                pwts: "",
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                ],
            },
            LogonRules: {
                uname: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                ],
                pwt: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                ],
                pwts: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        //登陆
        LoginFun() {

            this.$refs.Login_From.validate((valid) => {
                if (!valid) {
                    return
                }
                Login(this.ruleForm.username, this.ruleForm.password).then((res) => {

                    if(res.status ==200){
                    this.$message ({
                        message:res.msg,
                        type:'success'
                        
                    });
                    sessionStorage.setItem("token",res.token)
                    this.$router.push({
                        path:"/home"
                    })
                   return
                   
                }
                this.$message.error(res.msg);



                })
            })
        },

        // 注册
        LogonFun() {
            this.$refs.LoginFrom.validate((valid) => {
                if (!valid) {
                    return
                }
            })
            Enroll(this.LogonFrom.uname, this.LogonFrom.pwt).then((res) => {
                // console.log(res);
                if(res.status ==200){
                    this.$message ({
                        message:res.msg,
                        type:'success'
                        
                    });
                   return
                   
                }
                this.$message.error(res.msg);



            })
        }
    },
}
</script>

<style  scoped lang="less">
.container {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: blue;

    .login_box {
        display: flex;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        height: 400px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgb(0, 0, 0);

        opacity: 0.9;

        .login_left,
        .login_right {
            width: 47%;
            height: 100%;
            // background-color: rgb(109, 255, 206);
        }

        .login_left {
            display: flex;
            flex-direction: column;
            align-items: center;
            // justify-content: center;
            color: #000000;
            padding-top: 15%;
            font-family: "楷体";
            font-size: 20px;
        }

        //注册
        .box_logon_right {
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            padding: 10px 25px;
            box-sizing: border-box;
            margin: 0 auto;

            h3 {
                margin: 0 auto;
                color: #000000;
            }
        }

        .login_right {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 10px 25px;

            .pint_box {
                width: 75px;
                height: 75px;
                background-color: red;
                border-radius: 50%;
                border: 2px solid #fff;
                overflow: hidden;
                margin: 0 auto;

                img {
                    width: 100%;
                    height: 100%;
                }

          
            }

      
            .el-button {
                width: 100%;
            }

            .logon_box {
                display: flex;
                flex-direction: row-reverse;

                span {
                    font-size: 10px;
                    color: #000000;
                }
            }

        }

        .loginswitch {
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            span {
                font-size: 10px;
                color: #000000;
            }
        }

    }
}
</style>
