<template>
    <div id="achievement2" class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据管理 > 员工绩效 <i class="fontfamily te-oa-chehuisekuai tei" @click='back()' v-show='ifshow==2'></i>
        </p>
        <div class="pro_box" v-if='ifshow == 1'>
            <div class="pro_head">
                <span style='margin-right: 15px;line-height: 32px;'>选择时间段</span>
                <el-date-picker
                    v-model="month"
                    type="month"
                    value-format="yyyy-MM"
                    placeholder="选择月">
                </el-date-picker>
                <el-button type="primary" style='margin-left: 20px;' @click='getdata'>查询</el-button>
            </div>
            <template>
                <el-table
                    :data="tableData"
                    key='ac_table1'
                    height="80%"
                    border
                    stripe
                    v-loading='laoding'
                    highlight-current-row
                    style="width: 100%;font-size: 14px;white-space: nowrap">
                    <el-table-column
                        fixed
                        prop="name"
                        :label="month+''">
                    </el-table-column>
                    <el-table-column
                        fixed
                        prop='total'
                        label='总计'>
                    </el-table-column>
                    <el-table-column
                        v-for='item in days'
                        :key='item'
                        :label="item+'号'">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>{{ scope.row.data['i'+item]}}</p>
                                <div slot="reference" class="name-wrapper" style='width: 100%;height: 22px;'
                                     @click=cellclick(scope.row,item)>
                                    {{ scope.row.data['d'+item] }}
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <!--<div class="infobox" v-else-if='ifshow == 2'>-->
        <div class="infobox" v-show='show'>
            <div class="ac_box">
                <div class='cancel'><i class="el-icon-error" @click='cancel'></i></div>
                <div class="choiceBox">
                    <div>
                        <span>员工:</span>
                        <el-select v-model="setInfo.name" filterable placeholder="请选择" disabled>
                            <el-option
                                v-for="item in options1"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                        <span style="margin-left: 20px;">选择日期:</span>
                        <el-date-picker
                            v-model="setInfo.date"
                            disabled
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div>
                        <span>选项:</span>
                        <el-cascader
                            expand-trigger="hover"
                            :options="options"
                            @change="handleChange"
                            v-model="item">
                        </el-cascader>
                    </div>
                    <div style='margin:0px 15px;'>
                        <span>设置分值:</span>
                        <el-input-number v-model="setInfo.score"></el-input-number>
                    </div>
                    <div>
                        <el-button type='primary' @click='adddata()' :loading='loading1'>新增</el-button>
                        <el-button type="warning" plain @click='revisecore()' :disabled="re">修改</el-button>
                    </div>
                </div>
            </div>
            <div style='margin-top: 20px;'>
                <span>备注:</span>
                <el-input
                    style='width: 400px'
                    placeholder="请输入内容"
                    v-model="setInfo.note">
                </el-input>
            </div>
            <el-table
                :data="tableData1"
                class='reviseBox'
                key='ac_table2'
                v-loading='myload'
                height="80%"
                border
                stripe
                @row-click='rowclick'
                highlight-current-row
                style="width: 100%;font-size: 14px;white-space: nowrap;margin-top: 8px;">
                <el-table-column
                    prop="name"
                    width='100'
                    label="名字">
                    <!--<template slot-scope="scope">-->
                        <!--<input type="text" v-model='scope.row.name'>-->
                    <!--</template>-->
                </el-table-column>
                <el-table-column
                    prop='date'
                    width='150'
                    label='时间'>
                    <!--<template slot-scope="scope">-->
                        <!--<input type="text" v-model='scope.row.date'>-->
                    <!--</template>-->
                </el-table-column>
                <el-table-column
                    prop='score'
                    width='50'
                    label='分值'>
                    <!--<template slot-scope="scope">-->
                        <!--<input type="text" v-model='scope.row.score'>-->
                    <!--</template>-->
                </el-table-column>
                <el-table-column
                    prop='item'
                    label='对应项'>
                    <!--<template slot-scope="scope">-->
                        <!--<input type="text" v-model='scope.row.item'>-->
                    <!--</template>-->
                </el-table-column>
                <el-table-column
                    prop='note'
                    label='备注'>
                    <!--<template slot-scope="scope">-->
                        <!--<input type="text" v-model='scope.row.mark'>-->
                    <!--</template>-->
                </el-table-column>
                <el-table-column
                    label='操作'
                    fixed="right"
                    width='80'>
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" plain @click="del(scope.row['achievement_id'])">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--<div class='add_icon'>-->
                <!--<i class="el-icon-circle-plus-outline"></i>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'achievement2',
        data: function () {
            return {
                token: sessionStorage.getItem('token'),
                uid: sessionStorage.getItem('uid'),
                month: '',
                tableData: [],
                days: [],
                ifshow: '1',
                tableData1: [],
                options: [
                    {
                        value: '1.朋友圈商品',
                        label: '1.朋友圈商品',
                        children: [
                            {
                                value: '1.正确转化链接---10分',
                                label: '1.正确转化链接---10分',
                            },
                            {
                                value: '2.检查所有手机发送，不漏发，评论链接与商品同步---3分',
                                label: '2.检查所有手机发送，不漏发，评论链接与商品同步---3分',
                            },
                            {
                                value: '3.当天商品不重复（返场除外）---1分',
                                label: '3.当天商品不重复（返场除外）---1分',
                            },
                            {
                                value: '4.每天商品营业额3500以上（根据情况而定）---5分',
                                label: '4.每天商品营业额3500以上（根据情况而定）---5分',
                            },
                        ]
                    },
                    {
                        value: '2.常规消息回复',
                        label: '2.常规消息回复',
                        children: [
                            {
                                value: '1.及时、准确（10分钟内正确回复客户问题）---3分',
                                label: '1.及时、准确（10分钟内正确回复客户问题）---3分',
                            },
                            {
                                value: '2.态度语气亲切舒服---1分',
                                label: '2.态度语气亲切舒服---1分',
                            },
                            {
                                value: '3.不和客户发生正面冲突---5分',
                                label: '3.不和客户发生正面冲突---5分',
                            },
                            {
                                value: '4.收藏话术有误---1分',
                                label: '4.收藏话术有误---1分',
                            },
                            {
                                value: '5.误报漏回信息---1分',
                                label: '5.误报漏回信息---1分',
                            },
                        ]
                    },
                    {
                        value: '3.客户问题反馈与跟进',
                        label: '3.客户问题反馈与跟进',
                        children: [
                            {
                                value: '1.需要后台处理的问题：窗口置顶、问题截图发到联盟群并备注号码---3分',
                                label: '1.需要后台处理的问题：窗口置顶、问题截图发到联盟群并备注号码---3分',
                            },
                            {
                                value: '2.跟进后台问题处理---1分',
                                label: '2.跟进后台问题处理---1分',
                            },
                            {
                                value: '3.没有自动回复消息超过15分钟没有发现，扣1分，30分钟2分，以此类推。---5分',
                                label: '3.没有自动回复消息超过15分钟没有发现，扣1分，30分钟2分，以此类推。---5分',
                            },
                        ]
                    },
                    {
                        value: '4.收微信号',
                        label: '4.收微信号',
                        children: [
                            {
                                value: '1.微信号符合条件---1分',
                                label: '1.微信号符合条件---1分',
                            },
                            {
                                value: '2.做好账号保护措施---1分',
                                label: '2.做好账号保护措施---1分',
                            },
                            {
                                value: '3.截图发群里转账---1分',
                                label: '3.截图发群里转账---1分',
                            },
                            {
                                value: '4.备注出售微信号客户---1分',
                                label: '4.备注出售微信号客户---1分',
                            },
                            {
                                value: '5.收完微信号跟后台对接---1分',
                                label: '5.收完微信号跟后台对接---1分',
                            },
                        ]
                    },
                    {
                        value: '5.激活备注用户',
                        label: '5.激活备注用户',
                        children: [
                            {
                                value: '1.每天激活500人---2分',
                                label: '1.每天激活500人---2分',
                            },
                        ]
                    },
                    {
                        value: '6.活跃vip',
                        label: '6.活跃vip',
                        children: [
                            {
                                value: '1.每个群每周至少做一次活动10分---10分',
                                label: '1.每个群每周至少做一次活动10分---10分',
                            },
                        ]
                    },
                    {
                        value: '7.工作日志',
                        label: '7.工作日志',
                        children: [
                            {
                                value: '1.语言简洁明了---1分',
                                label: '1.语言简洁明了---1分',
                            },
                            {
                                value: '2.详细汇报工作内容及问题---1分',
                                label: '2.详细汇报工作内容及问题---1分',
                            },
                        ]
                    },
                    {
                        value: '8.新号养号',
                        label: '8.新号养号',
                        children: [
                            {
                                value: '1.每天发6-7条朋友圈（教程视频、商品）---1分',
                                label: '1.每天发6-7条朋友圈（教程视频、商品）---1分',
                            },
                            {
                                value: '2.和10个好友互动30条信息---2分',
                                label: '2.和10个好友互动30条信息---2分',
                            },
                            {
                                value: '3.建立VIP群拉自己人（收号当天完成、满500人开始邀请vip进群并维护---2分',
                                label: '3.建立VIP群拉自己人（收号当天完成、满500人开始邀请vip进群并维护---2分',
                            },
                            {
                                value: '4.产生位置移动（需要时可带回家：做好设备登记）---1分',
                                label: '4.产生位置移动（需要时可带回家：做好设备登记）---1分',
                            },
                        ]
                    },
                    {
                        value: '9.封号处理',
                        label: '9.封号处理',
                        children: [
                            {
                                value: '1.防封准备（添加好友---1分',
                                label: '1.防封准备（添加好友---1分',
                            },
                            {
                                value: '2.第一时间告知---2分',
                                label: '2.第一时间告知---2分',
                            },
                            {
                                value: '3.30分钟内解封---2分',
                                label: '3.30分钟内解封---2分',
                            },
                        ]
                    },
                    {
                        value: '10.设备管理',
                        label: '10.设备管理',
                        children: [
                            {
                                value: '1.手机管理---25分',
                                label: '1.手机管理---25分',
                            },
                            {
                                value: '2.微信号保管---25分',
                                label: '2.微信号保管---25分',
                            },
                            {
                                value: '3.号码卡话费查询---2分',
                                label: '3.号码卡话费查询---2分',
                            },
                            {
                                value: '4.业务手机不准连WiFi---1分',
                                label: '4.业务手机不准连WiFi---1分',
                            },
                            {
                                value: '5.号码卡话费查询---5分',
                                label: '5.号码卡话费查询---5分',
                            },
                        ]
                    },
                    {
                        value: '11.资料管理',
                        label: '11.资料管理',
                        children: [
                            {
                                value: '1.当天有更新即上传（微信号、各项工作流程）---1分',
                                label: '1.当天有更新即上传（微信号、各项工作流程）---1分',
                            },
                            {
                                value: '2.人数统计（6点前做好登记、并根据需要随时更新）---1分',
                                label: '2.人数统计（6点前做好登记、并根据需要随时更新）---1分',
                            },
                            {
                                value: '3.微信号二维码（新增微信号更新）---1分',
                                label: '3.微信号二维码（新增微信号更新）---1分',
                            },
                        ]
                    },
                    {
                        value: '12.分析新用户',
                        label: '12.分析新用户',
                        children: [
                            {
                                value: '1.数据准确，效率高---1分',
                                label: '1.数据准确，效率高---1分',
                            },
                        ]
                    },
                    {
                        value: '13.排班',
                        label: '13.排班',
                        children: [
                            {
                                value: '1.每月25号提交下月班表---1分',
                                label: '1.每月25号提交下月班表---1分',
                            },
                        ]
                    },
                    {
                        value: '14.上级交待的其他事项',
                        label: '14.上级交待的其他事项',
                        children: [
                            {
                                value: '1.按时完成---5分',
                                label: '1.按时完成---5分',
                            },
                            {
                                value: '2.实时汇报进度---4分',
                                label: '2.实时汇报进度---4分',
                            },
                            {
                                value: '3.工作汇报具体---1分',
                                label: '3.工作汇报具体---1分',
                            },
                            {
                                value: '4.失职---5分',
                                label: '4.失职---5分',
                            },
                            {
                                value: '5.没上报---3分',
                                label: '5.没上报---3分',
                            },
                        ]
                    },
                    {
                        value: '15.行政考核',
                        label: '15.行政考核',
                        children: [
                            {
                                value: '1.迟到---1分',
                                label: '1.迟到---1分',
                            },
                            {
                                value: '2.旷工---5分',
                                label: '2.旷工---5分',
                            },
                        ]
                    },
                    {
                        value: '16.加分项',
                        label: '16.加分项',
                        children: [
                            {
                                value: '一周无扣分，加5分；连续两周无扣分加10分；连续三周无扣分加30分',
                                label: '一周无扣分，加5分；连续两周无扣分加10分；连续三周无扣分加30分',
                            },
                        ]
                    },
                ],
                setInfo: {},
                options1: [],
                item: [],
                loading1: false,
                re:true,
                laoding:false,
                myload:false,
                show:false,
            }
        },
        mounted: function () {
            let vm = this;
            let date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1);
            this.month = date;
            this.getdata();
            // this.getserver();
        },
        methods: {
            back: function () {
                this.ifshow = '1'
                this.re = true;
            },
            cellclick: function (row, item) {
                // this.ifshow = '2'
                this.show = true
                this.setInfo.name = row.name
                item = item < 10 ? "0" + item : item;
                this.setInfo.date = this.month + '-' + item;
                this.getInfolist();
            },
            getInfolist: function () {
                let vm = this;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/achievement1/single_achievement',
                    data:{
                        token:vm.token,
                        uid:vm.uid,
                        review_name:vm.setInfo.name,
                        date:vm.setInfo.date
                    }
                })
                   .then(function(res){
                      res.data.code == 0?vm.tableData1 = res.data.data:vm.$message.error(res.message)
                   })
                   .catch(function(err){});
            },
            rowclick: function (row) {
                this.setInfo = row
                for(var key in row){
                    this.setInfo[key] = row[key];
                }
                this.re = false;
            },
            getdata: function () {
                let vm = this;
                vm.loading = true;
                vm.getdays(vm.month);
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/oa/achievement1/gettablelist',
                    data: {
                        token: vm.token,
                        uid: vm.uid,
                        date: vm.month
                    }
                })
                    .then(function (res) {
                        vm.loading = false;
                        vm.tableData = res.data.data;
                    })
                    .catch(function (err) {
                        vm.loading = false;
                    });
            },
            revisecore: function () {
                let vm = this;
                vm.myload = true;
                let data = {
                    token:vm.token,
                    uid:vm.uid,
                    info:vm.setInfo
                }
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/achievement2/revisescore',
                    data:data
                })
                   .then(function(res){
                       vm.myload = false;
                       vm.$message(res.data.message)
                       vm.getInfolist()
                   })
                   .catch(function(err){vm.myload = false;});
            },
            getdays: function (data) {
                let date = new Date(data);//构造当前日期对象
                let year = date.getFullYear();//获取年份
                let mouth = date.getMonth() + 1;//获取当前月份
                let days;//定义当月的天数；
                let newdays = [];
                if (mouth == 2) {//当月份为二月时，根据闰年还是非闰年判断天数
                    days = year % 4 == 0 ? 29 : 28;
                } else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
                    days = 31;//月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
                }
                else {
                    days = 30;//其他月份，天数为：30.
                }
                for (let i = 0, len = days; i < len; i++) {
                    newdays.push(i + 1)
                }
                this.days = newdays;
            },
            adddata: function () {
                let vm = this;
                vm.myload = true;
                if (!vm.setInfo.name || !vm.setInfo.date || !vm.setInfo.item) {
                    vm.$message.error('亲!除了备注其余都是必填项哦~~');
                    return false
                }
                vm.loading1 = true;
                let data = {
                    token: vm.token,
                    uid: vm.uid,
                    info: vm.setInfo
                }
                vm.$axios({
                    method: 'post',
                    url: window.$g_Api + '/oa/achievement2/setdata',
                    data: data
                })
                    .then(function (res) {
                        vm.getInfolist();
                        vm.loading1 = false;
                        vm.myload = false;
                        if (res.data.code == 0) {
                            vm.$message.success(res.data.message);
                        } else {
                            vm.$message.error(res.data.message);
                        }
                    })
                    .catch(function (err) {
                        vm.loading1 = false;
                        vm.myload = false;
                        vm.getInfolist();
                    });
            },
            cancel: function () {
                this.show = false;
                this.getdata();
            },
            del: function (id) {
                let vm = this;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/achievement2/delete_achievement',
                    data:{
                        token:vm.token,
                        uid:vm.uid,
                        achievement_id:id,
                    }
                })
                   .then(function(res){
                       vm.$message.success(res.data.message)
                       vm.getInfolist();
                   })
                   .catch(function(err){});
            },
            // getserver: function () {
            //     let vm = this;
            //     vm.$axios({
            //         method: 'post',
            //         url: window.$g_Api + '/oa/manage',
            //         data: vm.$qs.stringify({
            //             token: vm.token,
            //             uid: vm.uid,
            //         })
            //     })
            //         .then(function (res) {
            //             if (res.data.code == 0) {
            //                 let server = res.data.data;
            //                 for (let i = 0, len = server.length; i < len; i++) {
            //                     if (server[i].group == '客服') {
            //                         vm.options1.push(server[i].real_name)
            //                     }
            //                 }
            //             } else {
            //                 console.error(res.data.message);
            //             }
            //         })
            //         .catch(function (err) {
            //             console.error(err);
            //         });
            // },
            handleChange(val) {
                this.setInfo.item = val[0] + '/' + val[1];
            },
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    #achievement2 {
        position: relative;
        .cancel{
            width: 100%;
            height: 24px;
            i{
                float: right;
                font-size: 20px;
                &:hover{
                    cursor: pointer;
                }
            }
        }
        .pro_box {
            height: 93%;
            .pro_head {
                display: flex;
                justify-content: flex-start;
                margin-bottom: 20px;
            }
        }
        .infobox {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0px;
            left: 0px;
            padding: 20px;
            z-index: 999;
            background-color: rgba(204,204,204,0.95);
        }
        .reviseBox {
            input {
                display: block;
                width: 100%;
                height: 100%;
                border: none;
                background-color: transparent;
                outline: none;
            }
        }
        .tei {
            float: right;
            font-size: 24px;
            margin-bottom: 4px;
            color: #409EFF;
            &:hover {
                cursor: pointer;
            }
        }
        .add_icon {
            width: 100%;
            i {
                float: right;
                margin-right: 10px;
                font-size: 24px;
                margin-top: 10px;
                color: rgb(64, 158, 255);
                &:hover {
                    cursor: pointer;
                }
            }
        }
        .ac_box {
            width: 100%;
            /*display: flex;*/
            /*justify-content: flex-start;*/
            .text_content {
                height: 80%;
                overflow-y: auto;
                margin-right: 100px;
                &:scrollbar {
                    width: 0px;
                }
                h3 {
                    text-align: center;
                }
                h5 {
                    margin: 10px 0 5px 0;
                }
                p {
                    font-size: 14px;
                    margin: 8px 0;
                    span {
                        margin-right: 20px;
                    }
                }
            }
            .choiceBox {
                height: 100%;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                div {
                    margin-right: 10px;
                }
            }
        }
    }
</style>


