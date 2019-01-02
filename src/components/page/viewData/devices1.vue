<template>
    <div id="devices1"class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据统计 > 设备管理</p>
        <template v-loading='loading'>
            <el-table
                :data="deviceList"
                height="80%"
                border
                style="width: 100%">
                <el-table-column
                    prop="sequence"
                    width='50'
                    label="序号">
                </el-table-column>
                <el-table-column
                    prop="belong_to_whom"
                    label="分组">
                </el-table-column>
                <el-table-column
                    label="状态">
                    <template slot-scope='scope'>
                        <span style='color: #E6A23C;' v-if='scope.row.is_promoting == "完成推广"'>{{scope.row.is_promoting}}</span>
                        <span v-else>{{scope.row.is_promoting}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="device"
                    label="设备">
                </el-table-column>
                <el-table-column
                    prop="wechat_id"
                    label="微信号">
                </el-table-column>
                <el-table-column
                    prop="qq_id"
                    label="QQ号">
                </el-table-column>
                <el-table-column
                    prop="online_number"
                    label="号码卡">
                </el-table-column>
                <el-table-column
                    prop="phone_number"
                    label="上网卡">
                </el-table-column>
                <el-table-column
                    prop="account"
                    label="账号">
                </el-table-column>
                <el-table-column
                    label="在线情况">
                    <template slot-scope="scope">
                        <span :class='{"te":scope.row.status == "掉线"}'>{{scope.row.status}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="授权截止时间">
                    <template slot-scope='scope'>
                        <span>{{scope.row.sesstion_update_time | sq()}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注">
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
    name:'devices1',
    data: function () {
        return {
            token:sessionStorage.getItem('token'),
            uid:sessionStorage.getItem('uid'),
            deviceList:[],
            loading:false,
        }
    },
    mounted: function () {
        this.getData()
    },
    methods:{
        getData: function () {
            let vm = this;
            vm.loading = true;
            vm.$axios({
                method:'post',
                url:window.$g_Api+'/oa/devices1',
                data:{
                    token:vm.token,
                    uid:vm.uid,
                }
            })
               .then(function(res){
                   vm.loading = false;
                   if(res.data.code == 0){
                       vm.deviceList = res.data.data;
                   }else {
                       console.error(res.data.message);
                   }
               })
               .catch(function(err){});
        }
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
#devices1{
    .te{
        color: red;
    }
}
</style>

