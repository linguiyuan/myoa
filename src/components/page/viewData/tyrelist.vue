<template>
    <div id="tyrelist">
        <div class="btnbox">
            <div class="searchBox">
                <el-input
                    placeholder="请输入轮胎号"
                    style='width: 204px'
                    @keyup.enter.native='getListdata(tno)'
                    v-model="tno">
                </el-input>
                <el-cascader
                    :props='tidProps'
                    :options="tidOptions"
                    :show-all-levels='false'
                    :change-on-select='true'
                    @change='changeTid'
                    clearable>
                </el-cascader>
                <el-button type="primary" icon="el-icon-search" @click="getListdata(tno)">搜索</el-button>
            </div>
            <!--<el-button type="primary" size="mini">添加设备</el-button>-->
        </div>
        <div class="tyre_list_box">
            <el-table
                :stripe=true
                :height='tableHeight'
                v-loading='loading'
                :data='tyrelistData'
                style="width: 100%;background-color: transparent !important;">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="设备绑定的时间">
                                <span>{{ props.row.bt | formatDate}}</span>
                            </el-form-item>
                            <el-form-item label="关联车辆id">
                                <span>{{ props.row.vid}}</span>
                            </el-form-item>
                            <el-form-item label="传感器id">
                                <span>{{ props.row.sid}}</span>
                            </el-form-item>
                            <el-form-item label="总里程">
                                <span>{{ props.row.mileage | getspeed}}</span>
                            </el-form-item>
                            <el-form-item label="接收器id">
                                <span>{{ props.row.rid}}</span>
                            </el-form-item>
                            <el-form-item label="总天数">
                                <span>{{ props.row.duration}}</span>
                            </el-form-item>
                            <el-form-item label="花纹深度">
                                <span v-for='(value,index) in props.row.depths' :kye='index'>{{value}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    label="#"
                    type="index">
                </el-table-column>
                <el-table-column
                    label="公司名"
                    prop="company">
                </el-table-column>
                <el-table-column
                    label="车队名"
                    prop="team">
                </el-table-column>
                <el-table-column
                    label="车牌号"
                    prop="plate">
                </el-table-column>
                <el-table-column
                    min-width='150'
                    label="轮胎号"
                    prop="tno">
                </el-table-column>
                <el-table-column
                    label="轮胎型号"
                    min-width='150'
                    prop="mid">
                </el-table-column>
                <!--<el-table-column-->
                <!--min-width='130'-->
                <!--label="与设备绑定时间">-->
                <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.bt | formatDate}}</span>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                <!--min-width='120'-->
                <!--label="接收器id"-->
                <!--prop="rid">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                <!--label="卡号"-->
                <!--prop="cardid">-->
                <!--</el-table-column>-->
                <el-table-column
                    label="轮位"
                    prop="sn">
                    <template slot-scope="scope">
                        <span>{{scope.row.CardId+'-'+scope.row.sn}}</span>
                    </template>
                </el-table-column>
                <!--<el-table-column-->
                <!--label="传感器ID"-->
                <!--prop="sid">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                <!--label="关联的车辆ID"-->
                <!--prop="vid">-->
                <!--</el-table-column>-->
                <el-table-column
                    label="司机"
                    prop="driver">
                </el-table-column>
                <el-table-column
                    label="司机电话"
                    min-width='110'
                    prop="driverphone">
                </el-table-column>
                <!--<el-table-column-->
                <!--label="总里程">-->
                <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.mileage | getspeed}}</span>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                <!--label="总天数"-->
                <!--prop="duration">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                <!--label="总天数"-->
                <!--prop="duration">-->
                <!--</el-table-column>-->
                <el-table-column
                    label="安装人员"
                    prop="operator">
                </el-table-column>
                <el-table-column
                    min-width='130'
                    label="安装时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.operatetime | formatDate}}</span>
                    </template>
                </el-table-column>
                <!--<el-table-column-->
                <!--min-width='220'-->
                <!--label="操作">-->
                <!--<template slot-scope="scope">-->
                <!--<el-button-->
                <!--size="mini"-->
                <!--@click="todevInfo(scope.$index, scope.row)">详情-->
                <!--</el-button>-->
                <!--<el-button-->
                <!--size="mini"-->
                <!--@click="handleEdit(scope.$index, scope.row)">更换设备-->
                <!--</el-button>-->
                <!--<el-button-->
                <!--size="mini"-->
                <!--type="danger"-->
                <!--@click="handleDelete(scope.$index, scope.row)">{{scope.row.status | scrap}}-->
                <!--</el-button>-->
                <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
        </div>
        <div class="page">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-size="10"
                layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'tyrelist',
        data() {
            return {
                page: 0,
                total: 0,
                tableHeight: 0,
                tno: '',
                loading: false,
                tyrelistData: [],
                tidOptions: [],
                myid: {
                    cid: sessionStorage.getItem('companyid') || '',
                    tid: sessionStorage.getItem('teamid') || ''
                },
                tidProps: {
                    // checkStrictly: true,
                    value: 'newid',
                    label: 'name',
                    children: 'teams',
                    // emitPath:true
                },
            }
        },
        props: ['myheight'],
        created() {
            this.tableHeight = this.$props.myheight - 52 - 48;
            this.getTeamlist();
        },
        mounted() {
            this.getListdata('', 0)
        },
        methods: {
            getListdata(tno = '', page = '') {
                this.loading = true;
                this.$ajax('/api/tire/list', {
                    cid: this.myid.cid,
                    tno,
                    page,
                    tid: this.myid.tid
                })
                    .then((res) => {
                        this.loading = false;
                        if (res.errcode == 0) {
                            this.total = res.total;
                            this.tyrelistData = res.datas;
                        } else {
                            this.total = 0;
                            this.tyrelistData = [];
                        }
                    })
                    .catch((err) => {
                        this.$message.error(err)
                    })
            },
            //分页器
            handleCurrentChange(val) {
                this.page = val;
                this.getListdata(this.tno, this.page - 1)
            },
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
            //
            changeTid(val) {
                this.myid = JSON.parse(val[val.length-1])
                this.getListdata(this.tno,this.page)
            },
            addKey(arr, cid = '') {
                for (let i = 0, len = arr.length; i < len; i++) {
                    arr[i].newid = JSON.stringify({cid: arr[i].cid, tid: arr[i].tid || ''})
                    if(arr[i].teams){
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
            }
        }
    }
</script>

<style lang="scss" type="text/scss">
    #tyrelist {
        width: 100%;
        height: 100%;
        padding: 10px;
        position: relative;

        .btnbox {
            width: 100%;
            padding: 10px 30px 0 10px;
            height: 48px;
            display: flex;
            justify-content: space-between;
        }

        .tyre_list_box {
            width: 100%;
            overflow-y: auto;

            .demo-table-expand {
                font-size: 0;
            }

            .demo-table-expand label {
                width: 130px;
                color: #99a9bf;
            }

            .demo-table-expand .el-form-item {
                margin-right: 0;
                margin-bottom: 0;
                width: 50%;
            }
        }

        .page {
            width: 100%;
            height: 34px;
            text-align: center;
            margin: 5px auto;
            position: absolute;
            bottom: 0;
            left: 0;
        }
    }
</style>

