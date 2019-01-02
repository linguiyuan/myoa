<template>
    <div id='oacustomer' class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据统计 > 客户人数</p>
        <!--<el-button type="primary" style="margin-bottom:10px" @click="dialogVisible = true">添加</el-button>-->
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
            <el-button type="primary" style='margin-left: 15px;' @click='getEveryDay'>点击搜索</el-button>
        </div>
        <div class="my_table_box">
            <template>
                <el-table
                    :data="content"
                    stripe
                    height="80%"
                    style="width: 100%">
                    <el-table-column v-for='(value,key,index) in title' :key='index'
                                     highlight-current-row= true
                                     :fixed='index<1?true:false'
                                     :label="value"
                                     :min-width="index==1?'180':'160'">
                        <template slot-scope="scope">
                            <span v-if="key == 't0'">{{scope.row[key]}}</span>
                            <span v-else style='display: block;width: 100%;height: 100%;'>
                                {{scope.row['t'+index]}}
                                <sup
                                    :class="(scope.row['t'+index]-scope.row['t'+(index+1)]>0?'sub1':'sub2')"
                                    style='margin-left: 6px;'>{{[(scope.row['t'+index]),(scope.row['t'+(index+1)])] | setSub1()}}
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
        name: 'oacustomer',
        data() {
            return {
                token:sessionStorage.getItem('token'),
                uid:sessionStorage.getItem('uid'),
                title:null,
                content:null,
                propArr:[],
                dialogVisible: false,
                dialogVisible1: false,
                at:null,
                queryTime:[],
                options:[],
                group_id:'',
            }
        },
        mounted: function () {
            this.getAxios();
            this.getoptions();
        },
        computed: {},
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
            getEveryDay: function () {
                let vm = this;
                vm.at = null
                vm.getAxios({
                    token:vm.token,
                    uid:vm.uid,
                    start_time:vm.queryTime[0],
                    end_time:vm.queryTime[1],
                    group_id:vm.group_id,
                })
            },
            getAxios: function (data,nb) {
                let vm = this;
                if(nb){
                    vm.at = nb;
                }
                if(!data){
                    data = {token:vm.token,uid:vm.uid,group_id:vm.group_id,}
                }
                vm.$axios({
                    method:'post',
                    url:window.$g_Api + '/oa/oacustomer1',
                    data:data
                })
                    .then(function(res){
                        if(res.data.code == 0){
                            vm.content = res.data.data.content;
                            vm.title = res.data.data.title;
                        }else {
                            vm.$message.error(res.data.message);
                        }

                    })
                    .catch(function(err){});
            },
        }
    }

</script>


<style lang='scss' scoped>
    #oacustomer{
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
