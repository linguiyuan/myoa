<template>
    <div id="alarm_st">
        <div class="mileage_header">
            <div class="box_style">
                <div class="wap_div">
                    <el-input
                        placeholder="请输入设备号"
                        style='width: 140px'
                        v-model="reqData.rid"
                        @keyup.enter.native='getMileagelist()'
                        clearable>
                    </el-input>
                </div>
                <div class="wap_div">
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
                </div>
                <div class="wap_div">
                    <el-date-picker
                        style='width: 310px;'
                        v-model="reqData.date"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change='getMileagelist()'
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
                <div class="wap_div">
                    <el-select v-model="reqData.warntype" placeholder="报警类别"  style='width: 180px' @change='getMileagelist()'>
                        <el-option
                            v-for="item in warntypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-checkbox v-model="reqData.repeat" style='margin-left: 8px;' @change='getMileagelist()'>去除重复</el-checkbox>
                </div>
                <div class="wap_div">
                    <el-button type="primary" icon="el-icon-search" plain @click='getMileagelist()'>搜索</el-button>
                </div>
            </div>
            <div class="wap_div">
                <el-button type="success" icon="el-icon-download" plain
                           @click='exportExcel'>导出excel
                </el-button>
            </div>
        </div>
        <div class="mileage_table">
            <el-table
                id='outTable'
                :height='tableHeight'
                v-loading='loading'
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="日期"
                    width="110">
                    <template slot-scope="scope">
                        <span>{{scope.row.date | getIntDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="时间"
                    width="90">
                    <template slot-scope="scope">
                        <span>{{scope.row.time | getIntTime2}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="130"
                    prop="rid"
                    label="设备号">
                </el-table-column>
                <el-table-column
                    prop="team"
                    width="110"
                    label="车队">
                </el-table-column>
                <el-table-column
                    prop="plate"
                    width="100"
                    label="车牌">
                </el-table-column>
                <el-table-column
                    :show-overflow-tooltip=true
                    min-width="230"
                    prop="driver"
                    label="司机">
                </el-table-column>
                <el-table-column
                    prop="sid"
                    width="80"
                    label="传感器">
                </el-table-column>
                <el-table-column
                    prop="cardid"
                    width="50"
                    label="卡号">
                </el-table-column>
                <el-table-column
                    prop="sn"
                    width="50"
                    label="轮位">
                </el-table-column>
                <el-table-column
                    label="胎压(bar)">
                    <template slot-scope="scope">
                        <span>{{scope.row.presure | getnewvol}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="胎温(℃)">
                    <template slot-scope="scope">
                        <span>{{scope.row.temperature | getnewvol}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    :show-overflow-tooltip=true
                    label="报警类别">
                    <template slot-scope="scope">
                        <span>{{scope.row.warntype | geterrorType}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.status | errStatus}}</span>
                    </template>
                </el-table-column>
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
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'

    export default {
        name: 'alarmSt',
        data() {
            return {
                tableHeight:0,
                tidProps: {
                    // checkStrictly: true,
                    value: 'newid',
                    label: 'name',
                    children: 'teams',
                    // emitPath:true
                },
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text: '最近一个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit('pick', [start, end]);
                            }
                        },
                    ],
                    onPick: ({maxDate, minDate}) => {
                        this.pickerMinDate = minDate.getTime()
                        if (maxDate) {
                            this.pickerMinDate = ''
                        }
                    },
                    disabledDate: (time) => {
                        if (this.pickerMinDate !== '') {
                            const day30 = (30 - 1) * 24 * 3600 * 1000
                            let maxTime = this.pickerMinDate + day30
                            if (maxTime > new Date()) {
                                maxTime = new Date()
                            }
                            return time.getTime() > maxTime
                        }
                        return time.getTime() > Date.now()
                    }
                },
                reqData: {
                    date: [new Date(), new Date()],
                    rid: '',
                    warntype:0,
                    repeat:true,
                    cid: sessionStorage.getItem('companyid') || '',
                    tid: sessionStorage.getItem('teamid') || ''
                },
                warntypes:[//报警类别选项
                    {value:0,label:'全部类别'},
                    {value:1,label:'急漏气'},
                    {value:2,label:'慢漏气'},
                    {value:3,label:'温度高'},
                    {value:4,label:'气压高'},
                    {value:5,label:'气压低'},
                    {value:6,label:'发射器失联'},
                    {value:7,label:'发射器电池电压低'},
                ],
                tableData: [],
                page: 0,
                total: 0,
                loading: false,
                tidOptions: []
            }
        },
        props:['myheight'],
        created() {
            this.tableHeight = this.$props.myheight-52-48;
            this.getTeamlist()
        },
        mounted() {
            this.getMileagelist()
        },
        methods: {
            changeId(val) {
                this.reqData.cid = JSON.parse(val[val.length-1]).cid
                this.reqData.tid = JSON.parse(val[val.length-1]).tid
                this.getMileagelist(this.page)
            },
            //获取列表数据
            getMileagelist(ye = 0) {
                this.loading = true;
                if (!ye) {
                    ye = 0
                    this.page = 0
                }
                let begindate = this.formatDate(this.reqData.date[0]);
                let enddate = this.formatDate(this.reqData.date[1]);
                let data = {
                    cid: this.reqData.cid,
                    tid: this.reqData.tid,
                    rid: this.reqData.rid,
                    page: ye,
                    begindate,
                    enddate,
                    warntype:this.reqData.warntype,
                    repeat:this.reqData.repeat?1:0,
                }
                this.$ajax('/api/report/warning',data)
                    .then((res) => {
                        this.loading = false;
                        if (res.errcode == 0) {
                            this.tableData = res.datas ? res.datas : []
                            this.total = res.total;
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                    .catch((err) => {
                        this.loading = false;
                        this.$message.error(err)
                    })
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
            },
            //分页器
            handleCurrentChange(val) {
                this.page = val;
                this.getMileagelist(val - 1);
            },
            //导出表格
            exportExcel() {
                this.loading = true;
                let tid = ''
                if(this.reqData.tid.length > 0){
                    tid = this.reqData.tid[this.reqData.tid.length - 1]
                }
                let begindate = this.formatDate(this.reqData.date[0]);
                let enddate = this.formatDate(this.reqData.date[1]);
                let data = {
                    cid: sessionStorage.getItem('companyid'),
                    tid: tid,
                    rid: this.reqData.rid,
                    page: -1,
                    begindate,
                    enddate,
                    warntype:this.reqData.warntype,
                    repeat:this.reqData.repeat?1:0,
                }
                this.$ajax('/api/report/warning',data)
                    .then((res) => {
                        this.loading = false;
                        if (res.errcode == 0) {
                            this.tableData = res.datas ? res.datas : []
                            this.total = res.total;
                            this.$nextTick(()=>{
                                var xlsxParam = {raw: true};//转换成excel时，使用原始的格式
                                var wb = XLSX.utils.table_to_book(document.querySelector("#outTable"), xlsxParam);
                                var wbout = XLSX.write(wb, {
                                    bookType: "xlsx",
                                    bookSST: true,
                                    type: "array"
                                });
                                try {
                                    FileSaver.saveAs(
                                        new Blob([wbout], {type: "application/octet-stream;charset=utf-8"}),
                                        "sheetjs.xlsx"
                                    );
                                } catch (e) {
                                    if (typeof console !== "undefined") console.log(e, wbout);
                                }
                                // return wbout;
                            })
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                    .catch((err) => {
                        this.loading = false;
                        this.$message.error(err)
                    })
            },
            //时间格式转整型
            formatDate(now) {
                if (now) {
                    let tiem = new Date(now);
                    var year = tiem.getFullYear();
                    var month = tiem.getMonth() + 1 > 9 ? tiem.getMonth() + 1 : '0' + (tiem.getMonth() + 1);
                    var date = tiem.getDate() > 9 ? tiem.getDate() : '0' + tiem.getDate();
                    return year + '' + month + date;
                } else {
                    return ''
                }

            },
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    #alarm_st {
        width: 100%;
        height: 100%;
        position: relative;
        .mileage_header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding:0 10px;
            padding-top: 10px;
            margin-bottom: 15px;
            .box_style{
                display: flex;
                justify-content: flex-start;
            }
            .wap_div {
                margin: 0 10px;
                display: flex;
                justify-content: flex-start;
                line-height: 32px;
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



