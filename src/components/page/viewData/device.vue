<template>
    <div id="device">
        <div class="btnbox">
            <div class="searchBox">
                <el-input
                    placeholder="rid"
                    style='width: 204px'
                    @keyup.enter.native='searchDev'
                    v-model="devRid">
                </el-input>
                <el-cascader
                    placeholder="请选择车队"
                    style='width: 180px'
                    :options="tidOptions"
                    :show-all-levels="false"
                    :change-on-select="true"
                    :props="tidProps"
                    @change='changeId'
                    clearable>
                </el-cascader>
                <el-button type="primary" icon="el-icon-search" @click="searchDev">{{$t('message.search')}}</el-button>
            </div>
            <!--<el-button type="primary" size="mini">添加设备</el-button>-->
        </div>
        <div class="de_box">
            <div class="listBox">
                <el-table
                    :height='tableHeight'
                    :data='devices'
                    style="width: 100%;background-color: transparent !important;">
                    <el-table-column
                        label="#"
                        type="index">
                    </el-table-column>
                    <el-table-column
                        min-width='120'
                        :label="$t('message.receiverId')"
                        prop="rid">
                    </el-table-column>
                    <el-table-column
                        width='80'
                        :label="$t('message.vm')">
                        <template slot-scope="scope">
                            <span>{{scope.row.type | getType}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        min-width='90'
                        :label="$t('message.vpc')">
                        <template slot-scope="scope">
                            <span>{{scope.row.plate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('message.status')">
                        <template slot-scope="scope">
                            <span>{{scope.row.status | getStatus}}</span>
                        </template>
                    </el-table-column>
                    <!--<el-table-column-->
                        <!--min-width='110'-->
                        <!--:label="$t('message.authenticationCode')"-->
                        <!--prop="authcode">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                        <!--min-width='160'-->
                        <!--label="ICCID"-->
                        <!--prop="iccid">-->
                    <!--</el-table-column>-->
                    <el-table-column
                        min-width='100'
                        :label="$t('message.totalKm')"
                        prop="mileage">
                        <template slot-scope="scope">
                            <span>{{scope.row.mileage | getTow}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('message.totalDays')"
                        prop="duration">
                    </el-table-column>
                    <el-table-column
                        min-width=120
                        :label="$t('message.latestTime')">
                        <template slot-scope="scope">
                            <span>{{scope.row.lt | formatDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        min-width=60
                        label="">
                        <template slot-scope="scope">
                            <el-dropdown @command="handleCommand" trigger="click">
                                <span class="el-dropdown-link">
                                    {{$t('message.operate')}}<i class="el-icon-arrow-down el-icon--right"></i>
                                 </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command='{type:1,row:scope.row}'>{{$t('message.details')}}</el-dropdown-item>
                                    <el-dropdown-item :command='{type:2,row:scope.row}'>{{$t('message.replace')}}</el-dropdown-item>
                                    <el-dropdown-item :command='{type:3,row:scope.row}'>{{scope.row.status | scrap}}</el-dropdown-item>
                                    <el-dropdown-item :command='{type:4,row:scope.row}' v-show='administrators'>{{$t('message.manage')}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page">
                <!--<div class="lrbtn">-->
                <!--<el-button size="mini" :disabled='page==0?true:false' @click='pageL()'>上一页</el-button>-->
                <!--<el-button size="mini" :disabled='end' @click='pageR()'>下一页</el-button>-->
                <!--</div>-->
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-size="10"
                    layout="total, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
        <div class="changeDev" v-show='changeDev' v-loading="loading">
            <div class="changeDev_box">
                <p class='message-box__title'>
                    <span>{{$t('message.replace1')}}</span>
                    <i class="el-icon-close" @click='colseChangebox(1)'></i>
                </p>
                <p class="message">{{$t('message.replace2')}}</p>
                <el-input v-model="changeData.newrid" placeholder=""></el-input>
                <p class="message">{{$t('message.replace3')}}</p>
                <el-date-picker
                    v-model='changeData.date'
                    type="datetime"
                    :placeholder="$t('message.replace3')">
                </el-date-picker>
                <!--<p class="message">作废情况</p>-->
                <div class="radio">
                    <el-radio v-model="changeData.radio" label='1'>{{$t('message.scrapping')}}</el-radio>
                    <el-radio v-model="changeData.radio" label='0'>{{$t('message.noscrapping')}}</el-radio>
                </div>
                <p class="message">{{$t('message.reason')}}</p>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder=""
                    v-model="changeData.textarea">
                </el-input>
                <div class="btn_box">
                    <el-button @click='colseChangebox(1)'>{{$t('message.cancel')}}</el-button>
                    <el-button type="primary" @click='changeRid'>{{$t('message.confirm')}}</el-button>
                </div>
            </div>
        </div>
        <div class="changeDev" v-show='reDev' v-loading="reLoading">
            <div class="changeDev_box">
                <p class='message-box__title'>
                    <span>{{$t('message.scrapChange')}}</span>
                    <i class="el-icon-close" @click='colseChangebox(2)'></i>
                </p>
                <p class="message">{{$t('message.deviceCode')}}</p>
                <el-input v-model="reData.rid" placeholder="" disabled></el-input>
                <p class="message">{{$t('message.scrapChange1')}}</p>
                <el-date-picker
                    v-model='reData.date'
                    type="datetime"
                    placeholder="">
                </el-date-picker>
                <!--<p class="message">设备报废情况</p>-->
                <div class="radio">
                    <el-radio v-model="reData.radio" label='0'>{{$t('message.scrapping')}}</el-radio>
                    <el-radio v-model="reData.radio" label='1'>{{$t('message.noscrapping')}}</el-radio>
                </div>
                <p class="message">{{$t('message.reason')}}</p>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder=""
                    v-model="reData.textarea">
                </el-input>
                <div class="btn_box">
                    <el-button @click='colseChangebox(2)'>{{$t('message.cancel')}}</el-button>
                    <el-button type="primary" @click='reRid'>{{$t('message.confirm')}}</el-button>
                </div>
            </div>
        </div>
        <div class="detailBox" v-show='detailBox'>
            <div class="detailContent">
                <i class='el-icon-error cancel_icon' @click='closeDetailbox'></i>
                <div>
                    <p>
                        <span>{{$t('message.receiverId')}}</span>
                        <i>{{detailData.rid}}</i>
                    </p>
                    <p>
                        <span>{{$t('message.vm')}}</span>
                        <i>{{detailData.type | getType}}</i>
                    </p>
                </div>
                <div>
                    <p>
                        <span>{{$t('message.authenticationCode')}}</span>
                        <i>{{detailData.authcode}}</i>
                    </p>
                    <p>
                        <span>ICCID</span>
                        <i>{{detailData.iccid}}</i>
                    </p>
                </div>
                <div>
                    <p>
                        <span>{{$t('message.status')}}</span>
                        <i>{{detailData.status | getStatus}}</i>
                    </p>
                    <p>
                        <span>{{$t('message.latestTime')}}</span>
                        <i>{{detailData.lt | formatDate}}</i>
                    </p>
                </div>
                <div>
                    <p>
                        <span>{{$t('message.server')}}</span>
                        <i>{{detailData.serverip}}</i>

                    </p>
                    <p>
                        <span>{{$t('message.serverPort')}}</span>
                        <i>{{detailData.serverport}}</i>
                    </p>
                </div>
                <div>
                    <p>
                        <span>{{$t('message.newServer')}}</span>
                        <i>{{detailData.newserverip}}</i>
                    </p>
                    <p>
                        <span>{{$t('message.newServerport')}}</span>
                        <i>{{detailData.newserverport}}</i>
                    </p>
                </div>
                <div>
                    <p>
                        <span>{{$t('message.tpdi')}}</span>
                        <i>{{detailData.preinterval}}</i>
                    </p>
                    <p>
                        <span>{{$t('message.gpsti')}}</span>
                        <i>{{detailData.gpsinterval}}</i>
                    </p>
                </div>
                <div>
                    <p>
                        <span>{{$t('message.hardwareNb')}}</span>
                        <i>{{detailData.hver}}</i>
                    </p>
                    <p>
                        <span>{{$t('message.softwareNb')}}</span>
                        <i>{{detailData.fver}}</i>
                    </p>
                </div>
                <div>
                    <p>
                        <span>{{$t('message.projectCode')}}</span>
                        <i>{{detailData.pcode}}</i>
                    </p>
                    <p>
                        <span></span>
                        <i></i>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'mydevice',
        data() {
            return {
                administrators:false,//是否为管理源
                detailBox:false,//详情框显示与关闭
                tidProps: {
                    // checkStrictly: true,
                    value: 'newid',
                    label: 'name',
                    children: 'teams',
                    // emitPath:true
                },
                tableHeight: '',
                devices: [],
                page: 1,
                total: 0,
                end: false,
                devRid: '',
                changeDev: false,
                reDev: false,
                changeData: {
                    oldrid: '',
                    newrid: '',
                    radio: '1',
                    textarea: '',
                    date: new Date(),
                },
                reData: {
                    rid: '',
                    radio: '',
                    textarea: '',
                    date: new Date(),
                },
                reqData: {
                    rid: '',
                    cid:sessionStorage.getItem('usertype')==100? 0 : (sessionStorage.getItem('companyid') || ''),
                    tid: sessionStorage.getItem('teamid') || ''
                },
                loading: false,
                reLoading: false,
                tidOptions: [],
                detailData:{}
            }
        },
        props: ['myheight'],
        created() {
            this.getTeamlist()
            this.tableHeight = this.$props.myheight - 52 - 48;
            this.administrators = sessionStorage.getItem('usertype') == 100 ? true:false;
        },
        mounted() {
            this.receiverList()
        },
        methods: {
            //获取车队选项
            getTeamlist() {
                this.$ajax('/api/team/list', {
                    cid: sessionStorage.getItem('companyid'),
                    tid: sessionStorage.getItem('teamid')
                })
                    .then((res) => {
                        this.tidOptions = this.addKey(res.teams);
                    })
                    .catch((err) => {

                    })
            },
            //接收器列表
            changeId(val) {
                if(val.length >0){
                    this.reqData.cid = JSON.parse(val[val.length - 1]).cid
                    this.reqData.tid = JSON.parse(val[val.length - 1]).tid
                }else {
                    if(sessionStorage.getItem('usertype')==100){
                        this.reqData.cid = 0;
                    }else {
                        this.reqData.cid = sessionStorage.getItem('companyid')
                    }
                    this.reqData.tid='';
                    this.receiverList()
                }
            },
            addKey(arr, cid = '') {
                for (let i = 0, len = arr.length; i < len; i++) {
                    arr[i].newid = JSON.stringify({cid: arr[i].cid, tid: arr[i].tid || ''})
                    if (arr[i].teams) {
                        arr[i].teams = this.addCid(arr[i].teams, arr[i].cid)
                    }
                }
                return arr;
            },
            addCid(arr, cid) {
                for (let i = 0, len = arr.length; i < len; i++) {
                    arr[i].newid = JSON.stringify({cid: cid, tid: arr[i].tid || ''})
                    if (arr[i].teams) {
                        this.addCid(arr[i].teams, cid)
                    }
                }
                return arr
            },
            receiverList(rid = '', page = 1) {
                let vm = this;
                let data = {...this.reqData}
                let newrid;
                if (rid) {
                    let str = rid.replace(/<\/?[^>]*>/gim, "");//去掉所有的html标记
                    let result = str.replace(/(^\s+)|(\s+$)/g, "");//去掉前后空格
                    newrid = result.replace(/\s/g, "");//去除文章中间空格
                } else {
                    newrid = ''
                }
                data.rid = newrid;
                data.page = page - 1;
                this.$ajax('/api/receiver/list',data)
                    .then(res=>{
                        this.devices = res.receivers || [];
                        this.total = res.total || 1;
                        if(res.error == 0){
                            this.page = page;
                        }else {
                            this.$message.error(res.msg)
                        }
                    })
                    .catch(err=>[

                    ])
            },
            searchDev() {
                this.page = 0;
                this.receiverList(this.devRid)
            },
            todevInfo(row) {
                sessionStorage.setItem('devinfoRid', row.rid)
                this.$router.push({
                    name: 'devinfo',
                })
            },
            handleEdit(row) {
                let vm = this;
                vm.changeDev = true;
                vm.changeData.oldrid = row.rid;
            },
            handleDelete(row) {
                this.reDev = true;
                this.reData = {
                    rid: row.rid,
                    radio: row.status == -2 ? '0' : '1',
                    textarea: '',
                    date: new Date()
                }
            },
            handleDetail(row){
                // detailData
                this.detailBox = true;
                this.$ajax('/api/receiver/detail',{rid:row.rid})
                    .then(res=>{
                        if(res.errcode== 0){
                            this.detailData = res.data;
                        }else {
                            this.detailData = {}
                        }
                    })
                    .catch(err=>{

                    })
            },
            //操作下拉框选择
            handleCommand(command){
                if(command.type == 1){
                    this.todevInfo(command.row)
                }else if(command.type == 2){
                    this.handleEdit(command.row)
                }else if(command.type == 3){
                    this.handleDelete(command.row)
                }else if(command.type == 4){
                    this.handleDetail(command.row)
                }
            },
            colseChangebox(val) {
                if (val == 1) {
                    this.changeDev = false;
                    this.changeData = {
                        oldrid: '',
                        newrid: '',
                        radio: '1',
                        textarea: '',
                        date: new Date()
                    }
                } else {
                    this.reDev = false;
                    this.reData = {
                        oldrid: '',
                        newrid: '',
                        radio: '',
                        textarea: '',
                        date: new Date()
                    }
                }

            },
            changeRid() {
                let vm = this;
                if (vm.changeData.newrid) {
                    vm.loading = true;
                    let myDate = this.getMydatetime(vm.changeData.date)
                    vm.$axios({
                        method: 'post',
                        url: window.$g_Api + '/api/receiver/exchange',
                        data: {
                            cid: sessionStorage.getItem('companyid'),
                            tid: sessionStorage.getItem('teamid'),
                            oldrid: vm.changeData.oldrid,
                            newrid: vm.changeData.newrid,
                            date: myDate.ddtime,
                            time: myDate.tttime,
                            invalid: vm.changeData.radio,
                            reason: vm.changeData.textarea
                        }
                    })
                        .then(function (res) {
                            vm.loading = false;
                            if (res.data.errcode == 0) {
                                vm.$message({
                                    type: 'success',
                                    message: vm.$t('message.success')
                                });
                                vm.changeDev = false;
                                vm.changeData = {
                                    oldrid: '',
                                    newrid: '',
                                    radio: '1',
                                    textarea: ''
                                }
                            } else {
                                vm.$message({
                                    type: 'error',
                                    message: res.data.msg
                                });
                            }
                        })
                        .catch(function (err) {
                            vm.loading = false;
                            vm.$message({
                                type: 'error',
                                message: err
                            });
                        });
                } else {
                    this.$message.error('*');
                    return false;
                }
            },
            reRid() {
                this.reLoading = true;
                let myDate = this.getMydatetime(this.reData.date)
                let data = {
                    cid: sessionStorage.getItem('companyid'),
                    tid: sessionStorage.getItem('teamid'),
                    rid: this.reData.rid,
                    valid: this.reData.radio,
                    date: myDate.ddtime,
                    time: myDate.tttime,
                    reason: this.reData.textarea,
                }
                this.$ajax('/api/receiver/invalid', data)
                    .then((res) => {
                        this.reLoading = false;
                        if (res.errcode == 0) {
                            this.colseChangebox(2)
                            this.receiverList(this.devRid, this.page)
                            this.$message.success('设备报废情况更改成功!');
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
            },
            handleCurrentChange(val) {
                this.receiverList(this.devRid, val)
            },
            getMydatetime(date) {
                let myIntdate = {
                    ddtime: '',
                    tttime: ''
                }
                if (date) {
                    let d = new Date(date);
                    let y = d.getFullYear().toString().substr(2, 2);
                    let m = (d.getMonth() + 1) > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1);
                    let r = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
                    let hh = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
                    let mm = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();
                    let ss = d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds();
                    myIntdate = {
                        ddtime: y + '' + m + r,
                        tttime: hh + '' + mm + ss
                    }
                }
                return myIntdate
            },
            //关闭详情框
            closeDetailbox(){
                this.detailBox = false;
            }
        },
    }
</script>

<style lang="scss" type="text/scss">
    #device {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        position: relative;
        .btnbox {
            width: 100%;
            padding: 10px 30px 0 10px;
            height: 48px;
            display: flex;
            justify-content: space-between;
        }
        .de_box {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 1;

            .listBox {
                width: 100%;
            }

            .page {
                width: 100%;
                text-align: center;
                margin: 10px auto;
            }
        }
        .changeDev {
            background-color: rgba(0, 0, 0, .4);
            /*position: absolute;*/
            /*top: 0;*/
            /*left: 0;*/
            .changeDev_box {
                padding: 20px;
                margin: 0 auto;
                margin-top: 200px;
                width: 420px;
                height: auto;
                vertical-align: middle;
                background-color: #fff;
                border-radius: 4px;
                border: 1px solid #ebeef5;
                font-size: 18px;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
                text-align: left;
                overflow: hidden;
                backface-visibility: hidden;

                .message-box__title {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;

                    span {
                        color: #303133;
                    }

                    i {
                        &:hover {
                            color: #409EFF;
                            cursor: pointer;
                        }
                    }
                }

                .message {
                    font-size: 14px;
                    color: #606266;
                    margin-top: 20px;
                    margin-bottom: 10px;
                }

                .radio {
                    margin-bottom: 20px;
                    margin-top: 20px;
                }

                .btn_box {
                    text-align: center;
                    margin-top: 20px;
                }
            }
        }
        .el-dropdown-link {
            cursor: pointer;
            color: #409EFF;
        }
        .el-icon-arrow-down {
            font-size: 12px;
        }
        .detailBox{
            width:100%;
            height: 100%;
            position: absolute;
            background-color:rgba(204,204,204,.3);
            .detailContent{
                position:relative;
                background-color: #ffffff;
                width: 840px;
                height: 460px;
                margin: 0 auto;
                margin-top: 50px;
                padding-top: 30px;
                border-radius: 10px;
                .cancel_icon{
                    position: absolute;
                    top:20px;
                    right: 20px;
                    &:hover{
                      cursor: pointer;
                    }
                }
                div{
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 15px;
                    p{
                        flex: 1;
                        span{
                            display:inline-block;
                            width: 180px;
                            color:#99a9bf;
                        }
                        i{
                            font-style: normal;
                            color:#606266;
                        }
                    }
                }
            }
        }
    }
</style>

