<template>
    <div id="profits2" class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据管理 > 股东管理</p>
        <div class="profitsBox">
            <span>类型选择:</span>
            <template>
                <el-radio v-model="radio" label="1">股东</el-radio>
                <el-radio v-model="radio" label="2">合伙人</el-radio>
                <el-radio v-model="radio" label="3">账本</el-radio>
            </template>
        </div>
        <template v-if='radio == 1'>
            <template v-if='radio2 == 1'>
                <!--<div class="pro_add_user">-->
                <!--<p>-->
                <!--<span style='margin-right: 8px;color: #999999;'>设置股东名称:</span>-->
                <!--<el-input v-model="addUser.shareholders" size="mini" style='width: 160px;margin-right: 20px;'></el-input>-->
                <!--<span style='margin-right: 8px;color: #999999;'>设置密码:</span>-->
                <!--<el-input v-model="addUser.shareholderspassword" size="mini" style='width: 160px'></el-input>-->
                <!--</p>-->
                <!--<span style='display: block;margin-left: 40px;'>-->
                <!--<el-tag class="my_tag" size='medium'>添加股东</el-tag>-->
                <!--</span>-->
                <!--</div>-->
                <el-table
                    :data="shareholder_list"
                    height="80%"
                    key='tableData'
                    style="width: 100%;font-size: 14px;">
                    <el-table-column
                        prop="name"
                        label="名称">
                    </el-table-column>
                    <!--<el-table-column-->
                    <!--prop="password"-->
                    <!--label="密码">-->
                    <!--</el-table-column>-->
                    <el-table-column
                        prop="devices_num"
                        label='总设备数'>
                    </el-table-column>
                    <el-table-column
                        prop="sh_percent"
                        label='分红'>
                    </el-table-column>
                    <el-table-column
                        label='需存备用金'>
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p v-for='item in scope.row.logic_history' style='font-size: 12px;color: #909399;'><span style='margin-right: 20px;'>日期：{{item.month}}</span>金额：<span>{{item.logic_reserve}}</span></p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.logic_reserve }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="real_reserve"
                        label='已存备用金'>
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p v-for='item in scope.row.real_history' style='font-size: 12px;color: #909399;'><span style='margin-right: 20px;'>时间：{{item.edit_time}}</span>金额：<span>{{item.real_reserve}}</span></p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.real_reserve }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label='操作'>
                        <template slot-scope='scope'>
                            <el-button type="info" plain @click='setinfo(scope.row["id"],scope.row["real_reserve"],scope.row["sh_percent"])'
                                       size="mini">查看详情
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <template v-else-if='radio2 == 2'>
                <template>
                    <div class='i_box'>
                        <div class='box_l'>
                            <el-button type="primary" size="mini" @click='adddev'>添加设备</el-button>
                            <div class='box_l_l'>
                                <el-input placeholder="请输入内容" v-model="realreserve" style='width: 240px;'>
                                    <template slot="prepend">已存备用金</template>
                                </el-input>
                                <el-input placeholder="请输入内容" v-model="remark" style='width: 400px;'>
                                    <template slot="prepend">备注</template>
                                </el-input>
                                <el-button type="primary" size="mini" @click='torealreserve'>确认修改</el-button>
                            </div>
                        </div>
                        <i class="fontfamily te-oa-chehuisekuai back" @click='back()'></i>
                    </div>
                    <template v-loading='loading'>
                        <el-table
                            :data="devicelist"
                            height="80%"
                            border
                            key='devicelist'
                            style="width: 100%">
                            <el-table-column
                                prop="sequence"
                                width='50'
                                label="序号">
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
                                prop='status'
                                label="在线情况">
                            </el-table-column>
                            <el-table-column
                                prop="sesstion_update_time"
                                label="授权截止时间">
                                <!--<template slot-scope='scope'>-->
                                <!--<span>{{scope.row.sesstion_update_time | sq()}}</span>-->
                                <!--</template>-->
                            </el-table-column>
                            <el-table-column
                                prop="remark"
                                label="备注">
                            </el-table-column>
                            <el-table-column
                                label="操作">
                                <template slot-scope='scope'>
                                    <span @click='confirmDel(scope.row.eid)' class='sp'>删除设备</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </template>
            </template>
        </template>
        <template v-else-if='radio == 2'>
            <el-table
                :data="partner_list"
                height="80%"
                @row-click='rowchange'
                key='partnerlist'
                style="width: 100%;font-size: 14px;">
                <el-table-column
                    prop="name"
                    label="合伙人">
                </el-table-column>
                <el-table-column
                    prop="devices_num"
                    label="设备数">
                </el-table-column>
                <el-table-column
                    prop="sh_percent"
                    label='分红'>
                </el-table-column>
                <el-table-column
                    prop="logic_reserve"
                    label='需存备用金'>
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p v-for='item in scope.row.logic_history' style='font-size: 12px;color: #909399;'><span style='margin-right: 20px;'>日期：{{item.month}}</span>金额：<span>{{item.logic_reserve}}</span></p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.logic_reserve }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="real_reserve"
                    label='已存备用金'>
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p v-for='item in scope.row.real_history' style='font-size: 12px;color: #909399;'><span style='margin-right: 20px;'>时间：{{item.edit_time}}</span>金额：<span>{{item.real_reserve}}</span></p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.real_reserve }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>

            </el-table>
        </template>
        <template v-else-if='radio == 3'>
            <el-button @click='reckon' style='margin-bottom: 8px;' v-loading='reckonloading'>计算收益</el-button>
            <div class="function">
                <el-date-picker
                    v-model="newData.month"
                    type="month"
                    value-format="yyyy-MM"
                    placeholder="选择月">
                </el-date-picker>
                <el-input v-model="newData.cost_manpower" style='width: 200px;' @blur='getall'>
                    <template slot="prepend">人工:</template>
                </el-input>
                <el-input v-model="newData.cost_device" style='width: 200px;' @blur='getall'>
                    <template slot="prepend">设备:</template>
                </el-input>
                <el-input v-model="newData.cost_rent" style='width: 200px;' @blur='getall'>
                    <template slot="prepend">场地:</template>
                </el-input>
                <el-input v-model="newData.cost_all" style='width: 200px;' :disabled="true">
                    <template slot="prepend">总运营成本:</template>
                </el-input>
                <el-button type='primary' @click='costInof'>提交</el-button>
            </div>
            <el-table
                :data="cost_record"
                height="80%"
                @row-click='rowclick'
                style="width: 100%;font-size: 14px;">
                <el-table-column
                    prop="month"
                    label="月份">
                </el-table-column>
                <el-table-column
                    prop="employee_wages"
                    label="人工">
                </el-table-column>
                <el-table-column
                    prop="cost_device"
                    label='设备'>
                </el-table-column>
                <el-table-column
                    prop="cost_rent"
                    label='场地'>
                </el-table-column>
                <el-table-column
                    prop="cost_all"
                    label='总运营成本'>
                </el-table-column>
            </el-table>
        </template>
        <div class="adddevisebox" v-show='adddevisebox'>
            <p>
                <el-button type="primary" plain size='mini' @click='btn_adddev'>添加</el-button>
                <i class="el-icon-error" @click='celadddevisebox' style='color: #666666;'></i></p>
            <template v-loading='getdevlistloading'>
                <el-table
                    :data="deviceList"
                    v-loading='addloading'
                    @selection-change="handleSelectionChange"
                    height="80%"
                    border
                    style="width: 100%;">
                    <el-table-column
                        type="selection"
                        width='50'>
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
        <el-dialog title="合伙人修改" :visible.sync="dialogFormVisible" width='500px'>
            <el-form :model="form" v-loading='loading'>
                <el-form-item label="合伙人" label-width="120px">
                    <el-input v-model="form.name" style='width: 203px;' disabled></el-input>
                </el-form-item>
                <el-form-item label="分红" label-width="120px">
                    <el-input type="input" v-model="form.sh_percent" style='width: 203px;'></el-input>
                </el-form-item>
                <el-form-item label="设备数" label-width="120px">
                    <el-input type="input" v-model="form.device_number" style='width: 203px;'></el-input>
                </el-form-item>
                <el-form-item label="备用金" label-width="120px">
                    <el-input type="input" v-model="form.real_reserve" style='width: 203px;'></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click='setparentinfo'>确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'profits2',
        data: function () {
            return {
                token: sessionStorage.getItem('token'),
                uid: sessionStorage.getItem('uid'),
                id: null,
                radio: '1',
                radio2: '1',
                loading: false,
                adddevisebox: false,
                getdevlistloading: false,
                deviceList: [],
                addUser: {
                    shareholders: '',
                    shareholderspassword: '',
                },
                reUser: {
                    shareholders: '',
                    shareholderspassword: '',
                },
                shareholder_list: [],
                cost_record: [],
                partner_list: [],
                tableData1: [],
                newData: {
                    month: '',
                    cost_manpower: 0,
                    cost_device: 0,
                    cost_rent: 0,
                    cost_id: '',
                    cost_all: 0
                },
                devicelist: [],
                selectNb: [],
                addloading: false,
                realreserve: '',
                sh_percent: '',
                remark: '',
                reckonloading:false,
                form:{},
                dialogFormVisible:false,

            }
        },
        mounted: function () {
            this.getshareholderslist()
        },
        methods: {
            rowchange: function (row) {
                this.form = {
                    device_number:row.devices_num,
                    real_reserve:row.real_reserve,
                    id:row.id,
                    name:row.name,
                    sh_percent:row.sh_percent,
                }
                this.dialogFormVisible = true;
            },
            setparentinfo: function () {
                let vm = this;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/setpartnerInfo',
                    data:{
                        token: vm.token,
                        uid: vm.uid,
                        id:vm.form.id,
                        device_number:vm.form.device_number,
                        real_reserve:vm.form.real_reserve,
                        sh_percent:vm.form.sh_percent,
                    }
                })
                   .then(function(res){
                       if(res.data.code == 0){
                           vm.getshareholderslist();
                           vm.dialogFormVisible = false;
                       }else {
                           vm.$alert(res.data.message)
                       }
                   })
                   .catch(function(err){});
            },
            handleSelectionChange: function (val) {
                let arr = [];
                for (let i = 0, len = val.length; i < len; i++) {
                    arr.push(val[i].id)
                }
            },
            getshareholderslist: function () {
                let vm = this;
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/oa/profits2',
                    data: {
                        token: vm.token,
                        uid: vm.uid,
                    }
                })
                    .then(function (res) {
                        if (res.data.code == 0) {
                            vm.shareholder_list = res.data.data.shareholder_list;
                            vm.partner_list = res.data.data.partner_list;
                            vm.cost_record = res.data.data.cost_record;
                        }
                    })
                    .catch(function (err) {
                    });
            },
            //返回
            back: function () {
                this.radio2 = '1';
                this.getshareholderslist();
            },
            //查看股东设备详情
            setinfo: function (id, realreserve,sh_percent) {
                let vm = this;
                vm.id = id;
                vm.realreserve = realreserve;
                vm.sh_percent = sh_percent;
                vm.radio2 = '2';
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/oa/owndevices',
                    data: {
                        token: vm.token,
                        uid: vm.uid,
                        id: id
                    }
                })
                    .then(function (res) {
                        vm.devicelist = res.data.data;
                    })
                    .catch(function (err) {
                    });
            },
            //点击新增弹出设备列表
            adddev: function () {
                let vm = this;
                vm.adddevisebox = true;
                vm.getdevlist();
            },
            //关闭新增设备遮罩
            celadddevisebox: function () {
                this.adddevisebox = false
            },
            //获取设备可选设备列表
            getdevlist: function () {
                let vm = this;
                vm.getdevlistloading = true;
                vm.addloading = true;
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/oa/devices1',
                    data: {
                        token: vm.token,
                        uid: vm.uid,
                    }
                })
                    .then(function (res) {
                        vm.getdevlistloading = false;
                        vm.addloading = false;
                        if (res.data.code == 0) {
                            let arr = [];
                            let devarr = res.data.data;
                            for(let i = 0 ,len = devarr.length ; i < len; i++){
                                if(devarr[i].is_distributed == 0){
                                    arr.push(devarr[i])
                                }else {
                                    continue;
                                }
                            }
                            vm.deviceList = devarr;
                        } else {
                            console.error(res.data.message);
                        }
                    })
                    .catch(function (err) {
                        vm.getdevlistloading = false;
                    });
            },
            //多选框事件
            handleSelectionChange(val) {
                console.log(val);
                let arr = [];
                for (let i = 0, len = val.length; i < len; i++) {
                    arr.push(val[i].id);
                }
                this.selectNb = arr;
            },
            //确认添加设备
            btn_adddev: function () {
                let vm = this;
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/oa/holder/adddevice',
                    data: {
                        token: vm.token,
                        uid: vm.uid,
                        id: vm.id,
                        eids: vm.selectNb
                    }
                })
                    .then(function (res) {
                        vm.$alert(res.data.message);
                        vm.adddevisebox = false;
                        vm.radio2 = '2';
                        vm.$axios({
                            method: 'post',
                            url: window.$g_Api + '/oa/owndevices',
                            data: {
                                token: vm.token,
                                uid: vm.uid,
                                id: vm.id
                            }
                        })
                            .then(function (res) {
                                vm.devicelist = res.data.data;
                            })
                            .catch(function (err) {
                            });
                    })
                    .catch(function (err) {
                    });
            },
            //确认是否删除
            confirmDel: function (eid) {
                let vm = this;
                vm.$confirm('此操作将设备从该股东所属中移除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    vm.$axios({
                        method: 'post',
                        url: window.$g_Api + '/oa/holder/deldevice',
                        data: {
                            token: vm.token,
                            uid: vm.uid,
                            id: vm.id,
                            eids: eid
                        }
                    })
                        .then(function (res) {
                            vm.$alert(res.data.message);
                            vm.$axios({
                                method: 'post',
                                url: window.$g_Api + '/oa/owndevices',
                                data: {
                                    token: vm.token,
                                    uid: vm.uid,
                                    id: vm.id
                                }
                            })
                                .then(function (res) {
                                    if(res.data.code){
                                        vm.$message({
                                            type: 'success',
                                            message: '删除成功!'
                                        });
                                    }
                                    vm.devicelist = res.data.data;
                                })
                                .catch(function (err) {
                                });
                        })
                        .catch(function (err) {
                        });
                }).catch(() => {
                    vm.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //点击行修改
            rowclick: function (row) {
                this.newData = row;
                this.newData.cost_manpower = row.employee_wages;
            },
            //新增或修改成本
            costInof: function () {
                let vm = this;
                let type;
                vm.newData.cost_id ? type = 1 : type = 0;
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/oa/holder/add_cost',
                    data: {
                        token: vm.token,
                        uid: vm.uid,
                        month: vm.newData.month,
                        cost_manpower: vm.newData.cost_manpower,
                        cost_rent: vm.newData.cost_rent,
                        cost_device: vm.newData.cost_device,
                        cost_id: vm.newData.cost_id,
                        type: type,
                    }
                })
                    .then(function (res) {
                        if (res.data.code == 0) {
                            vm.$message.success(res.data.message)
                        } else {
                            vm.$message.error(res.data.message)
                        }
                    })
                    .catch(function (err) {
                    });
            },
            //计算总和
            getall: function () {
                this.newData.cost_all = Number(this.newData.cost_rent) + Number(this.newData.cost_device) + Number(this.newData.cost_manpower);
            },
            //计算收益
            reckon: function () {
                let vm = this;
                vm.reckonloading = true;
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/oa/calculate_profits',
                    data: {
                        token: vm.token,
                        uid: vm.uid,
                        request_month: vm.newData.month
                    }
                })
                    .then(function (res) {
                        vm.reckonloading = false;
                    })
                    .catch(function (err) {
                    });
            },
            //修改备用金
            torealreserve: function () {
                let vm = this;
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/oa/profits2/edit_real_reserve',
                    data: {
                        token: vm.token,
                        uid: vm.uid,
                        sh_id: vm.id,
                        real_reserve: vm.realreserve,
                        remark: vm.remark,
                        ratio:vm.sh_percent
                    }
                })
                    .then(function (res) {
                        if (res.data.code == 0) {
                            vm.$message.success(res.data.message)
                        } else {
                            vm.$message.error(res.data.message)
                        }
                        vm.getshareholderslist();
                    })
                    .catch(function (err) {
                    });
            },

        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    #profits2 {
        position: relative;
        min-width: 1300px;
        .profitsBox {
            margin-bottom: 15px;
            span {
                margin-right: 20px;
            }
        }
        .pr_tag {
            &:hover {
                cursor: pointer;
            }
        }
        .function {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            margin-bottom: 20px;
            .el-input {
                margin-right: 25px;
            }
        }
        .i_box {
            width: 100%;
            height: 32px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            flex-wrap: nowrap;
            .back {
                display: block;
                width: 24px;
                color: #409EFF;
                font-size: 24px;
                margin-right: 30px;
                &:hover {
                    cursor: pointer;
                }
            }
            .box_l {
                display: flex;
                flex:1;
                justify-content: flex-start;
                flex-wrap: nowrap;
                .box_l_l {
                    margin-left: 30px;
                }
            }
        }

        .gd_head {
            display: flex;
            justify-content: flex-start;
            span {
                margin-right: 10px;
                line-height: 32px;
            }
        }
        .pro_add_user {
            display: flex;
            justify-content: flex-start;
            padding-left: 10px;
        }
        .adddevisebox {
            width: 100%;
            height: 100%;
            padding: 0 20px;
            background-color: rgb(255, 255, 255);
            position: absolute;
            top: 0;
            left: 0;
            z-index: 8888;
            p {
                width: 100%;
                height: 32px;
                margin: 15px 0;
                i {
                    float: right;
                    font-size: 24px;
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
        .sp {
            color: red;
            &:hover {
                cursor: pointer;
            }
        }
    }
</style>

