<template>
    <div id="order1" class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据管理 > 订单比</p>
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
            <template>
                <el-select v-model="group_id" placeholder="请选择小组" style='margin-left: 12px;'>
                    <el-option
                        v-for="item in options"
                        :key="item.group_id"
                        :label="item.group_name"
                        :value="item.group_id">
                    </el-option>
                </el-select>
            </template>
            <el-button type="primary" style='margin-left: 15px;' @click='getOrderlist()'>点击搜索</el-button>
            <p class="shortcut">
                <span @click='getOrderlist("today",1)' :class="{activate:at==1?true:false}">今日</span>
                <span @click='getOrderlist("yesterday",2)' :class="{activate:at==2?true:false}">昨日</span>
                <span @click='getOrderlist("this_month",3)' :class="{activate:at==3?true:false}">本月</span>
                <span @click='getOrderlist("last_month",4)' :class="{activate:at==4?true:false}">上月</span>
            </p>
        </div>
        <template>
            <el-table
                :data="tableData"
                stripe
                height='80%'
                style="width: 100%"
                v-loading='loading'>
                <el-table-column
                    prop="device"
                    label="设备"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="account"
                    label="账号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="order_ratio1"
                    label="订单比">
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name:'order1',
        data: function () {
            return{
                token:sessionStorage.getItem('token'),
                uid:sessionStorage.getItem('uid'),
                tableData:[],
                queryTime:null,
                at:'',
                loading:true,
                options:[],
                group_id:'',
            }
        },
        mounted: function () {
            this.getOrderlist();
            this.getoptions();
        },
        methods:{
            getoptions: function () {
                let vm = this;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/get_group_info',
                    data:{
                        token:vm.token,
                        uid:vm.uid
                    }
                })
                    .then(function(res){
                        vm.options = res.data.data;
                    })
                    .catch(function(err){});
            },
            getOrderlist: function (data,nb) {
                let vm = this;
                let d = {
                    token:vm.token,
                    uid:vm.uid,
                    group_id:vm.group_id,
                }
                if(vm.queryTime){
                    d.start_time = vm.queryTime[0];
                    d.end_time = vm.queryTime[1];
                }
                if(data){
                    d.time = data
                    vm.at = nb;
                }
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/order1',
                    data:d
                })
                    .then(function(res){
                        vm.loading = false;
                        if(res.data.code == 0){
                            vm.tableData = res.data.data;
                            for(let i = 0 ,len = res.data.data.length ; i < len; i++){
                                res.data.data[i]['order_ratio1'] = ((res.data.data[i]['order_ratio1']*100).toFixed(2))+"%"
                            }
                        }else {
                            vm.$message.error(res.data.message);
                        }
                    })
                    .catch(function(err){
                        vm.$message.error(err);
                    });
            },
            getTimedata: function () {
                this.getOrderlist({
                    start_time:this.queryTime[0],
                    end_time:this.queryTime[1],})
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
#order1{
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
}
</style>


