## 前言

该方案作为一套多功能的后台框架模板，适用于绝大部分的后台管理系统开发。基于 Vue3 + pinia + typescript，引用 Element Plus 组件库，方便开发。实现逻辑简单，快速交付。

## 技术栈

-   [x] Element Plus
-   [x] vite 3
-   [x] pinia
-   [x] typescript
-   [x] Vue3

## git vue 规范

-   [x] feat 增加新功能
-   [x] fix 修复问题/BUG
-   [x] style 代码风格相关无影响运行结果的
-   [x] perf 优化/性能提升
-   [x] refactor 重构
-   [x] revert 撤销修改
-   [x] test 测试相关
-   [x] docs 文档/注释
-   [x] chore 依赖更新/脚手架配置修改等
-   [x] workflow 工作流改进
-   [x] ci 持续集成
-   [x] types 类型定义文件更改
-   [x] wip 开发中

## git 开发流程

1.建立本地开发分支

以远程dev分支为基础，建立本地要开发的分支，如下：
git checkout -b feat-versionmanage origin/dev

2.代码提交仓库

开发完成某个新功能后，在提交代码前务必要拉取最新dev分支与本地的feat-versionmanage分支进行代码合并，
确认无误后，再把此分支推到gitlab代码仓库，如下,在本地开发分支feat-versionmanage下：
(1).拉取最新代码：git fetch origin
(2).git merge dev
(3).yarn build(模拟生产环境打包的过程，非常重要，确保每一次提交的代码都能通过编译成生产环境的检验)
(4).git push origin feat-versionmanage

3.代码推到gitlab后，需要发起merge request，待审核通过后，会合并到主分支

## 安装步骤
> 因为使用vite3，node版本需要 14.18+

```
// 安装项目依赖
yarn

// 本地开发环境
yarn local

// 打包测试环境代码，生成的dist文件夹放在服务器下即可访问
yarn build:dev

// 打包生产环境代码，生成的dist文件夹放在服务器下即可访问
yarn build