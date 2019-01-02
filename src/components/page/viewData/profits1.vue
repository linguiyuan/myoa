<template>
    <div id="profits1" class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据管理 > 股东收益</p>
        <div class="pro_head">
            <span style='margin-right: 15px;line-height: 32px;'>选择时间段</span>
            <el-date-picker
                v-model="month"
                type="month"
                value-format="yyyy-MM"
                placeholder="选择月">
            </el-date-picker>
            <template>
                <el-select v-model="info_id" placeholder="请选择小组" style='margin-left: 12px;' v-show='show'>
                    <el-option
                        v-for="item in sh_info"
                        :key="item.sh_id"
                        :label="item.sh_name"
                        :value="item.sh_id">
                    </el-option>
                </el-select>
            </template>
            <el-button type="primary" style='margin-left: 20px;' @click='getprofits'>查询</el-button>
            <template>
                <el-radio-group v-model="type" style='margin-left: 100px;margin-top: 10px;' v-show='show'>
                    <el-radio :label="1">股东</el-radio>
                    <el-radio :label="2">合伙人</el-radio>
                </el-radio-group>
            </template>
        </div>
        <p v-if='type == 1' style='width: 100%;margin-bottom: 10px;'>
            <span>公司总收益:<i style='margin-left: 8px;color:#E6A23C;'>{{gs}}</i> </span>
            <span style="margin-left: 20px;">股东总分红:<i style='margin-left: 8px;color:#E6A23C;'>{{gd}}</i></span>
            <span style="margin-left: 20px;">设备总成本:<i
                style='margin-left: 8px;color:#E6A23C;'>{{total_cost.device_cost}}</i></span>
            <span style="margin-left: 20px;">人工总成本:<i style='margin-left: 8px;color:#E6A23C;'>{{total_cost.employee_wages}}</i></span>
            <span style="margin-left: 20px;">场地总成本:<i
                style='margin-left: 8px;color:#E6A23C;'>{{total_cost.rent}}</i></span>
        </p>
        <template>
            <!--<el-table-->
            <!--v-if='type == 1'-->
            <!--:data="tableData"-->
            <!--height="80%"-->
            <!--key='shareholders'-->
            <!--v-loading='laoding'-->
            <!--style="font-size: 14px;">-->
            <!--<el-table-column-->
            <!--fixed-->
            <!--prop="request_month"-->
            <!--width='100px'-->
            <!--label='月份'>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--fixed-->
            <!--width='120px'-->
            <!--prop="account_name"-->
            <!--label="账户名">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--fixed-->
            <!--width='100px'-->
            <!--prop="belong_to_whom"-->
            <!--label="所属">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--fixed-->
            <!--width='80px'-->
            <!--prop="belong_to_whom_ratio"-->
            <!--label="分红比">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--min-width='120'-->
            <!--prop="device_name"-->
            <!--label='包含设备'>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--width='110px'-->
            <!--prop="real_output_from_cibuluo"-->
            <!--label='朋友圈红利'>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--width='110px'-->
            <!--prop="raw_output"-->
            <!--label='产出估算'>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--width='110px'-->
            <!--prop="cost_payment"-->
            <!--label='提现成本'>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--width='110px'-->
            <!--prop="real_output"-->
            <!--label='实际产出'>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--width='180px'-->
            <!--style='background-color: red;'-->
            <!--prop="cost_man_power_base_customer"-->
            <!--label='人工成本（客户核算法）'>-->
            <!--<template slot-scope='scope'>-->
            <!--<span class='bgc_red'>{{scope.row.cost_man_power_base_customer}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--width='210px'-->
            <!--prop="cost_device_base_customer"-->
            <!--label='技术维护成本（客户核算法）'>-->
            <!--<template slot-scope='scope'>-->
            <!--<span class='bgc_red'>{{scope.row.cost_device_base_customer}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--width='180px'-->
            <!--prop="raw_device_profit_base_customer"-->
            <!--label='基本红利（客户核算法）'>-->
            <!--<template slot-scope='scope'>-->
            <!--<span class='bgc_red'>{{scope.row.raw_device_profit_base_customer}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--width='180px'-->
            <!--prop="raw_profit_base_customer"-->
            <!--label='账户红利（客户核算法）'>-->
            <!--<template slot-scope='scope'>-->
            <!--<span class='bgc_red'>{{scope.row.raw_profit_base_customer}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--width='180px'-->
            <!--prop="profit_base_customer"-->
            <!--label='账户分红（客户核算法）'>-->
            <!--<template slot-scope='scope'>-->
            <!--<span class='bgc_red'>{{scope.row.profit_base_customer}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--width='180px'-->
            <!--prop="cost_man_power_base_device"-->
            <!--label='人工成本（设备核算法）'>-->
            <!--<template slot-scope='scope'>-->
            <!--<span class='bgc_red'>{{scope.row.cost_man_power_base_device}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--width='210px'-->
            <!--prop="cost_device_base_device"-->
            <!--label='技术维护成本（设备核算法）'>-->
            <!--<template slot-scope='scope'>-->
            <!--<span class='bgc_red'>{{scope.row.cost_device_base_device}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--width='180px'-->
            <!--prop="raw_device_profit_base_device"-->
            <!--label='基本红利（设备核算法）'>-->
            <!--<template slot-scope='scope'>-->
            <!--<span class='bgc_red'>{{scope.row.raw_device_profit_base_device}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--width='180px'-->
            <!--prop="raw_profit_base_device"-->
            <!--label='账户红利（设备核算法）'>-->
            <!--<template slot-scope='scope'>-->
            <!--<span class='bgc_red'>{{scope.row.raw_profit_base_device}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--width='180px'-->
            <!--prop="profit_base_device"-->
            <!--label='账户分红（设备核算法）'>-->
            <!--<template slot-scope='scope'>-->
            <!--<span class='bgc_red'>{{scope.row.profit_base_device}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="avg_profit"-->
            <!--label='综合分红'>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--min-width='120'-->
            <!--prop="remark"-->
            <!--label='备注'>-->
            <!--</el-table-column>-->
            <!--</el-table>-->


            <el-table
                v-if='type == 1'
                :data="tableData"
                max-height="80%"
                key='shareholders'
                v-loading='laoding'
                style="font-size: 14px;width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item
                                label='人工成本（客户核算法）:'>
                                    <span class='bgc_red'>{{scope.row.cost_man_power_base_customer}}</span>
                            </el-form-item>
                            <el-form-item
                                label='人工成本（设备核算法）:'>
                                <span class='bgc_red'>{{scope.row.cost_man_power_base_device}}</span>
                            </el-form-item>
                            <el-form-item
                                label='基本红利（客户核算法）:'>
                                    <span class='bgc_red'>{{scope.row.raw_device_profit_base_customer}}</span>
                            </el-form-item>
                            <el-form-item
                                label='基本红利（设备核算法）:'>
                                <span class='bgc_red'>{{scope.row.raw_device_profit_base_device}}</span>
                            </el-form-item>
                            <el-form-item
                                label='账户红利（客户核算法）:'>
                                    <span class='bgc_red'>{{scope.row.raw_profit_base_customer}}</span>
                            </el-form-item>
                            <el-form-item
                                label='账户红利（设备核算法）:'>
                                <span class='bgc_red'>{{scope.row.raw_profit_base_device}}</span>
                            </el-form-item>
                            <el-form-item
                                label='账户分红（客户核算法）:'>
                                    <span class='bgc_red'>{{scope.row.profit_base_customer}}</span>
                            </el-form-item>
                            <el-form-item
                                label='账户分红（设备核算法）:'>
                                    <span class='bgc_red'>{{scope.row.profit_base_device}}</span>
                            </el-form-item>
                            <el-form-item
                                label='技术维护成本（客户核算法）:'>
                                <span class='bgc_red'>{{scope.row.cost_device_base_customer}}</span>
                            </el-form-item>
                            <el-form-item
                                label='技术维护成本（设备核算法）:'>
                                <span class='bgc_red'>{{scope.row.cost_device_base_device}}</span>
                            </el-form-item>
                            <el-form-item
                                style='width: 100%'
                                label='包含设备:'>
                                <span>{{scope.row.device_name}}</span>
                            </el-form-item>
                            <el-form-item
                                style='width: 100%'
                                label='备注:'>
                                <span>{{scope.row.remark}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="request_month"
                    label='月份'>
                </el-table-column>
                <el-table-column
                    prop="account_name"
                    label="账户名">
                </el-table-column>
                <el-table-column
                    width='80px'
                    prop="belong_to_whom"
                    label="所属">
                </el-table-column>
                <el-table-column
                    width='80px'
                    prop="belong_to_whom_ratio"
                    label="分红比">
                </el-table-column>
                <!--<el-table-column-->
                    <!--prop="device_name"-->
                    <!--label='包含设备'>-->
                <!--</el-table-column>-->
                <el-table-column
                    prop="real_output_from_cibuluo"
                    label='朋友圈红利'>
                </el-table-column>
                <el-table-column
                    prop="raw_output"
                    label='产出估算'>
                </el-table-column>
                <el-table-column
                    prop="cost_payment"
                    label='提现成本'>
                </el-table-column>
                <el-table-column
                    prop="real_output"
                    label='实际产出'>
                </el-table-column>
                <el-table-column
                    prop="avg_profit"
                    label='综合分红'>
                </el-table-column>
                <!--<el-table-column-->
                    <!--min-width='120'-->
                    <!--prop="remark"-->
                    <!--label='备注'>-->
                <!--</el-table-column>-->
            </el-table>

            <el-table
                v-else-if='type == 2'
                :data="tableData1"
                max-height="80%"
                key='partners'
                v-loading='laoding'
                style="width: 100%;font-size: 14px;">
                <el-table-column
                    prop="month"
                    label="月份">
                </el-table-column>
                <el-table-column
                    prop="partner"
                    label="合伙人">
                </el-table-column>
                <el-table-column
                    width='120px'
                    prop="partner_single_profit1"
                    label='单客佣金1'>
                </el-table-column>
                <el-table-column
                    width='120px'
                    prop="partner_single_profit2"
                    label='单客佣金2'>
                </el-table-column>
                <el-table-column
                    prop="partner_ratio"
                    label='分红比'>
                </el-table-column>
                <el-table-column
                    width='140px'
                    prop="partner_own_device_num"
                    label='拥有设备数'>
                </el-table-column>
                <el-table-column
                    width='140px'
                    prop="single_profit_avg"
                    label='综合月单客佣金'>
                </el-table-column>
                <el-table-column
                    width='140px'
                    prop="partner_single_cost"
                    label='月单客成本'>
                </el-table-column>
                <el-table-column
                    width='140px'
                    prop="month_single_profit"
                    label='月单客红利'>
                </el-table-column>
                <el-table-column
                    width='140px'
                    prop="partner_customer_avg"
                    label='设备平均客户人数'>
                </el-table-column>
                <el-table-column
                    width='140px'
                    prop="partner_single_cibuluo"
                    label='朋友圈收益'>
                </el-table-column>
                <el-table-column
                    width='140px'
                    prop="partner_single_profit"
                    label='合伙人单客红利'>
                </el-table-column>
                <el-table-column
                    width='140px'
                    prop="single_device_output"
                    label='单设备产出'>
                </el-table-column>
                <el-table-column
                    width='140px'
                    prop="single_device_cost"
                    label='单设备成本'>
                </el-table-column>
                <el-table-column
                    width='140px'
                    prop="single_device_profit"
                    label='单设备红利'>
                </el-table-column>
                <el-table-column
                    width='140px'
                    prop="partner_device_profit"
                    label='合伙人设备红利'>
                </el-table-column>
                <el-table-column
                    width='140px'
                    prop="single_device_output_avg"
                    label='合伙人分红'>
                </el-table-column>
                <el-table-column
                    width='140px'
                    prop="already_last_month_reserve"
                    label='上月备用金'>
                </el-table-column>
                <el-table-column
                    width='140px'
                    prop="already_reserve"
                    label='已存备用金'>
                </el-table-column>
                <el-table-column
                    width='140px'
                    prop="real_profit"
                    label='实际分红'>
                </el-table-column>
            </el-table>
            <div v-if='type == 1' style='width: 100%;'>
                <p style='float: right;margin-right: 10px;'>
                    已存备用金:<span style='margin: 0 8px;color:#E6A23C;'>{{total.already_reserve }}</span>
                    上月已存备用金:<span style='margin:0 8px;color:#E6A23C;'>{{total.already_last_month_reserve }}</span>
                    实际分红:<span style='margin:0 8px;color:#E6A23C;'>{{total.real_profit}}</span>
                </p>
            </div>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'profits1',
        data: function () {
            return {
                token: sessionStorage.getItem('token'),
                uid: sessionStorage.getItem('uid'),
                type: 3,
                show: false,
                month: '',
                tableData: [],
                tableData1: [],
                laoding: false,
                gs: null,
                gd: null,
                sh_info: [],
                info_id: '',
                total_cost: {},
                total:{},
            }
        },
        mounted: function () {
            this.month = new Date().getFullYear() + '-' + (new Date().getMonth() + 1);
            this.getprofits();
            this.shinfo();
        },
        methods: {
            shinfo: function () {
                let vm = this;
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/oa/sh_info',
                    data: {
                        token: vm.token,
                        uid: vm.uid,
                    }
                })
                    .then(function (res) {
                        vm.sh_info = res.data.data;
                    })
                    .catch(function (err) {
                    });
            },
            getprofits: function () {
                let vm = this;
                vm.laoding = true;
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/oa/profits1',
                    data: {
                        token: vm.token,
                        uid: vm.uid,
                        date: vm.month,
                        sh_info: vm.info_id
                    }
                })
                    .then(function (res) {
                        if (res.data.type == 0) {
                            vm.tableData = res.data.data.shareholders;
                            vm.tableData1 = res.data.data.partners;
                            vm.total_cost = res.data.total_cost
                            vm.total = res.data.data.total;
                            let a1 = 0, a2 = 0;
                            for (let i = 0, len = vm.tableData.length; i < len; i++) {
                                if (vm.tableData[i].sh_name == '公司') {
                                    a1 = a1 + vm.tableData[i].avg_profit
                                } else {
                                    a2 = a2 + vm.tableData[i].avg_profit
                                }
                            }
                            vm.gs = a1.toFixed(2);
                            vm.gd = a2.toFixed(2);
                            vm.show = true;
                            if(vm.type == 1){
                                vm.type = 1
                            }else if(vm.type == 2){
                                vm.type = 2
                            }else {
                                vm.type = 1
                            }
                        } else {
                            vm.type = res.data.type;
                            if (res.data.type == 1) {
                                vm.tableData = res.data.data;
                            } else if (res.data.type == 2) {
                                vm.tableData1 = res.data.data;
                            }
                        }
                        vm.laoding = false;
                    })
                    .catch(function (err) {
                    });
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    #profits1 {
        .pro_head {
            display: flex;
            justify-content: flex-start;
            margin-bottom: 20px;
        }
        .bgc_red {
            background-color: #fef0f0;
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
    }
</style>

