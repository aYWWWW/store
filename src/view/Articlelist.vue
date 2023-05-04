<template>
    <div>

        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>文章列表</el-breadcrumb-item>

        </el-breadcrumb>

        <el-card class="box-card">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" label="序号">
                </el-table-column>
                <el-table-column prop="title" label="文章标题">
                </el-table-column>
                <el-table-column prop="author_id" label="文章作者">
                </el-table-column>
                <el-table-column prop="pub_date" label="发布时间">
                </el-table-column>
                <el-table-column prop="cate_id" label="所属分类">
                </el-table-column>
                <el-table-column label="封面">
                    <template slot-scope="scope">
                        <!-- {{ scope.row.cover_img }} -->
                        <el-avatar shape="square" :size="50" :src="scope.row.cover_img"></el-avatar>
                        <el-tag type="warning" v-if="!scope.row.cover_img">尚未设置</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template slot-scope="scope">



                        <el-button type="primary" icon="el-icon-edit" @click="Artxg(scope.row.id)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="aArticleDel(scope.row.id)"></el-button>

                    </template>

                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="block">

                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
                    :page-sizes="[4, 4, 4, 4]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
                    :total="total">

                    <!-- {{ scope.row.cover_img }} -->


                </el-pagination>
            </div>
        </el-card>

    </div>
</template>

<script>
import { Articlelist, ArticleDel } from '../request/api'
export default {
    data() {
        return {
            size: 4,
            page: 1,
            total: 0,
            tableData: [],
            rules: [],
            currentPage4: 2,
            id: ""
        }
    },

    mounted() {
        this.ArticlecFun()
    },
    methods: {

        Artxg(id) {
            this.$router.push({

                path: '/revise',
                query: {
                    id
                }
            })
        },


        // 获取数据
        ArticlecFun() {
            Articlelist(this.size, this.page).then((res) => {
                console.log(res);

                if (res.status == 200) {
                    this.tableData = res.data
                    this.total = res.num
                    return
                }
                this.$message.error(res.msg)
            })
        },

        // 删除
        aArticleDel(id) {

            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                ArticleDel(id).then((res) => {
                    // console.log(res);
                    if (res.status == 200) {
                        this.$message({

                            message: res.msg,
                            type: 'success'
                        })
                        this.ArticlecFun(4, 1)
                        return
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        handleSizeChange(size) {

            this.size = size
            this.ArticlecFun()
        },
        handleCurrentChange(page) {
            this.page = page
            this.ArticlecFun()
        }

    },
}

</script>

<style>
.box-card {
    margin-top: 20px;
}

.picture {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>