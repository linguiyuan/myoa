<template>
    <div id="devicestate" class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据管理 > 设备推广</p>
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
        <div style='width: 100%;height: 32px;margin-bottom: 10px;'>
            <el-button @click='setstate' style='float: right;' type="primary" :loading='loading'>保存更新</el-button>
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
                    v-for='item in days'
                    :key='item'
                    :label="item+'号'">
                    <template slot-scope="scope">
                        <span class='boxw' style='color: #67C23A;' v-if='scope.row.data["i"+item]=="推广完成"' @click='showbox(scope.row.name,item,scope.row.data["i"+item],scope.row.eid)'>{{scope.row.data['i'+item]}}</span>
                        <span class='boxw' style='color: #E6A23C;' v-else-if='scope.row.data["i"+item]=="推广中"' @click='showbox(scope.row.name,item,scope.row.data["i"+item],scope.row.eid)'>{{scope.row.data['i'+item]}}</span>
                        <span class='boxw' style='color: #F56C6C;' v-else-if='scope.row.data["i"+item]=="暂停推广"' @click='showbox(scope.row.name,item,scope.row.data["i"+item],scope.row.eid)'>{{scope.row.data['i'+item]}}</span>
                        <span class='boxw' v-else @click='showbox(scope.row.name,item,scope.row.data["i"+item],scope.row.eid)'>{{scope.row.data['i'+item]}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </template>

        <!--<el-dialog title="修改设备状态" :visible.sync="dialogFormVisible" width='500px'>-->
            <!--<el-form :model="form" v-loading='loading'>-->
                <!--<el-form-item label="设备号" label-width="120px">-->
                    <!--<el-input v-model="form.name" style='width: 203px;' disabled></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="日期" label-width="120px">-->
                    <!--<el-input v-model="form.date" style='width: 203px;' disabled></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="状态" label-width="120px">-->
                    <!--<el-select v-model="form.state" placeholder="选择状态">-->
                        <!--<el-option label="推广完成" value="推广完成"></el-option>-->
                        <!--<el-option label="暂停推广" value="暂停推广"></el-option>-->
                        <!--<el-option label="推广中" value="推广中"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="备注" label-width="120px">-->
                    <!--<el-input type="textarea" v-model="form.remark" style='width: 203px;'></el-input>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
            <!--<div slot="footer" class="dialog-footer">-->
                <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
                <!--<el-button type="primary" @click="setstate">确 定</el-button>-->
            <!--</div>-->
        <!--</el-dialog>-->
        <div id="setbox" v-show="dialogFormVisible">
            <!--<el-input v-model="form.date" style='width: 203px;' disabled></el-input>-->
            <!--<el-input v-model="form.name" style='width: 203px;' disabled></el-input>-->
            <el-select v-model="form.state" placeholder="选择状态" @change='changestate'>
                <el-option label="推广完成" value="推广完成"></el-option>
                <el-option label="暂停推广" value="暂停推广"></el-option>
                <el-option label="推广中" value="推广中"></el-option>
            </el-select>
            <!--<el-input type="textarea" v-model="form.remark" style='width: 203px;' placeholder='备注'></el-input>-->
            <!--<el-button type='primary' plain size="mini">确定</el-button>-->
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
export default{
    name:'devicestate',
    data: function () {
        return {
            token: sessionStorage.getItem('token'),
            uid: sessionStorage.getItem('uid'),
            month:'',
            days:[],
            tableData:[],
            tableData1:[],
            dialogFormVisible:false,
            form:{
                state:''
            },
            loading:false,
            x:0,
            y:0,
            newstate:[],
            loading:false,
        }
    },
    mounted: function () {
        let vm = this;
        let date = new Date().getFullYear()+'-'+(new Date().getMonth()+1);
        this.month = date;
        this.getdata();
    },
    methods:{
        //打开设置box
        showbox: function (name,day,state,eid) {
            this.dialogFormVisible = true;
            this.form.i = day;
            day > 9?day=this.month+'-'+day:day=this.month+'-0'+day;
            this.form.name=name;
            this.form.date=day;
            if(!state){
                this.form.state=''
            }
            this.form.state =state;
            // this.form.remark =remark;
            this.form.eid =eid;
            let e = window.event;
            let scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
            let scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
            this.x = e.pageX+scrollLeft;
            this.y = e.pageY+scrollTop;
            let the = document.getElementById('setbox');
            the.style.top = this.y+'px';
            the.style.left = this.x+40+'px';
        },
        changestate: function () {
            let vm = this;
            let arr = [...vm.tableData]
            for(let i = 0 ,len = arr.length ; i < len; i++){
                if(vm.form.eid == arr[i].eid){
                    arr[i].data['i'+vm.form.i] = vm.form.state;
                }
            }
            vm.tableData = arr;
            if(this.newstate.length > 0){
                for(let i = 0 ,len = vm.newstate.length ; i < len; i++){
                    if(vm.form.eid == vm.newstate[i].eid){
                        vm.newstate[i] = {date:vm.form.date,state:vm.form.state,eid:vm.form.eid}
                    }else {
                        vm.newstate.push({date:vm.form.date,state:vm.form.state,eid:vm.form.eid})
                    }
                }
            }else {
                vm.newstate.push({date:vm.form.date,state:vm.form.state,eid:vm.form.eid})
            }
            vm.dialogFormVisible = false;
        },
        //设置状态
        setstate: function () {
            let vm = this;
            vm.loading = true;
            vm.$axios({
                method:'post',
                url:window.$g_Api+'/oa/set_device_state',
                data:{
                    token:vm.token,
                    uid:vm.uid,
                    data:vm.newstate
                }
            })
               .then(function(res){
                   vm.$alert(res.data.message);
                   vm.loading = false;
                   vm.getdata();
               })
               .catch(function(err){vm.getdata();});
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
        getdata: function () {
            let vm = this;
            vm.getdays(vm.month);
            vm.$axios({
                method:'post',
                url:window.$g_Api+'/oa/devicestate',
                data:{
                    token:vm.token,
                    uid:vm.uid,
                    date:vm.month
                }
            })
               .then(function(res){
                   vm.tableData = res.data.data;
                   vm.tableData1 = res.data.data;
               })
               .catch(function(err){});
        }
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
#devicestate{
    .pro_head {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 20px;
    }
    .boxw{
        display: block;
        width: 100%;
        height: 24px;
        &:hover{
            cursor: pointer;
        }
    }
    #setbox{
        /*height: 240px;*/
        position: fixed;
        top: 0;
        left: 0;
        z-index: 88;
        /*background-color: #ffffff;*/
        /*padding: 15px;*/
        /*border-radius: 5px;*/
        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content: space-between;*/
        /*border:1px solid #909399;*/
    }
}
</style>

