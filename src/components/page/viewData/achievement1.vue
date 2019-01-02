<template>
    <div id="achievement1" class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据统计 > 员工绩效</p>
        <div class="pro_box">
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
            <span class='info' @click='info'><i class="el-icon-info"></i>评分标准</span>
        </div>
        <template>
            <el-table
                :data="tableData"
                height="80%"
                border
                stripe
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
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.data['d'+item]}}
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <div :class="['text_content',{'text_content1':cs}]">
            <h3>客服绩效评分标准客服绩效评分标准</h3>
            <h5>1.朋友圈商品</h5>
            <p><span>（1）正确转化链接</span><span>10分</span></p>
            <p><span>（2）检查所有手机发送，不漏发，评论链接与商品同步</span><span>3分</span></p>
            <p><span>（3）当天商品不重复（返场除外）</span><span>1分</span></p>
            <p><span>（4）每天商品营业额3500以上（根据情况而定）</span><span>5分</span></p>
            <h5>2.常规消息回复</h5>
            <p><span>（1）及时、准确（10分钟内正确回复客户问题）</span><span>3分</span></p>
            <p><span>（2）态度语气亲切舒服</span><span>1分</span></p>
            <p><span>（3）不和客户发生正面冲突</span><span>5分</span></p>
            <h5>3.客户问题反馈与跟进</h5>
            <p><span>（1）需要后台处理的问题：窗口置顶、问题截图发到联盟群并备注号码</span><span>3分</span></p>
            <p><span>（2）跟进后台问题处理</span><span>1分</span></p>
            <p><span>（3）没有自动回复消息超过15分钟没有发现，扣1分，30分钟2分，以此类推。</span><span>5分</span></p>
            <h5>4.收微信号</h5>
            <p><span>（1）微信号符合条件</span><span>1分</span></p>
            <p><span>（2）做好账号保护措施</span><span>1分</span></p>
            <p><span>（3）截图发群里转账</span><span>1分</span></p>
            <p><span>（4）备注出售微信号客户</span><span>1分</span></p>
            <p><span>（5）收完微信号跟后台对接</span><span>1分</span></p>
            <h5>5.激活备注用户</h5>
            <p><span>（1）每天激活500人</span><span>2分</span></p>
            <h5>6.活跃vip</h5>
            <p><span>（1）每个群每周至少做一次活动</span><span>10分</span></p>
            <h5>7.工作日志</h5>
            <p><span>（1）语言简洁明了</span><span>1分</span></p>
            <p><span>（2）详细汇报工作内容及问题</span><span>1分</span></p>
            <h5>8.新号养号</h5>
            <p><span>（1）每天发6-7条朋友圈（教程视频、商品）</span><span>1分</span></p>
            <p><span>（2）和10个好友互动30条信息</span><span>2分</span></p>
            <p><span>（3）建立VIP群拉自己人（收号当天完成、满500人开始邀请vip进群并维护）</span><span>2分</span></p>
            <p><span>（4）产生位置移动（需要时可带回家：做好设备登记）</span><span>1分</span></p>
            <h5>9.封号处理</h5>
            <p><span>（1）防封准备（添加好友）</span><span>1分</span></p>
            <p><span>（2）第一时间告知</span><span>2分</span></p>
            <p><span>（3）30分钟内解封</span><span>2分</span></p>
            <h5>10.设备管理</h5>
            <p><span>（1）手机管理</span><span>25分</span></p>
            <p><span>（2）微信号保管</span><span>25分</span></p>
            <p><span>（3）号码卡话费查询</span><span>2分</span></p>
            <p><span>（4）业务手机不准连WiFi</span><span>1分</span></p>
            <p><span>（5）号码卡话费查询</span><span>5分</span></p>
            <h5>11.设备管理</h5>
            <p><span>（1）当天有更新即上传（微信号、各项工作流程）</span><span>1分</span></p>
            <p><span>（2）人数统计（6点前做好登记、并根据需要随时更新）</span><span>1分</span></p>
            <p><span>（3）微信号二维码（新增微信号更新）</span><span>1分</span></p>
            <h5>12.分析新用户</h5>
            <p><span>（1）数据准确，效率高</span><span>1分</span></p>
            <h5>13.排班</h5>
            <p><span>（1）每月25号提交下月班表</span><span>1分</span></p>
            <h5>14.上级交待的其他事项</h5>
            <p><span>（1）按时完成</span><span>5分</span></p>
            <p><span>（2）实时汇报进度</span><span>4分</span></p>
            <p><span>（3）工作汇报具体</span><span>1分</span></p>
            <h5>15.行政考核</h5>
            <p><span>（1）迟到</span><span>1分</span></p>
            <p><span>（2）旷工</span><span>5分</span></p>
            <h5>16.加分项</h5>
            <p><span>一周无扣分，加5分；连续两周无扣分加10分；连续三周无扣分加30分</span></p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'achievement1',
        data: function () {
            return {
                token:sessionStorage.getItem('token'),
                uid:sessionStorage.getItem('uid'),
                month: '',
                tableData: [],
                cs: false,
                days:[]
            }
        },
        mounted: function () {
            let vm = this;
            let date = new Date().getFullYear()+'-'+(new Date().getMonth()+1);
            this.month = date;
            this.getdata();
        },
        methods: {
            info: function () {
                this.cs = this.cs ? false : true;
            },
            getdata: function () {
                let vm = this;
                vm.getdays(vm.month);
                vm.$axios({
                    method:'post',
                    url:window.$g_Api + '/oa/achievement1/gettablelist',
                    data:{
                        token:vm.token,
                        uid:vm.uid,
                        date:vm.month
                    }
                })
                   .then(function(res){
                       vm.tableData = res.data.data;
                   })
                   .catch(function(err){});
            },
            getdays: function (data) {
                let date = new Date(data);//构造当前日期对象
                let year = date.getFullYear();//获取年份
                let mouth = date.getMonth() + 1;//获取当前月份
                let days;//定义当月的天数；
                let newdays =[];
                if (mouth == 2) {//当月份为二月时，根据闰年还是非闰年判断天数
                    days = year % 4 == 0 ? 29 : 28;
                } else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
                    days = 31;//月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
                }
                else {
                    days = 30;//其他月份，天数为：30.
                }
                for(let i = 0 ,len = days ; i < len; i++){
                    newdays.push(i+1)
                }
                this.days = newdays;
            },

        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    #achievement1 {
        .pro_box {
            display: flex;
            justify-content: space-between;
            padding-right: 50px;
            .pro_head {
                display: flex;
                justify-content: flex-start;
                margin-bottom: 20px;
            }
            .info {
                color: #999999;
                i {
                    margin-right: 6px;
                }
                &:hover {
                    cursor: pointer;
                }
            }
        }
        .text_content {
            width: 660px;
            height: 0px;
            overflow: hidden;
            position: absolute;
            top: 120px;
            left: 50%;
            margin-left: -330px;
            background-color: #fff;
            border: 1px solid #cccccc;
            opacity: 0;
            transition: all 0.5s;
            h3 {
                text-align: center;
            }
        }
        .text_content1 {
            opacity: 1;
            height: 70%;
            overflow: auto;
            padding: 20px;
        }

    }
</style>

