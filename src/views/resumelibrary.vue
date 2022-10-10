<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>简历库</el-breadcrumb-item>
			</el-breadcrumb>
			<el-button type="primary" :icon="Plus" @click="handleAdd" style='position: absolute;right:20px;top:39px;'>
				新增</el-button>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-form :inline="true">
					<el-form-item label="性  别">
						<el-select v-model="select.address" placeholder="地址" class="handle-select mr10">
							<el-option key="1" label="广东省" value="广东省"></el-option>
							<el-option key="2" label="湖南省" value="湖南省"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="学  历">
						<el-select v-model="select.address" placeholder="地址" class="handle-select mr10">
							<el-option key="1" label="广东省" value="广东省"></el-option>
							<el-option key="2" label="湖南省" value="湖南省"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="类  型">
						<el-select v-model="select.address" placeholder="地址" class="handle-select mr10">
							<el-option key="1" label="广东省" value="广东省"></el-option>
							<el-option key="2" label="湖南省" value="湖南省"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<el-form :inline="true">
					<el-form-item label="岗  位">
						<el-select v-model="select.address" placeholder="地址" class="handle-select mr10">
							<el-option key="1" label="广东省" value="广东省"></el-option>
							<el-option key="2" label="湖南省" value="湖南省"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="专  业">
						<el-select v-model="select.address" placeholder="地址" class="handle-select mr10">
							<el-option key="1" label="广东省" value="广东省"></el-option>
							<el-option key="2" label="湖南省" value="湖南省"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="年  龄">
						<el-select v-model="select.address" placeholder="地址" class="handle-select mr10">
							<el-option key="1" label="广东省" value="广东省"></el-option>
							<el-option key="2" label="湖南省" value="湖南省"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<el-form :inline="true">
					<el-form-item label="薪  资">
						<el-select v-model="select.address" placeholder="地址" class="handle-select mr10">
							<el-option key="1" label="广东省" value="广东省"></el-option>
							<el-option key="2" label="湖南省" value="湖南省"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-input v-model="recruitposition" style="width:266px" placeholder="姓名/手机号"
							class="input-with-select">
							<template #append>
								<el-button :icon="Search" />
							</template>
						</el-input>
					</el-form-item>
					&nbsp;<el-form-item>
						<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" :icon="Edit" @click="handleReset">重置</el-button>
					</el-form-item>

				</el-form>
			</div>
			<el-table height="450" style="width:100%" :data="tableData" border class="table" ref="multipleTable"
				header-cell-class-name="table-header">
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
				<el-table-column prop="age" width="55" label="年龄"></el-table-column>
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
					:page-size="query.page_size" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" v-model="editVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="用户名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="form.address"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="recruitlibrary">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Edit, Search, Plus } from '@element-plus/icons-vue';
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

const select = reactive({
	address: ''
});
const query = reactive({
	page_index: 1,
	page_size: 10
});
const recruitposition = ref('')
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
	fetchResumeLibrary(query).then(res => {
		console.log('res', res)
		if (res.status == 200) {
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

// 查询操作
const handleSearch = () => {
	query.page_index = 1;
	getData();
};
// 新增操作
const handleAdd = () => {
	query.page_index = 1;
	getData();
};
// 重置操作
const handleReset = () => {
	select.address = ''
	query.page_index = 1;
	getData();
};
// 分页导航
const handlePageChange = (val: number) => {
	query.page_index = val;
	getData();
};

// 删除操作
const handleDelete = (index: number) => {
	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
		.then(() => {
			ElMessage.success('删除成功');
			tableData.value.splice(index, 1);
		})
		.catch(() => { });
};

// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
	name: '',
	address: ''
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index;
	form.name = row.name;
	form.address = row.address;
	editVisible.value = true;
};
const userDetail = (index: number) => {
	router.push('/recruitmanage')
};
const saveEdit = () => {
	editVisible.value = false;
	ElMessage.success(`修改第 ${idx + 1} 行成功`);
	tableData.value[idx].name = form.name;
	tableData.value[idx].address = form.address;
};
</script>

<style scoped>
.handle-box {
	margin-bottom: 20px;
}

.el-form-item__label {
	text-align: justify;
}

.handle-select {
	width: 220px;
}

.handle-input {
	width: 300px;
}

.table {
	width: 100%;
	font-size: 14px;
}

.red {
	color: #ff0000;
}

.mr10 {
	margin-right: 10px;
}

.table-td-thumb {
	display: block;
	margin: auto;
	width: 40px;
	height: 40px;
}
</style>
