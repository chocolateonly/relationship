<template>
	<div class="container">
		<div class="mgb20">
			<span class="label">上海关系科技集团</span>
		</div>
		<div class="mgb20 tree-wrapper">
			<el-tree
				ref="tree"
				:data="data"
				node-key="id"
				default-expand-all
				:default-checked-keys="checkedKeys"
			/>
		</div>
		<el-button type="primary" :icon="Plus" @click="onSubmit">添加职位</el-button>
	</div>
</template>

<script setup lang="ts" name="permission">
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { ElTree } from 'element-plus';
import { usePermissStore } from '../store/permiss';

const role = ref<string>('admin');

interface Tree {
	id: string;
	label: string;
	children?: Tree[];
}

const data: Tree[] = [
	{
		id: '1',
		label: '研发部'
	},
	{
		id: '2',
		label: '产品部',
		children: [
			{
				id: '15',
				label: '产品专员'
			},
			{
				id: '16',
				label: '产品实习生'
			}
		]
	},
	{
		id: '3',
		label: '设计部'
	},
	{
		id: '4',
		label: '人事部',
		children: [
			{
				id: '5',
				label: '人事专员'
			},
			{
				id: '6',
				label: '人事实习生'
			},
			{
				id: '7',
				label: '人事总监',
				children: [
					{
						id: '8',
						label: '人事主管'
					},
					{
						id: '9',
						label: '人事经理'
					}
				]
			}
		]
	}
];

const permiss = usePermissStore();

// 获取当前权限
const checkedKeys = ref<string[]>([]);
const getPremission = () => {
	// 请求接口返回权限
	checkedKeys.value = permiss.defaultList[role.value];
};
getPremission();

// 保存权限
const tree = ref<InstanceType<typeof ElTree>>();
const onSubmit = () => {
	// 获取选中的权限
	console.log(tree.value!.getCheckedKeys(false));
};

const handleChange = (val: string[]) => {
	tree.value!.setCheckedKeys(permiss.defaultList[role.value]);
};
</script>

<style scoped>
.tree-wrapper {
	max-width: 500px;
}
.label {
	font-size: 16px;
    color: var(--el-color-primary);
    border: 1px solid var(--el-color-primary);
}
</style>
