<template>
    <div id="accountoutput" class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据管理 > 账号产出</p>
        <div class="pro_head">
            <span style='margin-right: 15px;line-height: 32px;'>选择时间段</span>
            <el-date-picker
                v-model="year"
                type="year"
                placeholder="选择年">
            </el-date-picker>
            <el-button type="primary" style='margin-left: 20px;'>查询</el-button>
        </div>
        <div style='width: 100%;height: 32px;margin-bottom: 10px;'>
            <el-button @click='setoutput' style='float: right;' type="primary" v-loading='loading'>保存更新</el-button>
        </div>
        <template>
            <el-table
                :data="tableData"
                height="80%"
                border
                stripe
                highlight-current-row
                style="width: 100%;font-size: 14px;white-space: nowrap">
                <el-table-column
                    prop="account"
                    label='账户'>
                </el-table-column>
                <el-table-column
                    v-for='i in mont'
                    :key='i'
                    :label= "i+'月'">
                    <template slot-scope='scope'>
                        <input style='width: 100%;border:none;height: 24px;' type="text" @blur='iptBlur' v-model='inpvalue' v-if='scope.row.account == ifaccount && i == ifm'>
                        <span class='showbox' @click='showbox(scope.row.account,i,scope.row.data["m"+i])' v-else>{{scope.row.data['m'+i]}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!--<el-dialog title="产出修改" :visible.sync="dialogFormVisible" width='500px'>-->
            <!--<el-form :model="form" v-loading='loading'>-->
                <!--<el-form-item label='时间' label-width="120px">-->
                    <!--<el-input v-model="form.month" style='width: 203px;' disabled></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="账号" label-width="120px">-->
                    <!--<el-input type="input" v-model="form.account" style='width: 203px;' disabled></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="产出值" label-width="120px">-->
                    <!--<el-input type="input" v-model="form.account_data" style='width: 203px;'></el-input>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
            <!--<div slot="footer" class="dialog-footer">-->
                <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
                <!--<el-button type="primary" @click='setoutput'>确 定</el-button>-->
            <!--</div>-->
        <!--</el-dialog>-->
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name:'accountoutput',
        data: function () {
            return {
                token: sessionStorage.getItem('token'),
                uid: sessionStorage.getItem('uid'),
                year:(new Date()).getFullYear()+'',
                tableData:[],
                mont:[1,2,3,4,5,6,7,8,9,10,11,12],
                loading:false,
                form:{},
                dialogFormVisible:false,
                ifaccount:'',
                ifm:'',
                inpvalue:'',
                laoding:false,
            }
        },
        mounted: function () {
            // this.mont = ['1','2','3','4','5','6','7','8','9','10','11','12'];
            this.getaccountlist();
        },
        methods:{
            getaccountlist: function () {
                let vm = this;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/get_account_output',
                    data:{
                        token: vm.token,
                        uid: vm.uid,
                        year:vm.year
                    }
                })
                   .then(function(res){
                       vm.tableData = res.data.data;
                   })
                   .catch(function(err){});
            },
            showbox: function (account,i,value) {
                this.ifaccount = account;
                this.ifm = i;
                this.inpvalue = value
                // this.dialogFormVisible = true;
                // this.form = {
                //     month:this.year+'-'+i,
                //     account:account,
                //     account_data:value
                // }
            },
            iptBlur: function () {
                let vm = this;
                for(let i = 0 ,len = vm.tableData.length ; i < len; i++){
                    if(vm.tableData[i].account == vm.ifaccount){
                        vm.tableData[i].data['m'+vm.ifm] = Number(vm.inpvalue)
                    }
                }
            },
            setoutput: function () {
                let vm = this;
                vm.loading = true;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/holder/record_account_output',
                    data:{
                        token:vm.token,
                        uid:vm.uid,
                        year:vm.year,
                        data:vm.tableData
                    }
                })
                   .then(function(res){
                       vm.getaccountlist();
                       vm.loading = false;
                       if(res.data.code == 0){
                           vm.$message.success(res.data.message)
                       }else {
                           vm.$message.error(res.data.message)
                       }
                   })
                   .catch(function(err){});
            },
        }
    }
</script>


<style lang="scss" type="text/scss" scoped>
#accountoutput{
    .pro_head{
        margin-bottom: 8px;
    }
    .showbox{
        display: block;
        width: 100%;
        height: 24px;
        &:hover{
            cursor: pointer;
        }
    }
}
</style>

