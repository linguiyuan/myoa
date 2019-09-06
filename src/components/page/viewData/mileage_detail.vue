<template>
    <div id="mileage_detail">
        <div class="mileage_header">
            <div class="box_style">
                <div class="wap_div">
                    <el-input
                        placeholder="请输入设备号"
                        style='width: 180px'
                        v-model="reqData.rid"
                        @keyup.enter.native='getMileagelist()'
                        clearable>
                    </el-input>
                </div>
                <div class="wap_div">
                    <el-cascader
                        style='width: 220px'
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
                        v-model="reqData.date"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change='getMileagelist()'
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
                <div class="wap_div">
                    <el-button type="primary" icon="el-icon-search" plain @click='getMileagelist()'>搜索</el-button>
                </div>
            </div>
            <div class="wap_div">
                <el-button type="success" icon="el-icon-download" plain style='margin-left: 100px;'
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
                    min-width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.date | getIntDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="工作起始时间"
                    min-width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.workbegin | getIntTime2}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="工作结束时间"
                    min-width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.workend | getIntTime2}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    min-width="130"
                    prop="rid"
                    label="设备号">
                </el-table-column>
                <el-table-column
                    prop="team"
                    min-width="130"
                    label="车队">
                </el-table-column>
                <el-table-column
                    prop="plate"
                    min-width="130"
                    label="车牌">
                </el-table-column>
                <el-table-column
                    prop="driver"
                    min-width="230"
                    label="司机">
                </el-table-column>
                <el-table-column
                    prop="mileage"
                    label="里程(公里)">
                </el-table-column>
                <el-table-column
                    min-width="180"
                    label="工作时长(小时)">
                    <template slot-scope="scope">
                        <span>{{scope.row.wrokduration}}</span>
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
        name: 'mileageDetail',
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
                    cid: sessionStorage.getItem('companyid') || '',
                    tid: sessionStorage.getItem('teamid') || ''
                },
                tableData: [],
                page: 0,
                total: 0,
                loading: false,
                tidOptions: []
            }
        },
        props:['myheight'],
        created() {
            this.tableHeight = this.$props.myheight-55-55;
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
                }
                    this.$ajax('/api/report/mileage',data)
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
                }
                this.$ajax('/api/mileage/detail',data)
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
            exportExcel2(json, fields, filename = '测试数据.xlsx'){
                const s2ab = s => {
                    if (typeof ArrayBuffer !== 'undefined') {
                        var buf = new ArrayBuffer(s.length)
                        var view = new Uint8Array(buf)
                        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
                        return buf
                    } else {
                        var buf = new Array(s.length);
                        for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
                        return buf;
                    }
                }
                json.forEach(item => {
                    for (let i in item) {
                        if (fields.hasOwnProperty(i)) {
                            item[fields[i]] = item[i];
                        }
                        delete item[i]; //删除原先的对象属性
                    }
                })

                let sheetName = filename //excel的文件名称
                let wb = XLSX.utils.book_new()  //工作簿对象包含一SheetNames数组，以及一个表对象映射表名称到表对象。XLSX.utils.book_new实用函数创建一个新的工作簿对象。
                let ws = XLSX.utils.json_to_sheet(json, { header: Object.values(fields) }) //将JS对象数组转换为工作表。
                wb.SheetNames.push(sheetName)
                wb.Sheets[sheetName] = ws
                const defaultCellStyle = { font: { name: "Verdana", sz: 13, color: "FF00FF88" }, fill: { fgColor: { rgb: "FFFFAA00" } } };//设置表格的样式
                let wopts = { bookType: 'xlsx', bookSST: false, type: 'binary', cellStyles: true, defaultCellStyle: defaultCellStyle, showGridLines: false }  //写入的样式
                let wbout = XLSX.write(wb, wopts)
                let blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
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
    #mileage_detail {
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

