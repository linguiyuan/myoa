<template>
    <div id='nowtimeOrders' class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：实时数据</p>
        <div class="da_header">
            <p>查询时间：</p>
            <el-date-picker
                v-model="queryTime "
                type="daterange"
                align="left"
                unlink-panels
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" style='margin-left: 15px;' @click='getEveryDay'>点击搜索</el-button>
            <p class="shortcut">
                <span @click='getAxios("time=today",1)' :class="{activate:at==1?true:false}">今日</span>
                <span @click='getAxios("time=yesterday",2)' :class="{activate:at==2?true:false}">昨日</span>
                <span @click='getAxios("time=this_month",3)' :class="{activate:at==3?true:false}">本月</span>
                <span @click='getAxios("time=last_month",4)' :class="{activate:at==4?true:false}">上月</span>
            </p>
        </div>
        <template>
            <el-table
                :data="content"
                stripe
                v-loading="loading"
                height="450"
                style="width: 100%">
                <el-table-column
                 prop="device"
                 label="设备">
                    <template slot-scope="scope">
                        <input
                            type="text"
                            v-model="scope.row['device']"
                            class='device'
                            v-on:blur="changeCount(scope.row['device'],scope.row['account'])" :disabled="scope.row['account']=='总和'?true:false">
                    </template>
                </el-table-column>
                <el-table-column
                    prop="account"
                    label="账号">
                    <template slot-scope="scope">
                        <span>{{scope.row['account'] | getName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="payment"
                    label="付款金额"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="balance"
                    label="结算金额"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="effect"
                    label="效果预估"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="estimate"
                    label="结算预估"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="valid"
                    label="有效订单"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="settlementOrders"
                    label="结算订单"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="goods"
                    label="有效商品"
                    min-width="100">
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'datadtatistics',
        data() {
            return {
                queryTime:'',
                content:null,
                at:'',
                loading:true,
                token:sessionStorage.getItem('token'),
                uid:sessionStorage.getItem('uid')
            }
        },
        mounted: function () {
            this.getAxios()
        },
        computed: {},
        methods:{
            getEveryDay: function () {
                let vm = this;
                vm.at = null;
                vm.getAxios({
                    start_time:vm.queryTime[0],
                    end_time:vm.queryTime[1],
                    token:vm.token,
                    uid:vm.uid
                })
            },
            getAxios: function (data,nb) {
                let vm = this;
                vm.loading = true;
                data = vm.$qs.parse(data);
                if(nb){
                    vm.at = nb;
                }
                if(!data){
                    data = {
                        token:vm.token,
                        uid:vm.uid
                        }
                }else if(!data.token){
                    data.token = vm.token;
                    data.uid = vm.uid
                }
                vm.$axios({
                    method:'post',
                    url:window.$g_Api + '/oa/datastatistics1',
                    data:data
                })
                    .then(function(res){
                        vm.loading = false;
                        vm.content = res.data.data
                    })
                    .catch(function(err){});
            },
            changeCount: function (device,account) {
                let vm = this;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api + '/oa/device',
                    data:{
                            device:device,
                            account:account,
                            token:vm.token,
                            uid:vm.uid
                    }
                })
                   .then(function(res){
                       if(res.data.code == 1){
                           vm.$message.error('修改失败')
                       }
                   })
                   .catch(function(err){});
            }
        }
    }

</script>


<style lang='scss' scoped>
    #nowtimeOrders{
        table,thead,tbody,tr,th,td{
            border: 1px solid #dedede;
            white-space:nowrap;
        }
        .da_header{
            display: flex;
            justify-content: flex-start;
            height: 32px;
            line-height: 32px;
            margin-bottom: 20px;
            .shortcut{
                margin-left: 40px;
                span{
                    display: inline-block;
                    width: 50px;
                    color: #409eff;
                    &:hover{
                        cursor: pointer;
                    }
                }
                .activate{
                    color: #e6a23c;
                }
            }
        }
        .device{
            width: 100%;
            background-color: transparent;
            border:none;
            color: #606266;
            font-size: 12px;
        }
    }
</style>
