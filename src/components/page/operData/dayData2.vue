<template>
    <div id='everyDayOrders' class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：每日数据</p>
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
                <span @click='getAxios({"dbname":"amount","start_time":queryTime[0],"end_time":queryTime[1]},1)' :class="{activate:at==1?true:false}">付款金额</span>
                <span @click='getAxios({"dbname":"settlement","start_time":queryTime[0],"end_time":queryTime[1]},2)' :class="{activate:at==2?true:false}">结算金额</span>
                <span @click='getAxios({"dbname":"est_effect","start_time":queryTime[0],"end_time":queryTime[1]},3)' :class="{activate:at==3?true:false}">效果预估</span>
                <span @click='getAxios({"dbname":"set_effect","start_time":queryTime[0],"end_time":queryTime[1]},4)' :class="{activate:at==4?true:false}">结算预估</span>
                <span @click='getAxios({"dbname":"effective_order","start_time":queryTime[0],"end_time":queryTime[1]},5)' :class="{activate:at==5?true:false}">订单数量</span>
            </p>
        </div>
        <div class="my_table_box">
            <!--<table class="my_table">-->
                <!--<thead>-->
                <!--<tr>-->
                    <!--<th v-for='(item,index) in title' :key='index'>{{item}}</th>-->
                <!--</tr>-->
                <!--</thead>-->
                <!--<tbody>-->
                <!--<tr v-for='(value,index) in content' :key='index'>-->
                    <!--<td v-for='(val,i) in value' :key='i'>{{val}}</td>-->
                <!--</tr>-->
                <!--</tbody>-->
            <!--</table>-->
            <!--<table class="my_table ps">-->
                <!--<thead>-->
                <!--<tr>-->
                    <!--<th v-for='(item,index) in title' :key='index'>{{item}}</th>-->
                <!--</tr>-->
                <!--</thead>-->
                <!--<tbody>-->
                <!--<tr v-for='(value,index) in content' :key='index'>-->
                    <!--<td>{{value[0]}}</td>-->
                    <!--<td>{{value[1]}}</td>-->
                <!--</tr>-->
                <!--</tbody>-->
            <!--</table>-->
            <template>
                <el-table
                    :data="content"
                    stripe
                    height="450"
                    v-loading='loading'
                    style="width: 100%">
                    <el-table-column v-for='(value,key,index) in title' :key='index'
                        highlight-current-row= true
                        :fixed='index<2?true:false'
                        :label="value">
                        <template slot-scope="scope">
                            <input
                                v-if="key == 't0'"
                                class='device'
                                :disabled="scope.row['t1']=='总和'?true:false"
                                v-model="scope.row[key]"
                                v-on:blur="changeCount(scope.row[key],scope.row['t1'])">
                            <span v-else-if="key == 't1'">{{scope.row[key] | getName}}</span>
                            <span v-else >
                                {{scope.row['t'+index]}}
                                <sup
                                    :class="(scope.row['t'+index]-scope.row['t'+(index+1)]>0?'sub1':'sub2')"
                                    style='margin-left: 6px;'>{{[(scope.row['t'+index]),(scope.row['t'+(index+1)])] | setSub()}}
                                </sup>
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'dashboard',
        data() {
            return {
                queryTime:'',
                title:null,
                content:null,
                propArr:[],
                at:null,
                loading:true,
            }
        },
        mounted: function () {
            this.getAxios()
        },
        computed:{
            data: function (key,the,last) {

            },
        },
        computed: {},
        methods:{
            getEveryDay: function () {
                let vm = this;
                vm.at = null
                vm.getAxios({
                    start_time:vm.queryTime[0],
                    end_time:vm.queryTime[1]
                })
            },
            getAxios: function (data,nb) {
                let vm = this;
                vm.loading = true;
                if(nb){
                    vm.at = nb;
                }
                if(!data){
                    data = {token:sessionStorage.getItem('token')}
                }
                vm.$axios({
                    method:'post',
                    url:window.$g_Api + '/oa/daydata',
                    data:data
                })
                    .then(function(res){
                        // let obj1={};
                        // let arr = [];
                        // for(let i = 0 ,len = res.data.content.length ; i < len; i++){
                        //     let obj={};
                        //     for(let e = 0 ,len =res.data.content[i].length  ; e < len; e++){
                        //         obj['t'+e] = res.data.content[i][e];
                        //     }
                        //     arr.push(obj);
                        // }
                        // for(let i = 0 ,len = res.data.title.length ; i < len; i++){
                        //     obj1['t'+i] = res.data.title[i];
                        // }
                        vm.loading = false;
                        if(res.data.code == 0){
                            vm.content = res.data.data.content;
                            vm.title = res.data.data.title;
                        }else {
                            vm.$message.error(res.data.message);
                        }

                    })
                    .catch(function(err){});
            },
            changeCount: function (device,account) {
                let vm = this;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api + '/oa/device',
                    data:{
                        data:{
                            device:device,
                            account:account,
                            token:sessionStorage.getItem('token')
                        }
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
    #everyDayOrders{
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
                    padding: 0px 20px;
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
        .my_table_box{
            width: 100%;
            height: 100%;
            div.cell{
                white-space:nowrap !important;
            }
            thead{
                th{
                    background-color: #50bfff;
                }
            }
            .sub1{
                color: #f56c6c;
            }
            .sub2{
                color: #5daf34;
            }
            .device{
                width: 100%;
                background-color: transparent;
                border:none;
                color: #606266;
                font-size: 12px;
            }
        }
    }
</style>
