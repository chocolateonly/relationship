import { defineStore } from 'pinia';

export const useSidebarStore = defineStore('sidebar', {
	state: () => {
		return {
			collapse: true,
			menu:[
				{
					icon: 'DocumentCopy',
					index: '/dashboard',
					title: '首页',
					permiss: '1'
				},
				{
					icon: 'Calendar',
					index: '1',
					title: '关系app后台',
					permiss: '1',
					subs: [
						// {
						// 	icon: 'Odometer',
						// 	index: '/appback',
						// 	title: '后台管理',
						// 	permiss: '2'
						// },
						{
							icon: 'Calendar',
							index: '/appuser',
							title: '用户管理',
							permiss: '3'
						},
						{
							icon: 'Odometer',
							index: '/appcomplain',
							title: '投诉管理',
							permiss: '4'
						},
						{
							icon: 'Calendar',
							index: '/appgroup',
							title: '群组管理',
							permiss: '5'
						},
						{
							icon: 'Odometer',
							index: '/appforbid',
							title: '封禁管理',
							permiss: '6'
						},
						{
							icon: 'Calendar',
							index: '/applogout',
							title: '注销管理',
							permiss: '7'
						},
						{
							icon: 'Calendar',
							index: '/appaccount',
							title: '账号管理',
							permiss: '8'
						}
					]
				}
			]
		};
	},
	getters: {},
	actions: {
		handleCollapse() {
			this.collapse = !this.collapse;
		}
	}
});
