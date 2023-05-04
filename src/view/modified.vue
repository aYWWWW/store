<template>
    <div>
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            <el-breadcrumb-item>修改资料</el-breadcrumb-item>

        </el-breadcrumb>
        <h2 class="el-breadcrumb">修改个人资料</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm">
            <el-col :span="20">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>



                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
            </el-col>
        </el-form>

        <!-- 上传头像 -->
        <el-upload class="avatar-uploader" :action="action" :show-file-list="false" :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload" :headers="headers">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button type="primary" @click="xiugai()">保存修改</el-button>
    </div>
</template>
<script>
import { UserAdmin, gx } from '../request/api'
import { mapState } from 'vuex'

var checkEmail = (rule, value, callback) => {
    if (!value) {
        callback();
    } else {
        const reg =
            /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;

        const email = reg.test(value);

        if (!email) {
            callback(new Error("邮箱格式如:admin@163.com"));
        } else {
            callback();
        }
    }
};
export default {

    data() {
        return {
            action: 'http://106.15.3.117:3000/file/upload',
            headers: {
                Authorization: this.token,
            },
            ruleForm: {
                id:'',
                url: '',
                email: '',
                username: '',
            },
            rules: {
                username: [
                    { required: true, message: '用户名', trigger: 'blur' },
                    { min: 5, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],

                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { validator: checkEmail, trigger: 'blur' }
                ],
            },
           
            imageUrl: '',

        };
    },
    computed: {
        ...mapState(["token"]),
    },
    mounted() {
        this.name()
        this.headers.Authorization = this.token;
    },
    methods: {
        name() {


            UserAdmin().then((res) => {
                console.log(res);
                if (res.status == 200) {
                    this.ruleForm.username = res.data.username
                    this.ruleForm.email = res.data.email
                    this.imageUrl = res.data.user_pic
                    this.ruleForm.id=res.data.id
                    this.id =res.data.id
                }
            })
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = res.url;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },

        // 上传成功
        xiugai() {
            this.$refs.ruleForm.validate((valid) => {
                if (!valid) return;
                    

        
                gx(this.ruleForm.id, this.imageUrl, this.ruleForm.email, this.ruleForm.username).then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        this.$message.success("修改资料成功");
                      
                    } else {
                        // 弹出错误信息
                        this.$message.error(res.msg);
                    }
                })
                this.name()
            })
          
        },
       

        
    }
}
</script>

<style scoped>
.el-breadcrumb {
    font-size: 20px;
    color: white;
}

.avatar-uploader {
    margin-left: 200px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>