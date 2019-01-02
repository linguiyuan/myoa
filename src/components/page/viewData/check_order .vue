<template>
    <div id="check_order " class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据统计 > 订单查询</p>
        <div class="checkbox">
            <span>订单编码:</span>
            <el-input v-model="order_num" placeholder="请输入内容"
                      style='width: 180px;margin-right: 20px;margin-left: 10px;'></el-input>
            <span>关键词:</span>
            <el-input v-model="query" placeholder="请输入内容" style='width: 180px;margin-left: 10px;margin-right: 20px;'></el-input>
            <el-button type="primary" icon="el-icon-search" @click='getpreview'>搜索</el-button>
        </div>
        <template>
            <el-table
                :data="tableData"
                border
                v-loading='loading'
                height='76%'
                style="width: 100%;margin-top: 20px;">
                <el-table-column
                    prop="create_time"
                    width='160px'
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    prop="settlement_time"
                    width='160px'
                    label="结算时间">
                </el-table-column>
                <el-table-column
                    prop="order_num"
                    label="订单编号">
                </el-table-column>s
                <el-table-column
                    prop="goods_info"
                    label="商品信息">
                </el-table-column>
                <el-table-column
                    prop="goods_num"
                    width='80px'
                    label="商品数量">
                </el-table-column>
                <el-table-column
                    prop="amount"
                    width='80px'
                    label="付款金额">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="类目名称">
                </el-table-column>
                <el-table-column
                    prop="shop_name"
                    label="所属店铺">
                </el-table-column>
            </el-table>
        </template>
        <div class="block">
            <el-pagination
                style='margin: 0 auto;text-align: center;'
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="20"
                layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'checkorder',
        data: function () {
            return {
                token: sessionStorage.getItem('token'),
                uid: sessionStorage.getItem('uid'),
                order_num: '',
                query: '',
                page:1,
                tableData: [],
                loading:false,
                total:null,
            }
        },
        mounted: function () {
            // this.getpreview();
        },
        methods: {
            getpreview: function () {
                let vm = this;
                vm.loading = true;
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/oa/check_order',
                    data: {
                        token: vm.token,
                        uid: vm.uid,
                        order_num: vm.order_num,
                        query: vm.query,
                        page:vm.page
                    }
                })
                    .then(function (res) {
                        vm.loading = false;
                        if (res.data.code == 0) {
                            vm.tableData = res.data.data;
                            vm.total = res.data.total;
                        }
                    })
                    .catch(function (err) {
                        vm.loading = false;
                    });
            },
            handleSizeChange(val) {
                this.page = val;
                this.getpreview()
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getpreview()
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    #check_order {
        .checkbox {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            margin-bottom: 40px;
        }
        .block{
            width: 100%;
            text-align: center;
        }
    }
</style>


