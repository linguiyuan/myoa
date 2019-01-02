<template>
    <div id="groupmanagement" class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据管理 > 分组管理</p>
        <div style='width: 100%;height: 30px;'>
            <el-button type="primary" plain style='float: right;margin-bottom: 12px;' size='mini' @click=togroup v-if='type == 1'>添加小组</el-button>
            <i class='el-icon-back' style='font-size: 24px;color: #409EFF;float: right;' v-else-if='type == 2' @click='back'></i>
        </div>
        <div v-if='type==1'>
            <template>
                <el-table
                    :data="grouplist"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop='group_name'
                        width='100'
                        label="小组名">
                    </el-table-column>
                    <el-table-column
                        label="小组成员">
                        <template slot-scope="scope">
                            <span>{{scope.row.member | tos}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="小组设备">
                        <template slot-scope="scope">
                            <span>{{scope.row.devices | tos}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width='80'
                        label="操作">
                        <template slot-scope="scope">
                            <span class='revise' @click='toinfo(scope.row.group_id)'>查看修改</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width='80'
                        label="操作">
                        <template slot-scope="scope">
                            <span class='revise' @click='delgroup(scope.row.group_id)' style='color: #F56C6C;'>删除小组</span>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div class='addbox' v-else-if='type == 2'>
            <p>
                <span>小组名:</span>
                <el-input v-model="groupinfo.group_name" placeholder="请输入内容" style='width: 200px;'></el-input>
                <el-button type="primary" plain style='margin-left: 50px;' @click='submit'>确认提交</el-button>

            </p>
            <div class="content">
                <el-transfer
                    v-model="groupinfo.member"
                    :data="unselectedUser"
                    @change='change'
                    style='margin-right: 60px;'
                    :titles="['可选成员', '已选成员']"
                    key='transfer1'>
                </el-transfer>
                <el-transfer
                    v-model="groupinfo.devices"
                    :data="unselectedDev"
                    @change='change'
                    :titles="['可选设备', '已选设备']"
                    key='transfer2'>
                </el-transfer>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name:'groupmanagement',
    data: function () {
        return {
            token:sessionStorage.getItem('token'),
            uid:sessionStorage.getItem('uid'),
            type:1,
            grouplist:[],
            groupinfo:{
                group_name:'',
                member:[],
                devices:[],
                group_id:'',
            },

            unselectedUser:[],
            unselectedDev:[]
        }
    },
    filters:{
        tos: function (arr) {
            return arr.join('、');
        }
    },
    mounted: function () {
      this.getgrouplist();
    },
    methods:{
        //跳转添加小组
        togroup: function () {
            this.groupinfo = {
                group_name:'',
                member:[],
                devices:[],
                group_id:'',
            };
            this.type = 2;
        },
        //返回
        back: function () {
            this.type = 1;
            this.getgrouplist();
        },
        change: function () {
            console.log(this.value1);
        },
        //获取小组列表
        getgrouplist: function () {
            let vm = this;
            vm.$axios({
                method:'post',
                url:window.$g_Api+'/oa/groupmanagement/list',
                data:{
                    token:vm.token,
                    uid:vm.uid
                }
            })
               .then(function(res){
                    if(res.data.code == 0){
                        vm.grouplist = res.data.data.group_list;
                        let alluser = res.data.data.alluser;
                        let alldevises = res.data.data.alldevises;
                        let uu = [];
                        let ud = [];
                        for(let i = 0 ,len = alluser.length ; i < len; i++){
                            uu.push({key:alluser[i],label:alluser[i]})
                        }
                        for(let i = 0 ,len = alldevises.length ; i < len; i++){
                            ud.push({key:alldevises[i],label:alldevises[i]})
                        }
                       vm.unselectedUser = uu;
                       vm.unselectedDev = ud;

                    }
               })
               .catch(function(err){});
        },
        //查看修改
        toinfo: function (gid) {
            let vm = this;
            for(let i = 0 ,len = vm.grouplist.length ; i < len; i++){
                if(gid == vm.grouplist[i].group_id){
                    vm.groupinfo = vm.grouplist[i];
                    break;
                }
            }
            vm.type = 2;
        },
        //删除小组
        delgroup: function (gid) {
            let vm = this;
            vm.$axios({
                method:'post',
                url:window.$g_Api+'/oa/groupmanagement/delgroup',
                data:{
                    token:vm.token,
                    uid:vm.uid,
                    group_id:gid
                }
            })
               .then(function(res){
                   vm.$alert(res.data.message);
                   vm.getgrouplist();
               })
               .catch(function(err){});
        },
        //确认提交
        submit: function () {
            let vm = this;
            let type;
            vm.groupinfo.group_id?type = 1:type = 0;
            vm.$axios({
                method:'post',
                url:window.$g_Api+'/oa/groupmanagement/addgroup',
                data:{
                    token:vm.token,
                    uid:vm.uid,
                    type:type,
                    group_id:vm.groupinfo.group_id,
                    group_name:vm.groupinfo.group_name,
                    devices:vm.groupinfo.devices,
                    member:vm.groupinfo.member,
                }
            })
               .then(function(res){
                   vm.$alert(res.data.message);
               })
               .catch(function(err){});
        }
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
#groupmanagement{
    .addbox{
        width: 100%;
        .content{
            display: flex;
            justify-content: flex-start;
        }
    }
    .revise{
        color: #3a8ee6;
        &:hover{
            cursor:pointer;
        }
    }
}
</style>

