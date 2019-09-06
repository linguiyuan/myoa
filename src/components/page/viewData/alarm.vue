<template>
    <div id="alarm" ref='alarm' :style='"height:"+myheight+"px"'>
        <div class="header_box">
            <div class="rid_int">
                <el-input
                    placeholder="请输入设备号"
                    style='width: 180px'
                    v-on:keyup.13='geterrorList()'
                    v-model="listKey.rid">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click='geterrorList()'></i>
                </el-input>
            </div>
            <div class="date_box">
                <el-date-picker
                    v-model="listKey.date"
                    type="date"
                    @change='geterrorList()'
                    placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="select_box">
                <el-select v-model="listKey.type" placeholder="错误类别" @change='geterrorList()'>
                    <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="select_box">
                <el-select v-model="listKey.status" placeholder="状态" @change='geterrorList()'>
                    <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="contentbox">
            <el-table
                :data="tableData"
                :stripe=true
                :height='tableHeight'
                :row-class-name="tableRowClassName"
                @expand-change='getInfo'
                v-loading='alLoading'
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand" v-loading='loading'>
                            <el-form-item label="原始数据id">
                                <span>{{ props.row.info.orid}}</span>
                            </el-form-item>
                            <el-form-item label="设备号">
                                <span>{{ props.row.info.rid}}</span>
                            </el-form-item>
                            <el-form-item label="时间">
                                <span>{{ props.row.info.time | getIntTime}}</span>
                            </el-form-item>
                            <el-form-item label="卡号">
                                <span>{{ props.row.info.card}}</span>
                            </el-form-item>
                            <el-form-item label="序号">
                                <span>{{ props.row.info.sn}}</span>
                            </el-form-item>
                            <el-form-item label="报警类别">
                                <span>{{ props.row.info.warntype | geterrorType}}</span>
                            </el-form-item>
                            <el-form-item label="传感器">
                                <span>{{ props.row.info.sid}}</span>
                            </el-form-item>
                            <el-form-item label="气压">
                                <span>{{ props.row.info.pres | getfloorNb}} bar</span>
                            </el-form-item>
                            <el-form-item label="经度">
                                <span>{{ props.row.info.longitude}}</span>
                            </el-form-item>
                            <el-form-item label="电压">
                                <span>{{ props.row.info.vol | getfloorNb}} v</span>
                            </el-form-item>
                            <el-form-item label="纬度">
                                <span>{{ props.row.info.latitude}}</span>
                            </el-form-item>
                            <el-form-item label="气温">
                                <span>{{ props.row.info.temp }} ℃</span>
                            </el-form-item>
                            <el-form-item label="状态">
                                <span>{{ props.row.info.stat | geterrorStat}}</span>
                            </el-form-item>
                            <el-form-item label="报警级别">
                                <span>{{ props.row.info.level}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    type="index">
                </el-table-column>
                <el-table-column
                    width=180
                    label="时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.time | getIntTime}}</span>
                    </template>
                </el-table-column>
                <!--<el-table-column-->
                    <!--width=210-->
                    <!--label="记录id"-->
                    <!--prop="id">-->
                <!--</el-table-column>-->
                <el-table-column
                    label="车队名"
                    width=180
                    prop="team">
                </el-table-column>
                <el-table-column
                    width=180
                    label="设备号"
                    prop="rid">
                </el-table-column>
                <el-table-column
                    label="卡号"
                    width=80
                    prop="card">
                </el-table-column>
                <el-table-column
                    width=80
                    label="序号"
                    prop="sn">
                </el-table-column>
                <el-table-column
                    label="错误类型">
                    <template slot-scope='scope'>
                        <span>{{scope.row.warntype | geterrorType}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page page_box">
                <!--<div class="lrbtn">-->
                    <!--<el-button size="mini" :disabled='listKey.page==0?true:false' @click='pageL()'>上一页</el-button>-->
                    <!--<el-button size="mini" :disabled='end' @click='pageR()'>下一页</el-button>-->
                <!--</div>-->
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="listKey.page"
                :page-size="20"
                layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'alarm',
        data: function () {
            return {
                listKey: {
                    rid: '',
                    date: new Date(),
                    type: '',
                    status: '0',
                    page: 0,
                },
                loading: false,
                info: {
                    orid: '',
                    rid: '',
                    time: '',
                    card: '',
                    sn: '',
                    warntype: '',
                    sid: '',
                    latitude: '',
                    longitude: '',
                    vol: '',
                    pres: '',
                    temp: '',
                    stat: '',
                    level: '',
                },
                tableData: [],
                tableHeight:0,
                options1:[
                    {
                        label:'全部类别',
                        value:''
                    },
                    {
                        label:'急漏气',
                        value:'1'
                    },
                    {
                        label:'慢漏气',
                        value:'2'
                    },
                    {
                        label:'温度高',
                        value:'3'
                    },
                    {
                        label:'气压高',
                        value:'4'
                    },
                    {
                        label:'气压低',
                        value:'5'
                    },
                    {
                        label:'发射器失联',
                        value:'6'
                    },
                    {
                        label:'发射器电池电压低',
                        value:'7'
                    },
                ],
                options2:[
                    {
                        label:'新纪录',
                        value:'0'
                    },
                    {
                        label:'已通知',
                        value:'1'
                    },
                    {
                        label:'已处理',
                        value:'2'
                    },

                    {
                        label:'无效报警纪录，如重复报警',
                        value:'-1'
                    },
                    {
                        label:'全部状态',
                        value:'3'
                    },
                ],
                end:false,
                total:0,
                alLoading:false,
            }
        },
        props:['myheight'],
        created() {
            this.tableHeight = this.$props.myheight-52-48;
            this.geterrorList();
        },
        mounted(){
        },
        methods: {
            //获取列表数据
            geterrorList(page=0) {
                let vm = this;
                if(!page){vm.page = 0}
                vm.alLoading = true;
                let data = {...vm.listKey};
                if(data.date){
                    let y = data.date.getFullYear() % 1000;
                    let m = (data.date.getMonth() + 1) > 9 ? (data.date.getMonth() + 1) + '' : '0' + (data.date.getMonth() + 1);
                    let d = data.date.getDate() > 9 ? data.date.getDate() + '' : '0' + data.date.getDate();
                    data.date = y + m + d;
                }else {
                    data.date = '';
                }
                data.page = page
                vm.$ajax('/api/tirewarning/list', data)
                    .then(function (res) {
                            vm.alLoading = false;
                            if (res.errcode == 0) {
                                vm.total = res.total;
                                vm.tableData = res.warnings;
                                // if(res.warnings.length > 0){
                                //     vm.end = false;
                                //     vm.tableData = res.warnings;
                                // }else {
                                //     vm.end = true;
                                //     vm.listKey.page--;
                                //     vm.$message('已是最后一页')
                                // }
                            } else {
                                vm.$message.error(res.msg)
                            }
                        }
                    )
            },
            //获取详情
            getInfo(row, expandedRows) {
                let vm = this;
                vm.loading = true;
                if (expandedRows.length > 0) {
                    let data = {
                        id: row.id,
                        gpstype: 'bd'
                    }
                    vm.$ajax('/api/tirewarning/detail', data)
                        .then(function (res) {
                                vm.loading = false;
                                console.log(res);
                                if (res.errcode == 0) {
                                    for (let i = 0, len = vm.tableData.length; i < len; i++) {
                                        if (vm.tableData[i].id == row.id) {
                                            vm.tableData[i].info = res.detail;
                                        }
                                    }
                                } else {
                                    vm.$message.error(res.msg)
                                }
                            }
                        )
                } else {
                    return false
                }
            },
            //颜色分级
            tableRowClassName({row, rowIndex}) {
                return 'level'+row.level
            },
            handleCurrentChange(val){
                this.geterrorList(val-1);
            },
        }
    }
</script>

<style lang="scss" type="text/scss">
    #alarm {
        width: 100%;
        .header_box{
            width: 100%;
            height: 52px;
            padding: 10px;
            display: flex;
            justify-content: flex-start;
            div{
                margin-right: 10px;
            }
            .rid_int{
                height: 100%;
            }
            .date_box{

            }
        }
        .contentbox {
            flex: 1;
        }
        .page_box{
            height: 48px;
            width: 100%;
            text-align: center;
            margin: 0px auto;
            padding: 8px;
        }
        .demo-table-expand {
            font-size: 0;
        }

        .demo-table-expand label {
            width: 90px;
            color: #99a9bf;
        }

        .demo-table-expand .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 50%;
        }
        .el-table .level0 {
            color: #F56C6C;
        }

        .el-table .level1 {
            color: #E6A23C;
        }

        .el-table .level2 {
            color: #909399;
        }
    }
</style>

