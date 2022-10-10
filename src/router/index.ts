import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { usePermissStore } from '../store/permiss'
import Home from "../views/home.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页',
                    permiss: '1'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/dashboard.vue")
            }, {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格',
                    permiss: '22'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/table.vue")
            }, {
                path: "/recruitmanage",
                name: "recruitmanage",
                meta: {
                    title: '招聘管理',
                    permiss: '1'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/recruitmanage.vue")
            }, {
                path: "/recruitdemand",
                name: "recruitdemand",
                meta: {
                    title: '招聘需求',
                    permiss: '2'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/recruitdemand.vue")
            }, {
                path: "/resumelibrary",
                name: "resumelibrary",
                meta: {
                    title: '简历库',
                    permiss: '3'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/resumelibrary.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表',
                    permiss: '11'
                },
                component: () => import( /* webpackChunkName: "charts" */ "../views/charts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单',
                    permiss: '5'
                },
                component: () => import( /* webpackChunkName: "form" */ "../views/form.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签',
                    permiss: '3'
                },
                component: () => import( /* webpackChunkName: "tabs" */ "../views/tabs.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permiss: '13'
                },
                component: () => import( /* webpackChunkName: "permission" */ "../views/permission.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件',
                    permiss: '6'
                },
                component: () => import( /* webpackChunkName: "upload" */ "../views/upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标',
                    permiss: '10'
                },
                component: () => import( /* webpackChunkName: "icon" */ "../views/icon.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permiss: '10'
                },
                component: () => import( /* webpackChunkName: "icon" */ "../views/permission.vue")
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import(/* webpackChunkName: "user" */ '../views/user.vue')
            }, {
                path: '/pdf',
                name: 'pdf',
                meta: {
                    title: 'Pdf预览'
                },
                component: () => import(/* webpackChunkName: "user" */ '../views/pdf.vue')
            }, {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器',
                    permiss: '8'
                },
                component: () => import(/* webpackChunkName: "editor" */ '../views/editor.vue')
            }, {
                path: '/markdown',
                name: 'markdown',
                meta: {
                    title: 'markdown编辑器',
                    permiss: '9'
                },
                component: () => import(/* webpackChunkName: "markdown" */ '../views/markdown.vue')
            },{
                path: "/appback",
                name: "appback",
                meta: {
                    title: '后台管理',
                    permiss: '2'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/appback.vue")
            }, {
                path: "/appuser",
                name: "appuser",
                meta: {
                    title: '用户管理',
                    permiss: '3'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/appuser.vue")
            }, {
                path: "/appcomplain",
                name: "appcomplain",
                meta: {
                    title: '投诉管理',
                    permiss: '4'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/appcomplain.vue")
            }, {
                path: "/appgroup",
                name: "appgroup",
                meta: {
                    title: '群组管理',
                    permiss: '5'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/appgroup.vue")
            }, {
                path: "/appforbid",
                name: "appforbid",
                meta: {
                    title: '封禁管理',
                    permiss: '6'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/appforbid.vue")
            }, {
                path: "/applogout",
                name: "applogout",
                meta: {
                    title: '注销管理',
                    permiss: '3'
                },
                component: () => import( /* webpackChunkName: "applogout" */ "../views/applogout.vue")
            }, {
                path: "/appaccount",
                name: "appaccount",
                meta: {
                    title: '账号管理',
                    permiss: '8'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/appaccount.vue")
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import( /* webpackChunkName: "login" */ "../views/login.vue")
    }, {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限'
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/403.vue')
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    const role = localStorage.getItem('ms_username');
    const permiss = usePermissStore();
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
        // 如果没有权限，则进入403
        next('/403');
    } else {
        next();
    }
});

export default router;