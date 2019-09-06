<template>
    <div id="item">
        <div class="block">
            <el-tree
            ref='tree'
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
            <!--<el-tree-->
                <!--ref='tree'-->
                <!--:data="teamList"-->
                <!--node-key="tid"-->
                <!--@node-click='nodeClick'-->
                <!--default-expand-all-->
                <!--:props="defaultProps"-->
                <!--:highlight-current='true'-->
                <!--:expand-on-click-node="false"-->
                <!--:default-expand-all='false'>-->
                 <!--<span class="custom-tree-node" slot-scope="{ node, data }">-->
                    <!--<span>{{ node.label }}</span>-->
                      <!--<span>-->
          <!--<i style='color:#409EFF;' @click="addNode(data)">+</i>-->
        <!--</span>-->
                 <!--</span>-->

            <!--</el-tree>-->
        </div>
        <div class="main_box">
            <div class="teamName">
                <div class="teamName_l">
                    <el-input v-model="mainBox.teamName" :disabled='mainBox.teamnameDisabled'
                              @keyup.enter.native='saveNewname'
                              style='width: 200px'></el-input>
                    <i class="el-icon-edit" @click='reviseName'></i>
                    <span v-show='mainBox.save' @click='saveNewname'>{{$t('message.preserve')}}</span>
                </div>
                <div class="teamName_r">
                    <el-button type="primary" size='mini' @click='getaddBox'>{{$t('message.add')}}</el-button>
                </div>
            </div>
            <el-table
                :data="tableData"
                :height='myHeight'
                style="width: 100%;background-color: transparent !important;flex:1;overflow-x: auto">
                <el-table-column
                    label="#"
                    type="index">
                </el-table-column>
                <el-table-column
                    :label="$t('message.vpc')"
                    prop="plate">
                </el-table-column>
                <el-table-column
                    :label="$t('message.vm')">
                    <template slot-scope="scope">
                        <span>{{scope.row.type | getType}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="$t('message.vin')"
                    prop="frame">
                </el-table-column>
                <el-table-column
                    :label="$t('message.driver')"
                    prop="driver">
                </el-table-column>
                <el-table-column
                    :label="$t('message.phone')"
                    prop="driverphone">
                </el-table-column>
                <el-table-column
                    :label="$t('message.deviceCode')"
                    prop="rid">
                </el-table-column>
                <el-table-column
                    :label="$t('message.fleetName')"
                    prop="teamname">
                </el-table-column>
                <el-table-column
                    width=170
                    align="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">{{$t('message.revise')}}
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">{{$t('message.delete')}}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-size="10"
                    layout="total, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
            <!--<div class="page">-->
            <!--<div class="lrbtn">-->
            <!--<el-button size="mini" :disabled='page==0?true:false' @click='pageL()'>上一页</el-button>-->
            <!--<el-button size="mini" :disabled='end' @click='pageR()'>下一页</el-button>-->
            <!--</div>-->
            <!--</div>-->
        </div>
        <div class="myForm_box" v-show='bdRidbox'>
            <div class="myForm">
                <div class="colse"><i class="el-icon-circle-close" @click='closeRidbox'></i></div>
                <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
                    <el-form-item :label="$t('message.vpc')" prop="plate" class='label'>
                        <el-input v-model="ruleForm2.plate" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.deviceCode')" prop="nb" class='label'>
                        <el-input v-model="ruleForm2.rid" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.vm')" prop="type">
                        <el-select v-model="ruleForm2.type" :placeholder="$t('message.vm')">
                            <el-option :label="$t('message.sedan')" value=1></el-option>
                            <el-option :label="$t('message.vans')" value=2></el-option>
                            <el-option :label="$t('message.trailer')" value=3></el-option>
                            <el-option :label="$t('message.headstock')" value=4></el-option>
                            <el-option :label="$t('message.truck')" value=5></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('message.fleetName')" class='label'>
                        <el-input v-model="mainBox.teamName" style='width: 203px' disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.vin')" class='label' prop="frame">
                        <el-input v-model="ruleForm2.frame" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.driver')" class='label' prop="driver">
                        <el-input v-model="ruleForm2.driver" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.phone')" class='label' prop="driverphone">
                        <el-input v-model="ruleForm2.driverphone" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm2('ruleForm2')">{{$t('message.confirm')}}</el-button>
                        <!--<el-button @click="resetForm('ruleForm2')">重置</el-button>-->
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="myForm_box" v-show='addBox'>
            <div class="myForm">
                <div class="colse"><i class="el-icon-circle-close" @click='getaddBox'></i></div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item :label="$t('message.vpc')" prop="plate" class='label'>
                        <el-input v-model="ruleForm.plate" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.deviceCode')" prop="nb" class='label'>
                        <el-input v-model="ruleForm.rid" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.vm')" prop="type">
                        <el-select v-model="ruleForm.type" :placeholder="$t('message.vm')">
                            <el-option :label="$t('message.sedan')" value=1></el-option>
                            <el-option :label="$t('message.vans')" value=2></el-option>
                            <el-option :label="$t('message.trailer')" value=3></el-option>
                            <el-option :label="$t('message.headstock')" value=4></el-option>
                            <el-option :label="$t('message.truck')" value=5></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('message.fleetName')" class='label'>
                        <el-input v-model="mainBox.teamName" style='width: 203px' disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.vin')" class='label' prop="frame">
                        <el-input v-model="ruleForm.frame" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.driver')" class='label' prop="driver">
                        <el-input v-model="ruleForm.driver" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.phone')" class='label' prop="driverphone">
                        <el-input v-model="ruleForm.driverphone" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" :disabled='wd'>{{$t('message.confirm')}}</el-button>
                        <el-button @click="resetForm('ruleForm')">{{$t('message.reset')}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'cars',
        data() {
            return {
                defaultProps: {
                    parent: 'parentId',   // 父级唯一标识
                    value: 'tid',          // 唯一标识
                    label: 'name',       // 标签显示
                    children: 'teams', // 子级
                },
                mainBox: {
                    teamName: sessionStorage.getItem('teamname') ? sessionStorage.getItem('teamname') : sessionStorage.getItem('companyname'),
                    tid: sessionStorage.getItem('teamid') ? sessionStorage.getItem('teamid') : sessionStorage.getItem('companyid'),
                    teamnameDisabled: true,
                    save: false
                },
                tableData: [],
                teamList: [],
                search: '',
                bdRidbox: false,
                bdrid: '',
                ruleForm: { //表单
                    plate: '',
                    type: '',
                    tid: '',
                    frame: '',
                    driver: '',
                    driverphone: '',
                    rid: ''
                },
                ruleForm2: { //表单
                    plate: '',
                    type: '',
                    tid: '',
                    frame: '',
                    driver: '',
                    driverphone: '',
                    rid: ''
                },
                addBox: false,
                rules: { //表达验证规则
                    plate: [
                        {required: false},
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    type: [
                        {required: true, message: this.$t('message.modelTips'), trigger: 'change'}
                    ],
                    nb: [
                        {required: false}
                    ],
                    frame: [
                        {required: false}
                    ],
                    driver: [
                        {required: false}
                    ],
                    driverphone: [
                        {required: false}
                    ],
                },
                teams: [
                    {
                        cid: '',
                        tid: '',
                        name: ''
                    }
                ],
                wd: false,
                myProps: {
                    value: 'tid',
                    label: 'name',
                    children: 'teams'
                },
                total: 0,
                page: 1,
                end: false,
                tid: '',
                nowCid: '',
            }
        },
        props: {
            myHeight: Number,
        },
        created() {
            // this.getTeamlist();
            this.getTeamlist1();
            this.getCarslist(sessionStorage.getItem('companyid') || '', sessionStorage.getItem('teamid'))
        },
        mounted() {

        },
        methods: {
            //获取车队列表
            getTeamlist1() {
                this.$ajax('/api/team/list', {
                    cid: sessionStorage.getItem('companyid'),
                    tid: sessionStorage.getItem('teamid')
                })
                    .then(res => {
                        if (res.errcode == 0) {
                            this.teamList = res.teams;
                            this.nowCid = res.teams[0].cid;
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                    .catch(error => {
                        this.$message.error(error)
                    })
            },
            //获取车辆列表
            getCarslist(cid = '', tid = '', ye=1) {
                this.$ajax('/api/vehicle/list', {
                    cid: cid,
                    tid: tid,
                    page: ye-1,
                })
                    .then((res) => {
                        if (res.errcode == 0) {
                            this.tableData = res.vehicles;
                            this.total = res.total;
                            this.page = ye;
                        } else {
                            this.tableData = []
                        }
                    })
                    .catch((err) => {
                    });
            },
            //tree渲染
            renderContent(h, {node, data, store}) {
                // console.log({node, data, store});
                return (
                    <span class="custom-tree-node">
                            <span><i class={data.cid?'myiconfont iconfangzi':''}></i>{node.label}</span>
                            <span>
                            <el-button size="mini" type="text" on-click={(e) => {
                                e.stopPropagation();
                                this.getAppendbox(node, data)
                            }}>+</el-button>
                            </span>
                        </span>
                )
            },
            //修改车队名
            reviseName() {
                this.mainBox.teamnameDisabled = false; //取消禁用
                this.mainBox.save = true;
            },
            //添加车队
            getAppendbox(node, data) {
                let vm = this;
                vm.$prompt(this.$t('message.pAddteam'), this.$t('message.addTeam'), {
                    confirmButtonText: this.$t('message.confirm'),
                    cancelButtonText: this.$t('message.cancel'),
                    // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    // inputErrorMessage: '邮箱格式不正确'
                }).then(({value}) => {
                    vm.$axios({
                        method: 'post',
                        url: window.$g_Api + '/api/team/add',
                        data: {
                            cid: sessionStorage.getItem('companyid'),
                            pid: node.data.tid ? node.data.tid : '',
                            name: value
                        }
                    })
                        .then(function (res) {
                            if (res.data.errcode == 0) {
                                const newChild = {tid: res.data.tid, name: value, teams: []};
                                if (!data.teams) {
                                    vm.$set(data, 'teams', []);
                                }
                                data.teams.push(newChild);
                                vm.getTeamlist();
                            } else {
                                vm.$message.error(res.data.msg);
                            }
                        })
                        .catch(function (err) {
                            vm.$message.error(err);
                        });

                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '取消输入'
                    // });
                });

            },
            //删除车队
            getDelbox(data, node) {
                this.$confirm(this.$t('message.tipsText2'), this.$t('message.tips'), {
                    confirmButtonText: this.$t('message.confirm'),
                    cancelButtonText: this.$t('message.cancel'),
                    type: 'warning'
                }).then(() => {
                    const parent = node.parent;
                    const children = parent.data.children || parent.data;
                    const index = children.findIndex(d => d.id === data.id);
                    children.splice(index, 1);
                    // this.$message({
                    //     type: 'success',
                    //     message: '删除成功!'
                    // });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: this.$t('message.success')
                    });
                });
            },
            //点击车队
            nodeClick(data, node, store) {
                this.mainBox.teamnameDisabled = true;
                this.mainBox.teamName = data.name;
                this.mainBox.tid = data.tid;
                this.ruleForm.tid = data.tid;
                this.ruleForm2.tid = data.tid;
                this.tid = data.tid;
                this.mainBox.save = false;
                this.nowCid = this.getParentNode(node);
                this.getCarslist(this.nowCid, data.tid);
            },
            getParentNode(node) {
                if (node.data.cid) {
                    return node.data.cid;
                } else {
                    return this.getParentNode(node.parent)
                }
            },
            //修改车队名称
            saveNewname() {
                let vm = this;
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/api/team/edit',
                    data: {
                        name: vm.mainBox.teamName,
                        tid: vm.mainBox.tid
                    }
                })
                    .then(function (res) {
                        if (res.data.errcode == 0) {
                            vm.$message({
                                message: this.$t('message.success'),
                                type: 'success'
                            });
                            vm.mainBox.save = false;
                            vm.getTeamlist();
                        } else {
                            vm.$message.error(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                    });
            },
            //修改车辆弹出框
            handleEdit(index, row) {
                this.ruleForm2 = {...row}
                this.ruleForm2.type = this.ruleForm2.type + ''
                this.bdRidbox = true;
            },
            //删除车辆
            handleDelete(index, row) {
                this.$confirm(this.$t('message.tipsText1'), this.$t('message.tips'), {
                    confirmButtonText: this.$t('message.confirm'),
                    cancelButtonText: this.$t('message.cancel'),
                    type: 'warning'
                }).then(() => {
                    this.$ajax('/api/vehicle/remove', {vid: row.vid})
                        .then(res => {
                            if (res.errcode == 0) {
                                this.getCarslist(this.nowCid, this.tid)
                                this.$message({
                                    type: 'success',
                                    message: this.$t('message.success')
                                });
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.msg
                                });
                            }
                        })
                        .catch(err => {
                            this.$message({
                                type: 'error',
                                message: err
                            });
                        })
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            },
            //提交修改
            submitForm2(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$ajax('/api/vehicle/edit', this.ruleForm2)
                            .then((res) => {
                                if (res.errcode == 0) {
                                    this.closeRidbox();
                                    this.getCarslist(this.nowCid, this.tid)
                                    this.$message.success(this.$t('message.success'))
                                }
                            })
                            .catch((err) => {
                                this.$message.error(err)
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            sync(prop, value) {
                this[prop] = value;
            },
            //添加车辆表单提交
            submitForm(formName) {
                let vm = this;
                vm.wd = true;
                vm.$refs[formName].validate((valid) => {
                    if (valid) {
                        vm.$axios({
                            method: 'post',
                            url: window.$g_Api + '/api/vehicle/add',
                            data: {
                                cid: vm.nowCid,
                                plate: vm.ruleForm.plate,
                                type: vm.ruleForm.type,
                                tid: vm.ruleForm.tid,
                                frame: vm.ruleForm.frame,
                                driver: vm.ruleForm.driver,
                                driverphone: vm.ruleForm.driverphone,
                                rid: vm.ruleForm.rid
                            }
                        })
                            .then(function (res) {
                                let message = res.data.errcode == 0 ? vm.$t('message.success') : res.data.msg;
                                let type = res.data.errcode == 0 ? 'success' : 'error';
                                vm.$message({
                                    message: message,
                                    type: type
                                });
                                vm.wd = false;
                                vm.addBox = false;
                                vm.getCarslist(vm.nowCid, vm.ruleForm.tid);
                            })
                            .catch(function (err) {
                            });
                    } else {
                        console.log('error submit!!');
                        vm.wd = false;
                        return false;
                    }
                });
            },
            //重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            closeRidbox() {
                this.bdRidbox = false;
                for (var key in this.ruleForm2) {
                    this.ruleForm2[key] = ''
                }
            },
            //打开车俩添加表单
            getaddBox() {
                this.addBox = this.addBox ? false : true;
                let teamId = this.ruleForm.tid;
                this.ruleForm = {
                    plate: '',
                    type: '',
                    tid: teamId,
                    frame: '',
                    driver: '',
                    driverphone: '',
                    rid: ''
                }
            },
            //分页器
            handleCurrentChange(val) {
                this.getCarslist(this.nowCid, this.tid, val)
            },
        }
    }
</script>

<style lang="scss" type="text/scss">
    #item {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
        justify-content: space-between;

        .block {
            width: auto;
            height: auto;
            background-color: #ffffff;
            overflow-x: hidden;
            padding: 8px;
            border-radius: 10px;

            .el-tree {
                width: auto;
                height: 100%;
                padding-right: 10px;
                overflow-y: scroll;
                /*background-color: rgb(50, 65, 87);*/
                /*color: #ffffff;*/
            }

            .expanded {
                padding: 0 !important;
            }
        }

        .main_box {
            flex: 1;
            height: 100%;
            background-color: #ffffff;
            overflow: auto;
            padding: 8px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .teamName {
                height: 40px;
                width: 100%;
                display: flex;
                justify-content: space-between;

                .teamName_l {
                    i {
                        margin-left: 6px;
                        font-size: 18px;
                        color: #909399;

                        &:hover {
                            cursor: pointer;
                        }
                    }

                    span {
                        color: rgb(32, 160, 255);
                        margin-left: 10px;

                        &:hover {
                            cursor: pointer;
                        }
                    }
                }

                .teamName_r {

                }
            }

            .page {
                width: 100%;
                height: 28px;
                text-align: center;
                margin: 10px auto;
            }
        }

        .myForm_box {
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.1);
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 10px;
            z-index: 999;

            .myForm {
                width: 400px;
                height: 480px;
                background-color: #fff;
                border-radius: 10px;
                padding: 15px 30px;
                margin: 0 auto;
                margin-top: 20px;

                .colse {
                    margin-bottom: 10px;
                    display: flex;
                    flex-direction: row-reverse;
                    justify-content: flex-start;

                    i {
                        font-size: 24px;
                        color: #cccccc;
                        margin-top: -8px;
                        margin-right: -16px;

                        &:hover {
                            cursor: pointer;
                        }
                    }
                }

                .el-form-item__label {
                    text-align: left;
                }

                .label {
                    .el-form-item__label {
                        padding-left: 10px;
                    }
                }

                .el-cascader, .el-cascader--small {
                    width: 203px;
                }

                .el-select, .el-select--small {
                    width: 203px;
                }
            }

            .ridBox {
                width: 420px;
                height: 140px;
                margin: 0 auto;
                margin-top: 120px;
                border-radius: 10px;
                background-color: #ffffff;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding-bottom: 20px;

                .close {
                    width: 100%;
                    height: 40px;
                    display: flex;
                    justify-content: space-between;
                    padding: 8px;

                    i {
                        float: right;

                        &:hover {
                            cursor: pointer;
                        }
                    }
                }

                .bt_box {
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    flex-direction: row-reverse;
                    padding-right: 20px;
                }
            }
        }
    }

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        /*padding-right: 8px;*/
    }
</style>

