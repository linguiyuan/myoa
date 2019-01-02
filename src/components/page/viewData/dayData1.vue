<template>
    <div id='everyDayOrders' class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据统计 > 每日数据</p>
        <div class="da_header">
            <p>查询时间：</p>
            <el-date-picker
                v-model="queryTime "
                type="daterange"
                align="left"
                unlink-panels
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <template>
                <el-select v-model="group_id" placeholder="请选择小组" style='width: 140px;margin-left: 8px;'>
                    <el-option
                        v-for="item in options"
                        :key="item.group_id"
                        :label="item.group_name"
                        :value="item.group_id">
                    </el-option>
                </el-select>
            </template>
            <el-button type="primary" style='margin-left: 15px;' @click='getEveryDay'>点击搜索</el-button>
            <p class="shortcut">
                <span @click='getAxios({"dbname":"amount","start_time":queryTime[0],"end_time":queryTime[1]},1)' :class="{activate:at==1?true:false}">付款金额</span>
                <span @click='getAxios({"dbname":"settlement","start_time":queryTime[0],"end_time":queryTime[1]},2)' :class="{activate:at==2?true:false}">结算金额</span>
                <span @click='getAxios({"dbname":"est_effect","start_time":queryTime[0],"end_time":queryTime[1]},3)' :class="{activate:at==3?true:false}">效果预估</span>
                <span @click='getAxios({"dbname":"set_effect","start_time":queryTime[0],"end_time":queryTime[1]},4)' :class="{activate:at==4?true:false}">结算预估</span>
                <span @click='getAxios({"dbname":"effective_order","start_time":queryTime[0],"end_time":queryTime[1]},5)' :class="{activate:at==5?true:false}">订单数量</span>
            </p>
        </div>
        <div class="my_table_box">
            <template>
                <el-table
                    :data="content"
                    stripe
                    height="80%"
                    v-loading='loading'
                    style="width: 100%">
                    <el-table-column v-for='(value,key,index) in title' :key='index'
                        highlight-current-row= true
                        :fixed='index<2?true:false'
                        :label="value"
                        :width='index<2?120:180'>
                        <template slot-scope="scope">
                            <input
                                v-if="key == 't0'"
                                class='device'
                                :disabled="true"
                                v-model="scope.row[key]">
                            <span v-else-if="key == 't1'">{{scope.row[key] | getName}}</span>
                            <span v-else class='tip_box' @mouseenter='getInfo(value,scope.row["t1"])' @mouseleave='leave()' style='width: 180px'>
                                {{scope.row['t'+index]}}
                                <sup
                                    :class="(scope.row['t'+index]-scope.row['t'+(index+1)]>0?'sub1':'sub2')"
                                    style='margin-left: 6px;'>{{[(scope.row['t'+index]),(scope.row['t'+(index+1)])] | setSub()}}
                                    <i :class="['fontfamily',scope.row['t'+index]-scope.row['t'+(index+1)]>0?'te-oa-xiangshang':'te-oa-xiangxia']"></i>
                                </sup>
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div id="tip_content" v-show='ti'>
            <div class="tip_header">
                <p class="tip_title">
                    <i></i>信息情况 微信号
                    <span>{{info.wechat_id}}</span>
                </p>
                <!--<p class="item">-->
                    <!--人数组:xxx小组 编号: 2-->
                <!--</p>-->
            </div>
            <div class="tip_content" v-loading='infolaoding'>
                <div class="content_left">
                    <p class="qiu">人数</p>
                    <div class="number">
                        <p>总人数</p>
                        <p class="nb">{{info.customer}}</p>
                    </div>
                    <div class="increase">
                        <p>比前日增长<span>{{info.c1}}</span><sup v-if='info.c1>0' style='color: red;'>↑</sup><i v-else-if='info.c1<0' style='color:#5daf34'>↓</i></p>
                        <p>比前7天增长<span>{{info.c2}}</span><sup v-if='info.c2>0' style='color: red;'>↑</sup><i v-else-if='info.c2<0' style='color:#5daf34'>↓</i></p>
                        <p>平均人数<span>{{info.c3}}</span><sup v-if='info.c3>0' style='color: red;'>↑</sup><i v-else-if='info.c3<0' style='color:#5daf34'>↓</i></p>
                    </div>
                </div>
                <div class="content_right">
                    <p class="qiu">订单</p>
                    <div class="number">
                        <p>总订单</p>
                        <p class="nb">{{info.order}}</p>
                    </div>
                    <div class="increase">
                        <p>昨日增长<span>{{info.o1}}</span><sup v-if='info.o1>0' style='color: red;'>↑</sup><i v-else-if='info.o1<0' style='color:#5daf34'>↓</i></p>
                        <p>7天增长<span>{{info.o2}}</span><sup v-if='info.o2>0' style='color: red;'>↑</sup><i v-else-if='info.o2<0' style='color:#5daf34'>↓</i></p>
                        <p>平均订单数<span>{{info.o3}}</span><sup v-if='info.o3>0' style='color: red;'>↑</sup><i v-else-if='info.o3<0' style='color:#5daf34'>↓</i></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var mysettime;
    export default {
        name: 'dashboard',
        data() {
            return {
                token:sessionStorage.getItem('token'),
                uid:sessionStorage.getItem('uid'),
                queryTime:'',
                title:null,
                content:null,
                propArr:[],
                at:null,
                loading:true,
                ti:false,
                infolaoding:false,
                info:{
                    wechat_id:null,
                    customer:0,
                    order:0,
                    c1:0,
                    c2:0,
                    c3:0,
                    o1:0,
                    o2:0,
                    o3:0,
                },
                options:[],
                group_id:'',
            }
        },
        mounted: function () {
            this.getAxios();
            this.getoptions();
        },
        computed:{
            data: function (key,the,last) {
            },
        },
        computed: {},
        methods:{
            getoptions: function () {
                let vm = this;
                vm.$axios({
                    method:'post',
                    url:window.$g_Api+'/oa/get_group_info',
                    data:{
                        token:vm.token,
                        uid:vm.uid
                    }
                })
                    .then(function(res){
                        vm.options = res.data.data;
                    })
                    .catch(function(err){});
            },
            getEveryDay: function () {
                let vm = this;
                vm.at = null
                vm.getAxios({
                    token:vm.token,
                    uid:vm.uid,
                    start_time:vm.queryTime[0],
                    end_time:vm.queryTime[1],
                    group_id:vm.group_id,
                })
            },
            //鼠标移入显示提示框
            getInfoBox: function (evnet) {
                this.ti = true;
                let e = evnet || window.event;
                let scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
                let scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
                this.x = e.pageX+scrollLeft;
                this.y = e.pageY+scrollTop;
                let the = document.getElementById('tip_content');
                the.style.top = this.y+10+'px';
                the.style.left = this.x+10+'px';
            },
            getInfo: function (val,key) {
                let vm = this;
                vm.info = {
                    wechat_id:null,
                    customer:0,
                    order:0,
                    c1:0,
                    c2:0,
                    c3:0,
                    o1:0,
                    o2:0,
                    o3:0,
                };
                vm.getInfoBox()
                mysettime = setTimeout(function () {
                    vm.infolaoding = true;
                    vm.$axios({
                        method:'post',
                        url:window.$g_Api+'/oa/single_detail',
                        data:{
                            token:vm.token,
                            uid:vm.uid,
                            date:val,
                            device_account:key,
                        }
                    })
                        .then(function(res){
                            let value = res.data.data;
                            vm.info.wechat_id = value.wechat_id;
                            let c=0;
                            let o=0;
                            if(value.customer_list.length > 0){
                                // for(let i = 0 ,len = value.customer_list.length ; i < len; i++){
                                //     c = c +value.customer_list[i]
                                // }
                                vm.info.customer = value.customer_list[0];
                                vm.info.c1 = (value.customer_list[0] - value.customer_list[1]).toFixed(0);
                                vm.info.c2 = (value.customer_list[0] - value.customer_list[6]).toFixed(0);
                                vm.info.c3 = (c / value.customer_list.length).toFixed(0);
                            }
                            if(value.order_list.length > 0){
                                // for(let i = 0 ,len = value.order_list.length ; i < len; i++){
                                //     o = o +value.order_list[i]
                                // }
                                vm.info.order = value.order_list[0];
                                vm.info.o1 = (value.order_list[0] - value.order_list[1]).toFixed(0);
                                vm.info.o2 = (value.order_list[0] - value.order_list[6]).toFixed(0);
                                vm.info.o3 = (o / value.order_list.length).toFixed(0);
                            }
                            vm.infolaoding = false;
                        })
                        .catch(function(err){vm.infolaoding = false;});
                },200)
            },
            leave: function () {
                clearTimeout(mysettime)
                this.ti = false;
            },
            getAxios: function (data,nb) {
                let vm = this;
                vm.loading = true;
                if(nb){
                    vm.at = nb;
                }
                if(!data){
                    data = {token:vm.token,uid:vm.uid,group_id:vm.group_id,}
                }else {
                    data.token = vm.token;
                    data.uid = vm.uid;
                    data.group_id=vm.group_id;
                }
                vm.$axios({
                    method:'post',
                    url:window.$g_Api + '/oa/daydata1',
                    data:data
                })
                    .then(function(res){
                        // let obj1={};
                        // let arr = [];
                        // for(let i = 0 ,len = res.data.content.length ; i < len; i++){
                        //     let obj={};
                        //     for(let e = 0 ,len =res.data.content[i].length  ; e < len; e++){
                        //         obj['t'+e] = res.data.content[i][e];
                        //     }
                        //     arr.push(obj);
                        // }
                        // for(let i = 0 ,len = res.data.title.length ; i < len; i++){
                        //     obj1['t'+i] = res.data.title[i];
                        // }
                        vm.loading = false;
                        if(res.data.code == 0){
                            vm.content = res.data.data.content;
                            vm.title = res.data.data.title;
                        }else {
                            vm.$message.error(res.data.message);
                        }

                    })
                    .catch(function(err){});
            },
        }
    }

</script>


<style lang='scss' scoped>
    #everyDayOrders{
        table,thead,tbody,tr,th,td{
            border: 1px solid #dedede;
            white-space:nowrap;
        }
        .da_header{
            display: flex;
            justify-content: flex-start;
            height: 32px;
            line-height: 32px;
            margin-bottom: 20px;
            .shortcut{
                margin-left: 40px;
                span{
                    display: inline-block;
                    padding: 0px 20px;
                    color: #409eff;
                    &:hover{
                        cursor: pointer;
                    }
                }
                .activate{
                    color: #e6a23c;
                }
            }
        }
        .my_table_box{
            width: 100%;
            height: 100%;
            div.cell{
                white-space:nowrap !important;
                overflow: visible;
            }
            thead{
                th{
                    background-color: #50bfff;
                }
            }
            .sub1{
                color: #f56c6c;
            }
            .sub2{
                color: #5daf34;
            }
            .device{
                width: 100%;
                background-color: transparent;
                border:none;
                color: #606266;
                font-size: 12px;
            }
            .tip_box{
                display: inline-block;
                width: 100%;
                height: 100%;
                &:hover{
                    cursor:pointer;
                }
            }
        }
        #tip_content{
            width: 600px;
            height: 160px;
            position: fixed;
            left: 0;
            top:0;
            z-index: 999999;
            background-color: #ffffff;
            border:1px solid #cccccc;
            padding: 8px;
            .tip_header{
                width: 100%;
                height: 26px;
                font-size: 16px;
                line-height: 26px;
                display: flex;
                justify-content: space-between;
                background-color:rgba(204,204,204,0.2);
                .tip_title{
                    display: flex;
                    justify-content: flex-start;
                    font-weight: bold;
                    i{
                        display: block;
                        width: 3px;
                        height: 100%;
                        background-color: #409EFF;
                        margin-right: 5px;
                    }
                    span{
                        font-size: 14px;
                        color: red;
                        margin-left: 3px;
                    }
                }
            }
            .tip_content{
                margin-top: 15px;
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                color: #666666;
                .content_left,.content_right{
                    height: 80px;
                    display: flex;
                    justify-content: flex-start;
                    padding: 15px;
                    .qiu{
                        width: 50px;
                        height: 50px;
                        border-radius:50%;
                        background-color: #409EFF;
                        color: #ffffff;
                        text-align: center;
                        line-height: 50px;
                        font-size: 20px;
                        margin-right: 10px;
                        margin-top: 15px;
                    }
                    .number,.increase{
                        height: 100%;
                        font-size: 12px;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        line-height: 20px;
                    }
                    .increase{
                        margin-left: 15px;
                        span{
                            margin-left: 8px;
                            margin-right: 4px;
                        }
                    }
                }
            }
        }
    }
</style>
