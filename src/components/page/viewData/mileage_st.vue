<template>
<div id="mileage_st">
    <div class="header_box">
        <div class="rid_int">
            <el-input
                placeholder="请输入设备号"
                style='width: 180px'
                v-on:keyup.13='searchRid'
                v-model="keys.rid">
                <i slot="suffix" class="el-input__icon el-icon-search" @click='searchRid'></i>
            </el-input>
        </div>
        <div class="date_box">
            <el-date-picker
                v-model="keys.year"
                type="year"
                @change='changeYear'
                value-format='yyyy'
                format="yyyy 年"
                style='z-index: 9999999'
                placeholder="选择年份">
            </el-date-picker>
        </div>
        <div class="date_box">
            <el-select v-model="keys.month" placeholder="请选择月份" clearable @change='changeMonth' style='z-index: 9999999'>
                <el-option
                    v-for="item in monthoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
    </div>
    <div id="myChart_st"></div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
    name:'mileageSt',
    data(){
        return{
            myChart: '',
            option: {
                title: {
                    // text: '2019年',
                    // left:'center',
                    // textStyle:{
                    //     fontSize:16,
                    // },
                    // subtext: '2019年',
                    // subtextStyle:{
                    //     fontSize:16,
                    // }
                },
                tooltip:{
                    triangle:'axis'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    data: [],
                    position: 'bottom',
                    axisLabel: {
                        interval: 0,
                        // rotate:"45",
                        formatter: function (value) {
                            let str = value.split("");
                            if (str.length > 2) {
                                return value.split("").join("\n");
                            } else {
                                return value;
                            }
                        },
                        textStyle: {
                            color: 'rgba(0,0,0,0.5)'
                        }
                    },
                    nameTextStyle: {
                        verticalAlign: 'middle'
                    },
                    // offset:35,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    z: 10
                },
                yAxis: {
                    name: 'km(公里)',
                    min: 0,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        },
                        margin: 0
                    }
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start:0,
                        end:100
                    }
                ],
                series: [
                    { // For shadow
                        type: 'bar',
                        barWidth: 20,
                        itemStyle: {
                            normal: {color: 'rgba(0,0,0,0.05)'}
                        },
                        barGap: '-100%',
                        barCategoryGap:'40%',
                        data: [],
                        animation: false
                    },
                    {
                        type: 'bar',
                        barWidth: 20,
                        // braGap:'100%',
                        // barCategoryGap: '120%',
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#83bff6'},
                                        {offset: 0.5, color: '#188df0'},
                                        {offset: 1, color: '#188df0'}
                                    ]
                                ),
                                label: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: 'red',
                                        fontSize: 16
                                    }
                                }
                            },
                            emphasis: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#2378f7'},
                                        {offset: 0.7, color: '#2378f7'},
                                        {offset: 1, color: '#83bff6'}
                                    ]
                                )
                            }
                        },
                        data: []
                    }
                ],
                animationEasing: 'elasticOut',
            },
            monthoptions: [
                {
                value: '1',
                label: '1月'
            }, {
                value: '2',
                label: '2月'
            }, {
                value: '3',
                label: '3月'
            }, {
                value: '4',
                label: '4月'
            }, {
                value: '5',
                label: '5月'
            },{
                    value: '6',
                    label: '6月'
             },{
                value: '7',
                label: '7月'
            },{
                value: '8',
                label: '8月'
            },{
                value: '9',
                label: '9月'
            },{
                value: '10',
                label: '10月'
            },{
                value: '11',
                label: '11月'
            },{
                value: '12',
                label: '12月'
            }
            ],
            keys:{
                cid: sessionStorage.getItem('companyid'),
                tid: sessionStorage.getItem('teamid'),
                rid: '',
                year: '',
                month: '',
            },
            type:1,
            changeOptions: {
                type: '',
                dataType: 1,
                value: '',
                typeDates: ['全部数据', '2017', '2018', '2019'],
                companyOption: [{vale: 1, name: '公司1'}, {vale: 2, name: '公司2'}, {vale: 3, name: '公司3'},],
                teamOption: [{vale: 1, name: '车队1'}, {vale: 2, name: '车队2'}, {vale: 3, name: '车队3'},],
                ridOption: [],
                companys: ['公司1', '公司2', '公司3', '公司4', '公司5',],
                teams: ['选择车队'],
                rids: [],
                companyName: sessionStorage.getItem('companyname'),
                teamName: sessionStorage.getItem("teamName") ? sessionStorage.getItem("teamName") : '选择车队',
                typeDate: '全部数据',
                rid: '',
                y: '',
                m: ''
            },
        }
    },
    mounted() {
        this.getstatisticData(this.keys)
        this.newLines(this.option);
        this.clickCan();
    },
    methods: {
        //创建折线图
        newLines(gradientOption) {
            this.myChart = this.$echarts.init(document.getElementById('myChart_st'));
            this.myChart.setOption(gradientOption);
        },
        //获取统计数据
        getstatisticData(obj){
            if(obj.year){
                obj.year = obj.year.replace(/[^0-9]/ig,"");
                obj.year = obj.year.slice(2,4)
            }
            if(obj.month){
                obj.month = obj.month.replace(/[^0-9]/ig,"");
            }
            this.$ajax('/api/mileage/statistics',obj)
                .then((res)=>{
                    if(res.errcode == 0){
                        this.type = res.data.type;
                        if(!res.data.mileages){
                            this.option.xAxis.data = [];
                            this.option.yAxis.max = 500;
                            this.option.series[0].data = [];
                            this.option.series[1].data = [];
                        }else {
                            let mileages = res.data.mileages;
                            let [arr1, arr2, arr3, arrDate] = [[], [], [], []];
                            let s;
                            res.data.type == 2?s = '月':s='';
                            for (let i = 0, len = mileages.length; i < len; i++) {

                                arr1.push(mileages[i].date+s);
                                arrDate.push('20' + mileages[i].date + '年')
                                arr2.push(mileages[i].mileage.toFixed(0) * 1);
                            }
                            let max = Math.max(...arr2)
                            for (let i = 0, len = arr2.length; i < len; i++) {
                                arr3.push(max)
                            }
                            if(res.data.type == 1){
                                this.option.xAxis.data = arrDate;
                            }else {
                                this.option.xAxis.data = arr1;
                            }
                            this.option.yAxis.max = max;
                            this.option.series[0].data = arr3;
                            this.option.series[1].data = arr2;
                        }
                        this.myChart.setOption(this.option);
                    }else {

                    }
                })
        },
        //柱状图点击事件
        clickCan(){
            //给柱体注册点击事件
            this.myChart.on('click',(params)=>{
                if(this.type == 1){
                    this.keys.year = params.name;
                }else if(this.type == 2){
                    this.keys.month = params.name;
                }else {
                    return false;
                }
                this.getstatisticData({...this.keys});
            })
        },
        //年月份切换
        changeYear(val){
            this.keys.year = val;
            this.getstatisticData({...this.keys});
        },
        changeMonth(val){
            if(this.keys.year == ''){
                return false
            }else {
                this.keys.month = val;
                this.getstatisticData({...this.keys});
            }
        },
        searchRid(){
            this.getstatisticData({...this.keys});
        }
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
#mileage_st{
    #myChart_st{
        width: 100%;
        height: 600px;
    }
    .header_box{
        width: 100%;
        height: 52px;
        padding: 10px;
        display: flex;
        justify-content: flex-start;
        div{
            margin-right: 10px;
        }
        .rid_int{
            height: 100%;
        }
        .date_box{

        }
    }
}
</style>

