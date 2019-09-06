<template>
    <div id="loginHistory">
        <div class="loginHistory_header">
            <el-date-picker
                v-model="date"
                type="date"
                @change='changeDate'
                placeholder="选择日期">
            </el-date-picker>
            <el-button type="primary" plain icon="el-icon-back" circle @click='back()'></el-button>
        </div>
        <div class="mileage_table">
            <el-table
                id='outTable'
                :height='tableHeight'
                v-loading='loading'
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="账号"
                    prop="user">
                </el-table-column>
                <el-table-column
                    label="名称"
                    prop="name">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="登录日期">
                    <template slot-scope='scope'>
                        <span>{{scope.row.date | getIntDate2}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="登录时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.time | getIntTime2}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ip"
                    label="访问ip">
                </el-table-column>
                <el-table-column
                    prop="addr"
                    label="ip所在地址">
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
        name: 'loginHistory',
        data() {
            return {
                tableHeight:0,
                tableData: [],
                page: 0,
                total: 0,
                loading: false,
                date:'',
                reqDate:''
            }
        },
        props:['myheight'],
        created() {
            this.tableHeight = this.$props.myheight-48-52;
        },
        mounted() {
            this.getDatelist()
        },
        methods: {
            //获取列表数据
            getDatelist(ye = 0) {
                // this.loading = true;
                if (!ye) {
                    ye = 0
                    this.page = 0
                }
                this.$ajax('/api/customer/loginhistory',{
                    cid:sessionStorage.getItem('companyid'),
                    user:sessionStorage.getItem('checkUser'),
                    date:this.reqDate,
                    page:ye
                })
                    .then((res)=>{
                        if(res.errcode == 0 ){
                            this.tableData = res.datas;
                            this.total = res.total;
                        }else {

                        }
                    })
            },
            //分页器
            handleCurrentChange(val) {
                this.page = val;
                this.getDatelist(val - 1);
            },
            changeDate(date){
                if(date){
                    let y = date.getFullYear() % 1000;
                    let m = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) + '' : '0' + (date.getMonth() + 1);
                    let d = date.getDate() > 9 ? date.getDate() + '' : '0' + date.getDate();
                    this.reqDate = y + m + d;
                }else {
                    this.reqDate = '';
                }
                this.getDatelist();
            },
            back(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    #loginHistory {
        width: 100%;
        height: 100%;
        position: relative;
        .loginHistory_header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding:0 10px;
            padding-top: 10px;
            margin-bottom: 15px;
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



