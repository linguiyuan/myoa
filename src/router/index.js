import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/monitor'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/monitor',
                    component: resolve => require(['../components/page/viewData/monitor.vue'], resolve),
                    meta: { title: '大屏监控' }
                },
                {
                    path: '/daydata1',
                    component: resolve => require(['../components/page/viewData/dayData1.vue'], resolve),
                    meta: { title: '每日数据1' }
                },
                // {
                //     path: '/oacustomer1',
                //     component: resolve => require(['../components/page/viewData/oacustomer1.vue'], resolve),
                //     meta: { title: '客户人数1' }
                // },
                // {
                //     path: '/order1',
                //     component: resolve => require(['../components/page/viewData/order1.vue'], resolve),
                //     meta: { title: '订单比1'}
                // },
                // {
                //     path: '/achievement1',
                //     component: resolve => require(['../components/page/viewData/achievement1.vue'], resolve),
                //     meta: { title: '员工绩效1'}
                // },
                // {
                //     path: '/profits1',
                //     component: resolve => require(['../components/page/viewData/profits1.vue'], resolve),
                //     meta: { title: '股东收益1'}
                // },
                // {
                //     path: '/devices1',
                //     component: resolve => require(['../components/page/viewData/devices1.vue'], resolve),
                //     meta: { title: '设备管理1'}
                // },
                // {
                //     path: '/moneylog1',
                //     component: resolve => require(['../components/page/viewData/moneylog1.vue'], resolve),
                //     meta: { title: '转账记录' }
                // },
                // {
                //     path: '/groupdata',
                //     component: resolve => require(['../components/page/viewData/groupdata.vue'], resolve),
                //     meta: { title: '分组数据' }
                // },
                // {
                //     path: '/datastatistics2',
                //     component: resolve => require(['../components/page/operData/dataDtatistics2.vue'], resolve),
                //     meta: { title: '实时数据2' }
                // },
                // {
                //     path: '/daydata2',
                //     component: resolve => require(['../components/page/operData/dayData2.vue'], resolve),
                //     meta: { title: '每日数据2' }
                // },
                // {
                //     path: '/oacustomer2',
                //     component: resolve => require(['../components/page/operData/oacustomer2.vue'], resolve),
                //     meta: { title: '客户人数2' }
                // },
                // {
                //     path: '/achievement2',
                //     component: resolve => require(['../components/page/operData/achievement2.vue'], resolve),
                //     meta: { title: '员工绩效2'}
                // },
                // {
                //     path: '/profits2',
                //     component: resolve => require(['../components/page/operData/profits2.vue'], resolve),
                //     meta: { title: '股东管理'}
                // },
                // {
                //     path: '/money',
                //     component: resolve => require(['../components/page/operData/money.vue'], resolve),
                //     meta: { title: '新建转账' }
                // },
                // {
                //     path: '/devices2',
                //     component: resolve => require(['../components/page/operData/devices2.vue'], resolve),
                //     meta: { title: '设备管理2'}
                // },
                // {
                //     path: '/groupmanagement',
                //     component: resolve => require(['../components/page/operData/groupmanagement.vue'], resolve),
                //     meta: { title: '分组管理'}
                // },
                // {
                //     path: '/usercenter',
                //     component: resolve => require(['../components/page/operData/usercenter.vue'], resolve),
                //     meta: { title: '用户中心'}
                // },
                // {
                //     path: '/devicestate',
                //     component: resolve => require(['../components/page/operData/devicestate.vue'], resolve),
                //     meta: { title: '设备推广'}
                // },
                // {
                //     path: '/accountoutput',
                //     component: resolve => require(['../components/page/operData/accountoutput.vue'], resolve),
                //     meta: { title: '账号产出'}
                // },
                // {
                //     // 权限页面
                //     path: '/manage',
                //     component: resolve => require(['../components/page/manage.vue'], resolve),
                //     meta: { title: '用户管理'}
                // },
                // {
                //     path: '/operationlog',
                //     component: resolve => require(['../components/page/operationlog.vue'], resolve),
                //     meta: { title: '操作日志'}
                // },
                // {
                //     path: '/403',
                //     component: resolve => require(['../components/page/403.vue'], resolve),
                //     meta: { title: '更新日志'}
                // },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
