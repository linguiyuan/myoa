import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/item',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/item',
                    name:'Tiem',
                    component: resolve => require(['../components/page/viewData/item.vue'], resolve),
                    meta: { title: '车队管理' ,position:'车辆与轮胎 > 车队管理'},
                },
                {
                    path: '/tyres',
                    component: resolve => require(['../components/page/viewData/tyres.vue'], resolve),
                },
                {
                    path: '/tiremodel',
                    name:'tiremodel',
                    component: resolve => require(['../components/page/viewData/tiremodel.vue'], resolve),
                },
                {
                    path: '/alarm',
                    component: resolve => require(['../components/page/viewData/alarm.vue'], resolve),
                },
                {
                    path: '/device',
                    component: resolve => require(['../components/page/viewData/device.vue'], resolve),
                },
                {
                    path: '/device_warehousing',
                    component: resolve => require(['../components/page/viewData/device_warehousing.vue'], resolve),
                },
                {
                    path: '/devinfo',
                    name:'devinfo',
                    component: resolve => require(['../components/page/viewData/devinfo.vue'], resolve),
                },
                {
                    path: '/sensor',
                    component: resolve => require(['../components/page/viewData/sensor.vue'], resolve),
                },
                {
                    path: '/service',
                    component: resolve => require(['../components/page/viewData/service.vue'], resolve),
                },
                {
                    path: '/electronicFence',
                    component: resolve => require(['../components/page/viewData/electronicFence.vue'], resolve),
                },
                {
                    path: '/mileage_st',
                    component: resolve => require(['../components/page/viewData/mileage_st.vue'], resolve),
                },
                {
                    path: '/alarm_st',
                    component: resolve => require(['../components/page/viewData/alarm_st.vue'], resolve),
                },
                {
                    path: '/replace_dev_st',
                    component: resolve => require(['../components/page/viewData/replace_dev_st.vue'], resolve),
                },
                {
                    path: '/cancel_st',
                    component: resolve => require(['../components/page/viewData/cancel_st.vue'], resolve),
                },
                {
                    path: '/statistics',
                    component: resolve => require(['../components/page/viewData/statistics.vue'], resolve),
                },
                {
                    path: '/usercenter',
                    component: resolve => require(['../components/page/viewData/usercenter.vue'], resolve),
                },
                {
                    path: '/company',
                    component: resolve => require(['../components/page/viewData/company.vue'], resolve),
                },
                {
                    path: '/devlog',
                    component: resolve => require(['../components/page/viewData/devlog.vue'], resolve),
                },
                {
                    path: '/user',
                    component: resolve => require(['../components/page/viewData/user.vue'], resolve),
                },
                {
                    path: '/loginHistory',
                    component: resolve => require(['../components/page/viewData/loginHistory.vue'], resolve),
                },
                {
                    path: '/tyrelist',
                    component: resolve => require(['../components/page/viewData/tyrelist'], resolve),
                },
                {
                    path: '/mileage_detail',
                    component: resolve => require(['../components/page/viewData/mileage_detail'], resolve),
                },
                {
                    path: '/anomalous',
                    component: resolve => require(['../components/page/viewData/anomalous'], resolve),
                },
                {
                    path: '/dev_distribution',
                    component: resolve => require(['../components/page/viewData/dev_distribution'], resolve),
                },{
                    path: '/dev_del',
                    component: resolve => require(['../components/page/viewData/dev_del'], resolve),
                },
                {
                    path: '/dev_revise',
                    component: resolve => require(['../components/page/viewData/dev_revise'], resolve),
                },
                {
                    path: '/setserver',
                    component: resolve => require(['../components/page/viewData/setserver'], resolve),
                },
                {
                    path: '/remoteUpgrade',
                    component: resolve => require(['../components/page/viewData/remoteUpgrade'], resolve),
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
