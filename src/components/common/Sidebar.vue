<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon" style='color: rgb(191, 203, 217);margin-right: 4px;'></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <!--<el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" v-show='subItem.power'>-->
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <!--<el-menu-item :index="item.index" :key="item.index" v-show='item.power'>-->
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon" style='color: rgb(191, 203, 217);margin-right: 4px;'></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: []
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });
            // let power = JSON.parse(sessionStorage.getItem('auth'));
            let power = {};
            let item = [
                {
                    icon: 'fontfamily te-oa-icon-test',
                    index: 'monitor',
                    title: '大屏监控',
                },
                {
                    icon: 'fontfamily te-oa-shujuguanli',
                    index: '3',
                    title: '数据管理',
                    subs: [
                        {
                            index: 'oacustomer2',
                            title: '客户人数',
                            power: power.oacustomer2
                        },
                        {
                            index: 'achievement2',
                            title: '员工绩效',
                            power: power.achievement2

                        },
                        {
                            index: 'profits2',
                            title: '股东管理',
                            power: power.profits2

                        },
                        {
                            index: 'money',
                            title: '新建转账',
                            power: power.money,

                        },
                        {
                            index: 'devices2',
                            title: '设备管理',
                            power: power.devices2,

                        },
                        {
                            index: 'devicestate',
                            title: '设备推广',
                            power: power.devicestate,
                        },
                        {
                            index: 'groupmanagement',
                            title: '分组管理',
                            power: power.groupmanagement,
                        },
                        {
                            index: 'accountoutput',
                            title: '账号产出',
                            power: power.accountoutput,
                        },
                    ]
                },
                {
                    icon: 'fontfamily te-oa-quanxian',
                    index: 'manage',
                    title: '用户管理',
                    power: power.manage
                },
                {
                    icon: 'fontfamily te-oa-rizhi',
                    index: 'operationlog',
                    title: '操作日志',
                    power: power.operationlog,

                },
                {
                    icon: 'fontfamily te-oa-rizhi',
                    index: '403',
                    title: '更新日志',
                    power: true,

                },
            ];
            // if(!power.datastatistics1 && !power.daydata1 && !power.oacustomer1 && !power.order1 && !power.achievement1 && !power.profits1 && !power.moneylog1 && !power.devices1){
            //     item.splice(0,1);
            //     if(!power.oacustomer2 && !power.order2 && !power.achievement2 && !power.profits2 && !power.money && !power.devices2){
            //         item.splice(0,1);
            //     };
            // }else {
            //     if(!power.oacustomer2 && !power.order2 && !power.achievement2 && !power.profits2 && !power.money && !power.devices2){
            //         item.splice(1,1);
            //     };
            // };
            console.log(item);
            this.items =item;
        },
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 170px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
