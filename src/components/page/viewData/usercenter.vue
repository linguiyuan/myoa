<template>
    <div id="usercenter">
        <div class="block">
            <el-tree
                :data="teamList"
                node-key="tid"
                @node-click='nodeClick'
                default-expand-all
                :props="defaultProps"
                :highlight-current='true'
                :expand-on-click-node="false"
                :default-expand-all='false'
                :render-content="renderContent">
            </el-tree>
        </div>
        <div class="usercenterMain">
            <div class="btn">
                <el-button type="primary" size="mini" @click='getaddUserbox' style='float: right;'>添加账号</el-button>
            </div>
            <el-table
                :data='userList'
                style="width: 100%;background-color: transparent !important;">
                <!--<el-table-column-->
                    <!--label="序号"-->
                    <!--type="index">-->
                <!--</el-table-column>-->
                <el-table-column
                    label="用户名"
                    prop="name">
                </el-table-column>
                <el-table-column
                    label="账号"
                    prop="user">
                </el-table-column>
                <el-table-column
                    label="类型"
                    prop="utype">
                </el-table-column>
                <el-table-column
                    min-width='120'
                    label="管理员电话"
                    prop="phone">
                </el-table-column>
                <el-table-column
                    min-width='180'
                    label="管理员邮箱"
                    prop="email">
                </el-table-column>
                <el-table-column
                    label="所属车队"
                    prop="teamname">
                </el-table-column>
                <el-table-column
                   min-width='260'
                    label="操作">
                    <template slot-scope="scope">
                        <!--<el-button-->
                        <!--size="mini"-->
                        <!--@click="bdRidapi(scope.$index, scope.row)">绑定设备</el-button>-->
                        <!--<el-button-->
                            <!--size="mini"-->
                            <!--@click="handleEdit(scope.$index, scope.row)">绑定车胎</el-button>-->
                        <el-button
                            v-show='scope.row.utype == 4'
                            size="mini"
                            @click="addCar(scope.$index, scope.row)">添加车辆</el-button>
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button
                            size="mini"
                            type="default"
                            @click="loginHistory(scope.$index, scope.row)">登录历史</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="addUser_box" v-show='boxShow'>
            <div class="box">
                <el-form label-width="100px" :model="formLabelAlign" label-position='left'>
                    <el-form-item label="用户中文名称">
                        <el-input v-model="formLabelAlign.name"></el-input>
                    </el-form-item>
                    <el-form-item label="用户账号">
                        <el-input v-model="formLabelAlign.user"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码">
                        <el-input v-model="formLabelAlign.pass"></el-input>
                    </el-form-item>
                    <el-form-item label="用户类别">
                        <el-select v-model="formLabelAlign.utype" @change='typeChange' placeholder="请选择用户类型" style='width: 240px'>
                            <el-option label="公司管理员" value=0></el-option>
                            <el-option label="车队长" value=1></el-option>
                            <el-option label="客服" value=4></el-option>
                            <!--<el-option label="车队司机" value=2></el-option>-->
                            <!--<el-option label="个人用户" value=3></el-option>-->
                            <!--<el-option label="系统管理员" value=100></el-option>-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="归属车队" class='label'>
                        <el-input v-model="nowName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="formLabelAlign.email"></el-input>
                    </el-form-item>
                    <el-form-item label="电话 ">
                        <el-input v-model="formLabelAlign.phone"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click='adduser'>立即创建</el-button>
                        <el-button @click='colse'>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'usercenter',
        data: () => {
            return {
                defaultProps: {
                    parent: 'parentId',   // 父级唯一标识
                    value: 'tid',          // 唯一标识
                    label: 'name',       // 标签显示
                    children: 'teams', // 子级
                },
                teamList:[],
                myProps:{
                    value:'tid',
                    label:'name',
                    children:'teams'
                },
                userList:[],
                formLabelAlign: {
                    user: '',
                    pass: '',
                    name: '',
                    utype: '',
                    email: '',
                    phone: '',
                    tid:''
                },
                tid:'',
                boxShow:false,
                teams:[],
                userType:false,
                nowCid: sessionStorage.getItem('companyid') || '',
                nowName:sessionStorage.getItem('teamname') ? sessionStorage.getItem('teamname') : sessionStorage.getItem('companyname'),
            }
        },
        created(){
            this.getTeamlist1();
        },
        mounted() {
            this.getUserlist(sessionStorage.getItem('companyid') || '',sessionStorage.getItem('teamid'));
        },
        filters:{
            getType(int){
                let type;
                switch (int) {
                    case 0:type = '公司管理员';
                        break;
                    case 1:type = '车队长';
                        break;
                    case 2:type = '车队司机';
                        break;
                    case 3:type = '个人用户';
                        break;
                    case 100:type = '系统管理员';
                        break;
                }
                return type;
            }
        },
        methods: {
            //获取车队列表
            getTeamlist1(){
                this.$ajax('/api/team/list',{
                    cid:sessionStorage.getItem('companyid'),
                    tid:sessionStorage.getItem('teamid')
                })
                    .then(res=>{
                        if(res.errcode == 0){
                            this.teamList = res.teams || [];
                            this.nowCid = res.teams[0].cid || '';
                        }else {
                            this.$message.error(res.msg)
                        }
                    })
                    .catch(error => {
                        this.$message.error(error)
                    })
            },
            //类型选择事件
            typeChange(type){
                if(type == 4){
                    this.formLabelAlign.tid = ''
                    this.userType = true;
                }else{
                    this.userType = false;
                }
            },
            renderContent(h, {node, data, store}) {
                return (
                    <span className="custom-tree-node">
                            <span><i class={data.cid ? 'myiconfont iconfangzi' : ''}></i>{node.label}</span>
                            <span>
                            </span>
                        </span>
                )
            },
            //点击车队
            nodeClick(data, node, store) {
                console.log(data);
                this.tid = data.tid;
                this.nowName = data.name;
                this.nowCid = this.getParentNode(node)
                this.getUserlist(this.nowCid,data.tid);
            },
            getParentNode(node) {
                if(node.data.cid){
                    return node.data.cid;
                }else {
                    return this.getParentNode(node.parent)
                }
            },
            getaddUserbox(){
                let vm = this;
                let tid ;
                for(let i = 0 ,len = vm.teams.length ; i < len; i++) {
                    if (vm.tid == vm.teams[i].tid) {
                        tid = vm.teams[i].tid;
                        break;
                    } else {
                        continue
                    }
                }
                vm.formLabelAlign = {
                    user: '',
                    pass: '',
                    name: '',
                    utype: '',
                    email: '',
                    phone: '',
                    tid:tid,
                }
                vm.boxShow = true;
            },
            adduser(){
                let vm = this;
                let data = vm.formLabelAlign;
                data.cid = this.nowCid;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/api/customer/add',
                    data:data
                })
                   .then(function(res){
                       if(res.data.errcode == 0){
                           vm.$message({
                               message: '创建成功',
                               type: 'success'
                           });
                       }else {
                           vm.$message({
                               message: res.data.msg,
                               type: 'warning'
                           });
                       };
                       vm.boxShow = false;
                       vm.getUserlist(vm.nowCid,vm.tid);
                   })
                   .catch(function(err){});
            },
            colse(){
                this.boxShow = false;
                this.formLabelAlign = {
                        user: '',
                        pass: '',
                        name: '',
                        utype: '',
                        email: '',
                        phone: '',
                        tid:'',
                }
            },
            //获取账户列表
            getUserlist(cid,teamid){
                let vm = this;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/api/customer/list',
                    data:{
                        cid:cid,
                        tid:teamid?teamid:''
                    }
                })
                   .then(function(res){
                       if(res.data.errcode == 0){
                           let list = res.data.customers;
                           if(list){
                               var type;
                               for(let i = 0 ,len = list.length ; i < len; i++){
                                   switch (list[i].utype) {
                                       case 0:type = '公司管理员';
                                           break;
                                       case 1:type = '车队长';
                                           break;
                                       case 2:type = '车队司机';
                                           break;
                                       case 3:type = '个人用户';
                                           break;
                                       case 100:type = '系统管理员';
                                           break;
                                   }
                                   list[i].utype = type;
                               }
                               vm.userList = res.data.customers;
                           }else {
                               vm.userList = [];

                           }

                       }else {
                           vm.$message.error(res.data.msg);
                       }
                   })
                   .catch(function(err){});
            },
            //客服-添加车辆
            addCar(index, row){

            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            loginHistory(index, row){
                sessionStorage.setItem('checkUser',row.user);
                this.$router.push('/loginHistory')
            }
        }
    }
</script>

<style lang="scss" type="text/scss">
#usercenter{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    .block {
        width: 240px;
        height: 100%;
        background-color: #ffffff;
        overflow-x: hidden;
        padding: 8px;
        border-radius: 10px;
        .el-tree {
            width: 246px;
            height: 100%;
            padding-right: 10px;
            overflow-y:scroll;
            /*background-color: rgb(50, 65, 87);*/
            /*color: #ffffff;*/
        }
        .expanded {
            padding: 0 !important;
        }
        .custom-tree-node{
            flex:1;
            align-items: center;
            display: flex;
            justify-content: space-between;
        }
    }
    .usercenterMain{
        flex: 1;
        height: 100%;
        background-color: #ffffff;
        padding: 8px;
        overflow: auto;
        position: relative;
        .btn{
            width: 100%;
        }
    }
    .addUser_box{
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: rgba(0,0,0,0.1);
        z-index: 9;
        .box{
            width: 400px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            margin-top: 50px;
        }
    }
}
</style>

