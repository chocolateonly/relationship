import { createRouter, createWebHashHistory, RouteRecordRaw, RouterLink } from "vue-router";
import { usePermissStore } from '../store/permiss'
import Home from "../views/home.vue";
import { useIndex } from "../store";
import { menu } from '../utils/request'
const pre_routes =  {
    common_menu: <Array<RouteRecordRaw>>[

    ],
    cid_fe_menu: <Array<RouteRecordRaw>>[
        {
            path: "/cid_goods_tb",
            name: "cid_goods_tb",
            meta: {
                title: '淘宝推广',
                permiss: '-1'
            },
            component: () => import( /* webpackChunkName: "cid_goods_tb" */ "../views/cid/fe/goods_tb.vue")
        },{
            path: "/cid_goods_jd",
            name: "cid_goods_jd",
            meta: {
                title: '京东推广',
                permiss: '-1'
            },
            component: () => import( /* webpackChunkName: "cid_goods_jd" */ "../views/cid/fe/goods_jd.vue")
        },{
            path: "/cid_goods_pdd",
            name: "cid_goods_pdd",
            meta: {
                title: '拼多多推广',
                permiss: '-1'
            },
            component: () => import( /* webpackChunkName: "cid_goods_pdd" */ "../views/cid/fe/goods_pdd.vue")
        },{
            path: "/cid_goods_data",
            name: "cid_goods_data",
            meta: {
                title: '淘宝数据',
                permiss: '-1'
            },
            component: () => import( /* webpackChunkName: "cid_goods_data" */ "../views/cid/fe/goods_data.vue")
        },{
            path: "/cid_goods_data_jd",
            name: "cid_goods_data_jd",
            meta: {
                title: '京东数据',
                permiss: '-1'
            },
            component: () => import( /* webpackChunkName: "cid_goods_data_jd" */ "../views/cid/fe/goods_data_jd.vue")
        },{
            path: "/cid_goods_data_pdd",
            name: "cid_goods_data_pdd",
            meta: {
                title: '拼多多数据',
                permiss: '-1'
            },
            component: () => import( /* webpackChunkName: "cid_goods_data_pdd" */ "../views/cid/fe/goods_data_pdd.vue")
        },{
            path: "/cid_goods_order",
            name: "cid_goods_order",
            meta: {
                title: '订单数据',
                permiss: '-1'
            },
            component: () => import( /* webpackChunkName: "cid_goods_order" */ "../views/cid/fe/goods_order.vue")
        },{
            path: "/cid_users",
            name: "cid_users",
            meta: {
                title: '账号管理',
                permiss: '-1'
            },
            component: () => import( /* webpackChunkName: "cid_users" */ "../views/cid/fe/users.vue")
        },
    ],
    cid_be_menu: <Array<RouteRecordRaw>>[
        {
            path: "/cid_goods",
            name: "cid_goods",
            meta: {
                title: '商品管理',
                permiss: '16'
            },
            component: () => import( /* webpackChunkName: "cid_goods" */ "../views/cid/be/goods.vue")
        },{
            path: "/cid_customer",
            name: "cid_customer",
            meta: {
                title: '客户列表',
                permiss: '16'
            },
            component: () => import( /* webpackChunkName: "cid_customer" */ "../views/cid/be/customer.vue")
        },{
            path: "/cid_manager",
            name: "cid_manager",
            meta: {
                title: '管理员列表',
                permiss: '16'
            },
            component: () => import( /* webpackChunkName: "cid_manager" */ "../views/cid/be/manager.vue")
        },
    ],
}
const home =  {
        path: "/",
        name: "Home",
        component: Home,
        children: [{
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
            },
        ]
    }
export const getHomeRoutes = () => {

    menu.forEach((item,index)=>{
        if(Object.keys(pre_routes).includes(item)){
            const arr:Array<any> = pre_routes[item]
            home.children = home.children.concat(arr)
        }
    })
}
getHomeRoutes()
const routes: RouteRecordRaw[] = [
    {
        path: "/cid_goods_detail",
        name: "cid_goods_detail",
        meta: {
            title: '落地页'
        },
        component: () => import( /* webpackChunkName: "cid_goods_detail" */ "../views/cid/fe/goods_detail.vue")
    },
    {
        path: '/',
        redirect:to=>{
            return  localStorage.getItem('ms_cid_userinfo')?
                JSON.parse(localStorage.getItem('ms_cid_userinfo')||'').permission===0? '/cid_goods':'/cid_goods_tb':'/cid_goods_tb'
        }
    },
    home,
    {
        path: "/login",
        name: "Login",
        meta: {
            title: ''
        },
        component: () => import( /* webpackChunkName: "login" */ "../views/login.vue")
    }, {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限'
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/403.vue')
    }, {
        path: '/404',
        name: '404',
        meta: {
            title: '没有此页'
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/404.vue')
    },
];



const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    const role = localStorage.getItem('ms_cid_userinfo_username');
    const permiss = usePermissStore();

    const userinfo =localStorage.getItem('ms_cid_userinfo')? JSON.parse(localStorage.getItem('ms_cid_userinfo')||''):{}
    //子账号不能访问 账户管理
    if(userinfo.permission==2&&to.path=='/cid_users'){
        next('/404')
        return;
    }

    //如果路由不存在直接404
    if((!routes.find(item=>item.path==to.path))&&
        (!home.children.find(item=>item.path==to.path))
    ){
        next('/404')
        return;
    }

    //权限判断
    const permissRoutes = [
        //招聘管理
        '/recruitmanage',
    ]
    const indexStore = useIndex()
    if(permissRoutes.includes(to.path)&&indexStore.no_permission_routes.includes(to.path)){
        // 如果没有权限，则进入403
        next('/403');
    }

    //查看落地页
    if(to.path=='/cid_goods_detail'){
        next()
        return;
    }

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