
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
            }
        },
        computed: {
            onRoutes() {
                // if(typeof this.$route.path == 'string'){
                //     console.log(this.$route.meta.position);
                //     bus.$emit('position',this.$route.meta.position)
                // }
                if(this.$route.path == '/devinfo'){
                    return 'device';
                }else {
                    return this.$route.path.replace('/', '');
                }
            },
            items(){
                let arr = [
                    {
                        icon: 'myiconfont iconcheliangguanli',
                        index: 'item',
                        title: this.$t('message.sidebar.fleets'),
                    },
                    {
                        icon: 'myiconfont iconshebeiguanli',
                        index: 'device',
                        title: this.$t('message.sidebar.devices'),
                    },
                    {
                        icon: 'myiconfont iconluntai',
                        index: '1',
                        title: this.$t('message.sidebar.tiresManage'),
                        subs:[
                            {
                                index: 'tyres',
                                title: this.$t('message.sidebar.brand'),
                            },
                            {
                                index:'tyrelist',
                                title:this.$t('message.sidebar.tiresList')
                            }
                        ]
                    },
                    {
                        icon: 'myiconfont icontongji',
                        index: '2',
                        title: this.$t('message.sidebar.generalStatistics'),
                        subs:[
                            {
                                index: 'mileage_st',
                                title: this.$t('message.sidebar.kilometers1'),
                            },
                            {
                                index:'mileage_detail',
                                title:this.$t('message.sidebar.kilometers2')
                            },
                            {
                                index:'alarm_st',
                                title:this.$t('message.sidebar.alarmsStatistics')
                            },
                            {
                                index:'anomalous',
                                title:this.$t('message.sidebar.abnormal')
                            }
                        ]
                    },
                    {
                        icon: 'myiconfont iconbaojing',
                        index: 'alarm',
                        title: this.$t('message.sidebar.alarmsManagement'),

                    },
                    {
                        icon: 'myiconfont iconzhanghaoguanli',
                        index: 'usercenter',
                        title: this.$t('message.sidebar.accountsManagement'),
                    }

                ]
                if(sessionStorage.getItem('usertype') == 100){
                    arr.push({
                        icon: 'myiconfont iconxitongguanli',
                        index: '3',
                        title: this.$t('message.sidebar.systemSetting'),
                        subs:[
                            {
                                index: 'company',
                                title: this.$t('message.sidebar.companyManagement'),
                            },
                            {
                                index: 'device_warehousing',
                                title: this.$t('message.sidebar.devicesRegistration'),
                            },
                            {
                                index: 'dev_distribution',
                                title: this.$t('message.sidebar.devicesAssign'),
                            },
                            {
                                index: 'dev_del',
                                title: this.$t('message.sidebar.clearData'),
                            },
                            {
                                index: 'dev_revise',
                                title: this.$t('message.sidebar.devicesCategorychange'),
                            },
                            {
                                index:'setserver',
                                title: this.$t('message.sidebar.setserver'),
                            },
                            {
                                index:'remoteUpgrade',
                                title: this.$t('message.sidebar.remoteUpgrade'),
                            },
                            {
                                index:'devlog',
                                title: this.$t('message.sidebar.devicesDiary'),
                            },
                        ]
                    })
                }
                return arr
            }
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });
            // let power = JSON.parse(sessionStorage.getItem('auth'));
        },
    }
</script>

<style>
    .sidebar {
        display: block;
        min-width: 180px;
        /*position: absolute;*/
        /*left: 0;*/
        /*top: 70px;*/
        /*bottom: 0;*/
        overflow-y: auto;
        height: 100%;
        z-index: 99;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        min-width: 180px;
    }

    .sidebar > ul {
        height: 100%;
        overflow-y: scroll;
    }
    .el-menu-item{
        height: 48px;
        line-height: 48px;
        min-width: 100px !important;
    }
    .el-submenu__title{
        height: 48px;
        line-height: 48px;
    }
    .el-submenu .el-menu-item{
        height: 40px;
        line-height: 40px;
    }
</style>
