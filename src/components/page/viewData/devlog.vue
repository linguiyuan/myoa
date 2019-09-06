<template>
    <div id="devlog">
        <div class="devlog_header">
            <div class="box_style">
                <div class="wap_div">
                    <el-input
                        placeholder="请输入设备号"
                        style='width: 140px'
                        v-model="reqData.rid"
                        @keyup.enter.native='getData()'
                        clearable>
                    </el-input>
                </div>
                <div class="wap_div">
                    <el-select v-model="reqData.type" style='width: 120px;'>
                        <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="wap_div">
                    <el-date-picker
                        v-model="reqData.date"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="wap_div">
                    <el-button type="primary" icon="el-icon-search" plain @click='getData()'>搜索</el-button>
                </div>
            </div>
            <!--<div class="wap_div">-->
                <!--<el-button type="success" icon="el-icon-download" plain-->
                           <!--@click='exportExcel'>导出excel-->
                <!--</el-button>-->
            <!--</div>-->
        </div>
        <div class="devlog_table">
            <el-table
                id='devlogData'
                :height='tableHeight'
                v-loading='loading'
                :data="tableData"
                style="width: 100%;background-color: transparent !important;">
                <el-table-column
                    prop='rid'
                    width='130'
                    label="设备号">
                </el-table-column>
                <el-table-column
                    prop='type'
                    width='80'
                    label="数据类别">
                </el-table-column>
                <el-table-column
                    width='150'
                    label="时间">
                    <template slot-scope='scope'>{{scope.row.time | formatDate}}</template>
                </el-table-column>
                <el-table-column
                    min-width="480"
                    prop='data'
                    label="数据">
                </el-table-column>
                <el-table-column
                    width='80'
                    label="状态">
                    <template slot-scope='scope'>{{scope.row.stat | getstat}}</template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="analysis(scope.$index, scope.row)">解析</el-button>
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
    export default {
        name:'devlog',
        data(){
            return{
                page:0,
                tableHeight:0,
                total: 0,
                reqData:{
                    type:'',
                    rid:'',
                    date:''
                },
                loading:false,
                tableData:[],
                options1:[
                    {value:'',label:'全部'},
                    {value:'0200',label:'0200'},
                    {value:'0900',label:'0900'},
                ]
            }
        },
        props:['myheight'],
        filters:{
            getstat(val){
                let stat;
                switch (val) {
                    case 0 : stat='新数据';
                    break;
                    case 1 : stat='已读取';
                        break;
                    case 2 : stat='处理完成';
                        break;
                    case 3 : stat='异常';
                        break;
                    default: stat = '未知状态'
                };
                return stat;
            }
        },
        created() {
            this.tableHeight = this.$props.myheight-52-48;
            this.getData()
        },
        methods:{
            getData(ye=0){
                this.loading = true;
                if (!ye) {
                    ye = 0
                    this.page = 0
                }
                let data = {...this.reqData}
                if(data.date){
                    let y = data.date.getFullYear() % 1000;
                    let m = (data.date.getMonth() + 1) > 9 ? (data.date.getMonth() + 1) + '' : '0' + (data.date.getMonth() + 1);
                    let d = data.date.getDate() > 9 ? data.date.getDate() + '' : '0' + data.date.getDate();
                    data.date = y + m + d;
                }else {
                    data.date = '';
                }
                data.page = ye;
                this.$ajax('/api/receiver/rawdata',data)
                    .then(res=>{
                        this.loading = false;
                        if(res.errcode == 0 ){
                            this.tableData = res.datas;
                            this.total = res.total;
                        }
                    })
                    .catch(err=>{
                        this.loading = false;
                    })
            },
            //分页
            handleCurrentChange(val){
                this.page = val;
                this.getData(val-1);
            },
            //解析
            analysis(index,row){
                this.$ajax('http://smartu365.com:9801/parse',{text:row.data},'post',true)
                    .then(res=>{
                        const h = this.$createElement;
                        this.$msgbox({
                            title: '原始数据',
                            message: h('textarea',{style:'width:100%;height:550px;border:none;font-size:16px;padding:8px;line-height:24px;'},res),
                            customClass:"my_messagebox"
                        });
                    })
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
#devlog{
    width: 100%;
    height: 100%;
    position: relative;
    .devlog_header {
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

