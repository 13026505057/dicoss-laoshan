import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children: [{
                    name: '管控人分布',
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    name: '待入库',
                    path: '/waitForInStore',
                    component: resolve => require(['../components/page/waitForInStore.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '入库历史',
                    path: '/inStoreHistory',
                    component: resolve => require(['../components/page/inStoreHistory.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '待出库',
                    path: '/waitForOutStore',
                    component: resolve => require(['../components/page/waitForOutStore.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '出库历史',
                    path: '/outStoreHistory',
                    component: resolve => require(['../components/page/outStoreHistory.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '待归还',
                    path: '/returnStore',
                    component: resolve => require(['../components/page/returnStore.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '归还历史',
                    path: '/returnHistory',
                    component: resolve => require(['../components/page/returnHistory.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '待盘点',
                    path: '/waitForCheck',
                    component: resolve => require(['../components/page/waitForCheck.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '盘点历史',
                    path: '/checkHistory',
                    component: resolve => require(['../components/page/checkHistory.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '历史案卷',
                    path: '/history',
                    component: resolve => require(['../components/page/history.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '存储设备设置',
                    path: '/storeLocation',
                    component: resolve => require(['../components/page/storeLocation.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '部门设置',
                    path: '/bumenAdmin',
                    component: resolve => require(['../components/page/bumenAdmin.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '职位设置',
                    path: '/zhiweiAdmin',
                    component: resolve => require(['../components/page/zhiweiAdmin.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '人员设置',
                    path: '/userAdmin',
                    component: resolve => require(['../components/page/userAdmin.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '摄像头设置',
                    path: '/camera',
                    component: resolve => require(['../components/page/camera.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '操作记录',
                    path: '/actionHistory',
                    component: resolve => require(['../components/page/actionHistory.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '档案分析',
                    path: '/danganfenxi',
                    component: resolve => require(['../components/page/danganfenxi.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '案卷操作记录',
                    path: '/actionHistory',
                    component: resolve => require(['../components/page/actionHistory.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '现场还原',
                    path: '/videoHistory',
                    component: resolve => require(['../components/page/videoHistory.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '借阅总结',
                    path: '/jieyuezongjie',
                    component: resolve => require(['../components/page/jieyuezongjie.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '年度总结',
                    path: '/nianzhongzongjie',
                    component: resolve => require(['../components/page/nianzhongzongjie.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '历史沿革',
                    path: '/lishiyange',
                    component: resolve => require(['../components/page/lishiyange.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '案件查询',
                    path: '/anjianchaxun',
                    component: resolve => require(['../components/page/anjianchaxun.vue'], resolve) // Vue-Quill-Editor组件
                },
                {
                    name: '打印测试',
                    path: '/printTest',
                    component: resolve => require(['../components/page/printTest.vue'], resolve) // Vue-Quill-Editor组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})