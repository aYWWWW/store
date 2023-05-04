<template>
    <div>
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>发布文章</el-breadcrumb-item>

        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
            <el-form-item label="文章标题">
                <el-input v-model="formInline.title" placeholder="请输入文章标题"></el-input>
            </el-form-item>
            
            <el-form-item label="文章类别">
                <el-select v-model="formInline.cate_id">
                    <el-option v-for="item in formInline.options" :key="item.id" :value="item.id"
                        :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上传文章封面">
            </el-form-item>
            <!-- 头像 -->
            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
                :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="formInline.cover_img" :src="formInline.cover_img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

            <!-- 富文本编辑器 -->
            <div style="border: 1px solid #ccc;" class="el-breadcrumb">
                <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig"
                    :mode="mode" />
                <Editor style="height: 500px; overflow-y: hidden;" v-model="formInline.content"
                    :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" />

            </div>
            <div class="issue">
                <el-button type="primary"
                    @click="ArticlecFun(formInline.title, formInline.cate_id, formInline.content, formInline.cover_img, formInline.pub_date, formInline.author_id)">发布文章</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import { Release, article, UserAdmin } from '../request/api'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import dayjs from 'dayjs'

export default {
    components: { Editor, Toolbar },
    data() {
        return {
            id:'',
            content: '',
            formInline: {
               
                options: [],
                title: '',
                author_id: '',                     //传的参数
                cate_id: '',
                content: '',
                cover_img: '',
                pub_date: '',
                html: '',

            },
            tableData: {},
            rules: {},
            editor: null,
            // html: '',
            toolbarConfig: {},
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'

            imageUrl: '',
            data: "",
        }
    },
    mounted(){
        

        this.sort()
    },
    methods: {
        // 发表文章
        ArticlecFun() {


            this.$refs.formInline.validate((valid) => {
                if (!valid) {
                    return
                }
              
                Release(this.formInline.title, this.formInline.cate_id, this.formInline.content, this.formInline.cover_img, this.formInline.pub_date, this.formInline.author_id)
                    .then((res) => {
                        console.log(res);
                        if (res.status == 200) {
                            // this.tableData = res.data
                            this.formInline.title = res.data.title
                            return
                        }
                        this.$message.error(res.msg)
                    })
            })
        },
        // 文章获取类别
        sort() {
            const pub_date = dayjs().format('YYYY-MM-DD HH:mm:ss')
        
            this.formInline.pub_date=pub_date
            article().then((res) => {

          
                if (res.status == 200) {
                    this.formInline.options = res.date
                    return
                }
                this.$message.error(res.msg)
            })

            UserAdmin().then((res) => {
                if (res.status == 200) {
                    this.formInline.author_id = res.data.id
                    this.formInline.cover_img = res.data.user_pic
                }

            })

        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
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
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
    },



    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
}
</script>

<style>
.issue {
    text-align: right;
}

.demo-form-inline {
    margin-top: 15px;
}

.avatar-uploader {
    display: inline-block;
    color: white;
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