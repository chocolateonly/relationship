<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="25">
                <el-card shadow="hover" class="mgb20" style="height: 100%">
                    <div class="mgb20">招聘中的职位</div>
                    <div class="mgb20">
                        <el-input v-model="recruitposition" placeholder="Please input" class="input-with-select">
                            <template #append>
                                <el-button :icon="Search" />
                            </template>
                        </el-input>
                    </div>
                    <div class="mgb20">
                        <v-subsidebar />
                    </div>
                </el-card>
            </el-col>
            <el-col :span="18">
                <div class="crumbs">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>招聘需求</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="container">
                    <el-table v-fit-columns height="450" style="width:100%" :data="tableData" border class="table"
                        ref="multipleTable" header-cell-class-name="table-header">
                        <el-table-column prop="id" label="序号" align="center"></el-table-column>
                        <el-table-column label="操作" align="center">
                            <template #default="scope">
                                <el-button type="primary" link @click="userDetail(scope.row.id)">查看
                                </el-button>
                                <!-- <el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
                                    编辑
                                </el-button>
                                <el-button text :icon="Delete" class="red" @click="handleDelete(scope.$index)" v-permiss="16">
                                    删除
                                </el-button> -->
                            </template>
                        </el-table-column>
                        <el-table-column prop="channel" label="简历来源" width="95" align="center"></el-table-column>
                        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                        <el-table-column prop="sex" label="性别" width="55" align="center"></el-table-column>
                        <el-table-column prop="age" label="年龄"></el-table-column>
                        <el-table-column prop="education" width="155" label="学历" align="center"></el-table-column>
                        <el-table-column prop="" label="专业" align="center"></el-table-column>
                        <el-table-column prop="experience" label="工作经验" width="100" align="center"></el-table-column>
                        <el-table-column prop="relation" label="手机号码" width="120" align="center"></el-table-column>
                        <el-table-column prop="salary" label="期望薪资" width="100" align="center"></el-table-column>
                        <el-table-column prop="talent_type" label="类型" align="center"></el-table-column>
                        <el-table-column prop="uploader" label="上传人" align="center"></el-table-column>
                        <el-table-column prop="application_time" width="200" label="入库时间"></el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background layout="total, prev, pager, next" :current-page="query.page_index"
                            :page-size="query.page_size" :total="pageTotal" @current-change="handlePageChange">
                        </el-pagination>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="recruitdemand">
import { ref, reactive } from 'vue';
import vSubsidebar from '../components/subsidebar.vue';
import imgurl from '../assets/img/img.svg';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus, Link } from '@element-plus/icons-vue';
import { fetchResumeLibrary } from '../api/resumelibrary'
import { useRouter } from "vue-router";
import moment from "moment";
const router = useRouter();

interface TableItem {
    id: number;
    name: string;
    money: string;
    state: string;
    date: string;
    address: string;
}

const query = reactive({
    page_index: 1,
    page_size: 10
});

const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
    fetchResumeLibrary(query).then(res => {
        if (res.status == 200) {
            console.log('res', res)
            tableData.value = res.data.list.map((item: {
                talent_type: number;
                min_salary: string;
                max_salary: string; sex: number; application_time: any;
            }) => {
                return {
                    ...item,
                    sex: item.sex == 0 ? '女' : '男',
                    talent_type: item.talent_type == 0 ? '普通' : '人才',
                    salary: item.min_salary + '~' + item.max_salary,
                    application_time: moment(item.application_time).format("YYYY-MM-DD HH:mm:ss"),
                };
            });
            pageTotal.value = res.data.total_count;
        } else {
            ElMessage.error('权限不足！');
        }

    });
};
getData();

// 分页导航
const handlePageChange = (val: number) => {
    query.page_index = val;
    getData();
};

const userDetail = (index: number) => {
    router.push('/recruitmanage')
};

const name = localStorage.getItem('ms_username');
const role: string = name === 'admin' ? '超级管理员' : '普通用户';
const recruitposition = ref('')

</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
