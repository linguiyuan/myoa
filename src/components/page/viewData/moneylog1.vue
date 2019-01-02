<template>
    <div id="moneylog" class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据统计 > 转账记录</p>
        <div class="da_header">
            <div class="header_l">
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
                <el-button type="primary" style='margin: 0px 20px;' @click='getData(queryTime[0],queryTime[1])'>点击搜索</el-button>
                <template>
                    <el-radio-group v-model="radio" style='margin-top: 10px !important;'>
                        <el-radio :label="'payment_all'">全部</el-radio>
                        <el-radio :label="'payment_succ'">成功</el-radio>
                        <el-radio :label="'payment_fail'">失败</el-radio>
                    </el-radio-group>
                </template>
            </div>
            <el-button type="warning" @click='export2Excel'>导出excel表格</el-button>
        </div>
        <div class="logBox">
            <table class='logtable' v-if='result' v-loading='loading'>
                <thead>
                <tr>
                    <th>金额</th>
                    <th>账号</th>
                    <th>交易转态</th>
                    <th>姓名</th>
                    <th>设备信息</th>
                    <th>交易编号</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for='(data,index) in result' :key='index' :class='{"error":data.status=="转账成功"?false:true}'>
                    <td>{{data.amount}}</td>
                    <td>{{data.account}}</td>
                    <td>{{data.status}}</td>
                    <td>{{data.name}}</td>
                    <td>{{data.remark}}</td>
                    <td>{{data.out_biz_no}}</td>
                </tr>
                </tbody>
            </table>
            <p v-else style='width: 100%;text-align: center;'>暂无数据</p>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name:'moneylog',
        data: function () {
            return {
                queryTime:null,
                result:null,
                loading:false,
                token:sessionStorage.getItem('token'),
                uid:sessionStorage.getItem('uid'),
                radio:'payment_all'
            }
        },
        mounted: function () {
            this.getData();
        },
        methods:{
            getData: function (time1,time2) {
                let vm = this;
                vm.loading = true;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/moneylog1',
                    data:{
                        start_time:time1,
                        end_time:time2,
                        token:vm.token,
                        uid:vm.uid,
                        type:vm.radio
                    }
                })
                   .then(function(res){
                       vm.loading = false;
                       if(res.data.code == 0){
                           vm.result = res.data.data;
                       }else {
                           vm.$message.error(res.data.message);
                       }
                   })
                   .catch(function(err){});
            },
            export2Excel() {
                if(this.result){
                    require.ensure([], () => {
                        const { export_json_to_excel } = require('@/vendor/Export2Excel');
                        const tHeader = ['金额', '账号', '交易状态', '姓名','设备信息', '交易编号']; //对应表格输出的title
                        const filterVal = ['amount', 'account', 'status', 'name','remark', 'out_biz_no']; // 对应表格输出的数据
                        const list = this.result;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, '列表excel'); //对应下载文件的名字
                    })
                }else {
                    return false
                }

            },
            formatJson(filterVal,jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    #moneylog{
        table{
        border-collapse: collapse;
        }
        table,thead,tbody,tr,th,td{
        border: 1px solid #dedede;
        white-space:nowrap;
        }
        .logBox{
            width: 100%;
            background-color: #ffffff;
            padding: 10px;
            border-radius:20px;
            height: 80%;
            overflow-y: auto;
        }
        .logtable{
            width: 100%;
            margin-top: 20px;
            th,td{
                padding: 0px 6px;
                height: 32px;
                line-height: 32px;
            }
            tbody{
                tr:hover{
                    cursor: pointer;
                    background-color: rgba(204,204,204,0.3)
                }
            }
            .error{
                color:red;
            }
        }
        .da_header{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 10px;
            height: 32px;
            line-height: 32px;
            margin-bottom: 20px;
            .header_l{
                display: flex;
                justify-content: flex-start;
                line-height: 32px;
            }
        }
    }
</style>

