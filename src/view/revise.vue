
<template>
    <div>
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/Articlelist' }">文章列表</el-breadcrumb-item>
            <el-breadcrumb-item>修改文章</el-breadcrumb-item>

        </el-breadcrumb>

        <el-form :inline="true" :model="formInline" class="demo-form-inline" id="one">
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="formInline.title" placeholder="请输入文章标题"></el-input>
            </el-form-item>
            <el-form-item label="文章类别" prop="cate_id">
                <el-select v-model="formInline.cate_id" placeholder="请选择">
                    <el-option v-for="item in formInline.options" :key="item.id" :value="item.id"
                        :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上传文章封面">
            </el-form-item>


            <el-upload class="avatar-uploader" action="http://106.15.3.117:3000/file/upload" :show-file-list="false"
                :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="formInline.cover_img" :src="formInline.cover_img" class="avatar">
                <i v-if="!formInline.cover_img" class="el-icon-plus avatar-uploader-icon"></i>
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
                    @click="xg(id, formInline.title, formInline.cate_id, formInline.content, formInline.cover_img, formInline.pub_date, formInline.author_id)">修改文章</el-button>
            </div>
        </el-form>




    </div>
</template>

<script>
import dayjs from 'dayjs'
import { nr, article, xn } from '../request/api'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
    components: { Editor, Toolbar },
    data() {
        return {

            id: '',
            formInline: {

                title: '',
                cate_id: '',
                content: '',
                cover_img: '',
                pub_date: '',
                author_id: '',
                options: [],
                //传的参数

            },

            // imageUrl: '',

            fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
            url: 'https://scpic.chinaz.net/files/pic/pic9/202103/bpic22726.jpg',

            //wangEditor
            editor: null,
            html: '<p>hello</p>',
            toolbarConfig: {},
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'

        }
    },
    mounted() {
        this.user()
        // 模拟 ajax 请求，异步渲染编辑器
        this.lb()

    },

    methods: {
        handleAvatarSuccess(res, file) {
            this.formInline.cover_img = URL.createObjectURL(file.raw);
        },
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
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

        beforeDestroy() {
            const editor = this.editor
            if (editor == null) return
            editor.destroy() // 组件销毁时，及时销毁编辑器
        },


        // 获取数据

        user() {
            const pub_date = dayjs().format('YYYY-MM-DD HH:mm:ss')
            this.formInline.pub_date=pub_date
            this.id = this.$route.query.id
            // console.log(this.$route);
            nr(this.id).then((res) => {
                console.log(res);
                if (res.status == 200) {
                    this.id = res.data.id
                    this.formInline.title = res.data.title
                    this.formInline.cover_img = res.data.cover_img
                    this.formInline.cate_id = res.data.cate_id
                    this.formInline.content = res.data.content
                    this.formInline.author_id = res.data.author_id
                    // this.formInline.pub_date = res.data.pub_date
                    // return
                }
            })
        },
        lb() {
            article().then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    // this.id = res.date.id
                    // console.log(res);
                    this.formInline.options = res.date
                }

            })

        },
        xg() {
            xn(this.id, this.formInline.title, this.formInline.cate_id, this.formInline.content, this.formInline.cover_img, this.formInline.pub_date, this.formInline.author_id).then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    this.$message({

                        message: res.msg,
                        type: 'success'

                    })
                    this.$router.push({
                        path:'/Articlelist'
                    })
                  return
                }
                this.$message.error(res.msg)
            })
        }

    }


}

// wangEditor


</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped lang="less">
.avatar-uploader {

    display: inline-block;
    color: red;

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


//wangEditor
</style>
