<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="28">
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
            <el-col :span="16">
                <div class="crumbs">
                    <el-breadcrumb separator=">">
                        <el-breadcrumb-item><i class="el-icon-lx-home"></i>招聘管理</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="message === 'first'">原始简历</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="message === 'second'">标准简历</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="message === 'third'">附件</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="message === 'four'">面试测评</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="message === 'five'">待入职</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <el-tabs type="border-card" v-model="message">
                    <el-tab-pane label="原始简历" name="first">
                        <el-table :data="state.unread" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template #default="scope">
                                    <span class="message-title">{{ scope.row.title }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="180"></el-table-column>
                            <el-table-column width="120">
                                <template #default="scope">
                                    <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="primary">全部标为已读</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="标准简历" name="second">
                        <template v-if="message === 'second'">
                            <el-table :data="state.read" :show-header="false" style="width: 100%">
                                <el-table-column>
                                    <template #default="scope">
                                        <span class="message-title">{{ scope.row.title }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="date" width="150"></el-table-column>
                                <el-table-column width="120">
                                    <template #default="scope">
                                        <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="handle-row">
                                <el-button type="danger">删除全部</el-button>
                            </div>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="附件" name="third">
                        <template v-if="message === 'third'">
                            <el-table :data="state.recycle" :show-header="false" style="width: 100%">
                                <el-table-column>
                                    <template #default="scope">
                                        <span class="message-title">{{ scope.row.title }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="date" width="150"></el-table-column>
                                <el-table-column width="120">
                                    <template #default="scope">
                                        <el-button @click="handleRestore(scope.$index)">还原</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="handle-row">
                                <el-button type="danger">清空回收站</el-button>
                            </div>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="面试测评" name="four">
                        <template v-if="message === 'four'">
                            <el-table :data="state.read" :show-header="false" style="width: 100%">
                                <el-table-column>
                                    <template #default="scope">
                                        <span class="message-title">{{ scope.row.title }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="date" width="150"></el-table-column>
                                <el-table-column width="120">
                                    <template #default="scope">
                                        <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="handle-row">
                                <el-button type="danger">删除全部</el-button>
                            </div>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="待入职" name="five">
                        <template v-if="message === 'five'">
                            <el-table :data="state.recycle" :show-header="false" style="width: 100%">
                                <el-table-column>
                                    <template #default="scope">
                                        <span class="message-title">{{ scope.row.title }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="date" width="150"></el-table-column>
                                <el-table-column width="120">
                                    <template #default="scope">
                                        <el-button @click="handleRestore(scope.$index)">还原</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="handle-row">
                                <el-button type="danger">清空回收站</el-button>
                            </div>
                        </template>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="recruitmanage">
import { ref, reactive } from 'vue';
import imgurl from '../assets/img/img.svg';
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import vSubsidebar from '../components/subsidebar.vue';
const name = localStorage.getItem('ms_username');
const role: string = name === 'admin' ? '超级管理员' : '普通用户';
const recruitposition = ref('')
const message = ref('first');
const state = reactive({
    unread: [
        {
            date: '2018-04-19 20:00:00',
            title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
        },
        {
            date: '2018-04-19 21:00:00',
            title: '今晚12点整发大红包，先到先得'
        },
        {
            date: '2018-04-19 21:00:00',
            title: '今晚12点整发大红包，先到先得'
        },
        {
            date: '2018-04-19 21:00:00',
            title: '今晚12点整发大红包，先到先得'
        },
        {
            date: '2018-04-19 21:00:00',
            title: '今晚12点整发大红包，先到先得'
        },
        {
            date: '2018-04-19 21:00:00',
            title: '今晚12点整发大红包，先到先得'
        },
        {
            date: '2018-04-19 21:00:00',
            title: '今晚12点整发大红包，先到先得'
        },
        {
            date: '2018-04-19 21:00:00',
            title: '今晚12点整发大红包，先到先得'
        },
        {
            date: '2018-04-19 21:00:00',
            title: '今晚12点整发大红包，先到先得'
        },
        {
            date: '2018-04-19 21:00:00',
            title: '今晚12点整发大红包，先到先得'
        },
        {
            date: '2018-04-19 21:00:00',
            title: '今晚12点整发大红包，先到先得'
        },
        {
            date: '2018-04-19 21:00:00',
            title: '今晚12点整发大红包，先到先得'
        }
    ],
    read: [
        {
            date: '2018-04-19 20:00:00',
            title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
        },
        {
            date: '2018-04-19 21:00:00',
            title: '今晚12点整发大红包，先到先得'
        },
        {
            date: '2018-04-19 21:00:00',
            title: '今晚12点整发大红包，先到先得'
        },
        {
            date: '2018-04-19 21:00:00',
            title: '今晚12点整发大红包，先到先得'
        },
        {
            date: '2018-04-19 21:00:00',
            title: '今晚12点整发大红包，先到先得'
        },
        {
            date: '2018-04-19 21:00:00',
            title: '今晚12点整发大红包，先到先得'
        },
        {
            date: '2018-04-19 21:00:00',
            title: '今晚12点整发大红包，先到先得'
        },
        {
            date: '2018-04-19 21:00:00',
            title: '今晚12点整发大红包，先到先得'
        }
    ],
    recycle: [
        {
            date: '2018-04-19 20:00:00',
            title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
        },{
            date: '2018-04-19 20:00:00',
            title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
        },{
            date: '2018-04-19 20:00:00',
            title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
        },{
            date: '2018-04-19 20:00:00',
            title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
        },{
            date: '2018-04-19 20:00:00',
            title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
        },{
            date: '2018-04-19 20:00:00',
            title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
        },{
            date: '2018-04-19 20:00:00',
            title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
        },{
            date: '2018-04-19 20:00:00',
            title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
        },{
            date: '2018-04-19 20:00:00',
            title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
        },{
            date: '2018-04-19 20:00:00',
            title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
        }
    ]
});

const handleRead = (index: number) => {
    const item = state.unread.splice(index, 1);
    state.read = item.concat(state.read);
};
const handleDel = (index: number) => {
    	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
		.then(() => {
			ElMessage.success('删除成功');
			const item = state.read.splice(index, 1);
    state.recycle = item.concat(state.recycle);
		})
		.catch(() => {});
};
const handleRestore = (index: number) => {
    const item = state.recycle.splice(index, 1);
    state.read = item.concat(state.read);
};
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.recruitposition {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 500px;
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
</style>
