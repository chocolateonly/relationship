import { defineStore } from 'pinia';
import {  menu } from '../utils/request'
export interface MenuItem{
	icon:string,
	index:string,
	title:string,
	permiss:string,
	subs:Array<MenuItem>
}
//预置菜单
const getPreMenu =()=>{
	const userinfo =JSON.parse(localStorage.getItem('ms_cid_userinfo')||'')
	let set_menu = {}
	if(userinfo.permission===1){
		set_menu = {
			icon: 'User',
			index: '/cid_users',
			title: '账号管理',
			permiss: '-1',
		}
	}
	return {
		cid_fe_menu:<Array<MenuItem>>[
			{
				icon: 'Goods',
				index: '1',
				title: '商品管理',
				permiss: '-1',
				subs: [
					{
						icon: '',
						index: '/cid_goods_tb',
						title: '淘宝推广',
						permiss: '-1'
					},
					{
						icon: '',
						index: '/cid_goods_jd',
						title: '京东推广',
						permiss: '-1'
					},
					{
						icon: '',
						index: '/cid_goods_pdd',
						title: '拼多多推广',
						permiss: '-1'
					},
				]
			},
			{
				icon: 'Connection',
				index: '2',
				title: '数据管理',
				permiss: '-1',
				subs: [
					{
						icon: '',
						index: '/cid_goods_data',
						title: '淘宝',
						permiss: '-1'
					},
					{
						icon: '',
						index: '/cid_goods_data_jd',
						title: '京东',
						permiss: '-1'
					},
					{
						icon: '',
						index: '/cid_goods_data_pdd',
						title: '拼多多',
						permiss: '-1'
					},
				]
			},
			set_menu
		],
		cid_be_menu:<Array<MenuItem>>[
			{
				icon: 'Goods',
				index: '/cid_goods',
				title: '商品管理',
				permiss: '16',
			},
			{
				icon: 'User',
				index: '3',
				title: '用户管理',
				permiss: '16',
				subs: [
					{
						icon: '',
						index: '/cid_customer',
						title: '客户列表',
						permiss: '16'
					},
					{
						icon: '',
						index: '/cid_manager',
						title: '管理员列表',
						permiss: '16'
					},
				]
			},
		],
	}
}

// @ts-ignore
export const useSidebarStore = defineStore('sidebar', {
	state: () => {
		return {
			collapse: true,
			side_menu_list:<Array<MenuItem>>[],
			menu:<Array<MenuItem>>[]
		};
	},
	getters: {},
	actions: {
		handleCollapse() {
			this.collapse = !this.collapse;
		},
		//获取系统菜单
		setSideAllMenu(){
			this.side_menu_list = []
			menu.forEach((item,index)=>{
				const pre_menu = getPreMenu()
				if(Object.keys(pre_menu).includes(item)){
				const arr = pre_menu[item]
				this.side_menu_list =  this.side_menu_list.concat(arr)
				}
			})

		},
		setMenu(side_menu:Array<MenuItem>){
			this.menu = side_menu
			console.log('sidebar',this.menu)
		}
	}
});
