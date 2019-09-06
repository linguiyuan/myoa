<template>
<div id="device_warehousing">
    <template>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" :style="'height:'+tableHeight+'px;'+'border-radius: 10px;'">
            <el-tab-pane label="批量创建接收器" name="first">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" style='width: 650px;margin: 20px 0 0 20px;'>
                    <el-form-item label="设备类别" prop="type">
                        <el-select v-model="ruleForm.type" placeholder="设备类别">
                            <el-option v-for='item in options' :label="item.label" :value="item.value" :key='item.value'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目编号" prop="project">
                        <el-input v-model.number="ruleForm.project" placeholder="2个字节的数字"></el-input>
                        <span style='padding-left: 8px;color: #999999;'>* 2个字节的数字</span>
                    </el-form-item>
                    <el-form-item label="制造商编码" prop="manufacturer">
                        <el-input v-model.number="ruleForm.manufacturer" placeholder="1个字节的数字"></el-input>
                        <span style='padding-left: 8px;color: #999999;'>* 1个字节的数字</span>
                    </el-form-item>
                    <el-form-item label="年份的最后一位" prop="year">
                        <el-input v-model.number="ruleForm.year" placeholder="1个字节的数字"></el-input>
                        <span style='padding-left: 8px;color: #999999;'>* 1个字节的数字</span>
                    </el-form-item>
                    <el-form-item label="周数" prop="week">
                        <el-input v-model.number="ruleForm.week" placeholder="1或2个字节的不为0的数字"></el-input>
                        <span style='padding-left: 8px;color: #999999;'>* 1或2个字节的不为0的数字</span>
                    </el-form-item>
                    <el-form-item label="起始编号" prop="startnumber">
                        <el-input v-model.number="ruleForm.startnumber" placeholder="数字范围:0-9999"></el-input>
                        <span style='padding-left: 8px;color: #999999;'>* 数字范围:0-9999</span>
                    </el-form-item>
                    <el-form-item label="截止编号" prop="endnumber">
                        <el-input v-model.number="ruleForm.endnumber" placeholder="0-9999,截止编号必须大于起始编号"></el-input>
                        <span style='padding-left: 8px;color: #999999;'>* 0-9999,截止编号必须大于起始编号</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="根据设备编码批量导入" name="second">
                <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="140px" class="demo-ruleForm" style='width: 650px;margin: 20px 0 0 20px;'>
                    <el-form-item label="设备类别" prop="type">
                        <el-select v-model="ruleForm2.type" placeholder="设备类别">
                            <el-option v-for='item in options' :label="item.label" :value="item.value" :key='item.value'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备号" prop="rids">
                        <el-input type="textarea" v-model="ruleForm2.rids" @change=myTextarea @keyup.enter.native="listen"></el-input>
                        <span style='padding-left: 8px;color: #999999;'>每行一个设备号</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm2('ruleForm2')">开始导入</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </template>
</div>
</template>

<script type="text/ecmascript-6">
export default {
    name:'deviceWarehousing',
    data(){
        return {
            tableHeight:0,
            activeName: 'first',
            ruleForm: {
                type: '',
                project: '',
                manufacturer: '',
                year: '',
                week: '',
                startnumber: '',
                endnumber: '',
            },
            ruleForm2:{
                type:'',
                rids:''
            },
            options:[
                {label:'小车',value:1},
                {label:'大车',value:2},
                {label:'挂车',value:3},
                {label:'车头',value:4},
                {label:'整车',value:5},
            ],
            rules: {
                type: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ],
                project:[
                    { required: true, message: '请输入项目编号', trigger: 'blur' },
                    { min: 10, max: 99, type: 'number', message: '长度需为2个字符的数字', trigger: 'blur' }
                ],
                manufacturer:[
                    { required: true, message: '请输入制造商编码', trigger: 'blur' },
                    { min: 0, max: 9, type: 'number', message: '长度需为1个字符的数字', trigger: 'blur' }
                ],
                year:[
                    { required: true, message: '请输入年份最后一位', trigger: 'blur' },
                    { min: 0, max: 9, type: 'number', message: '长度需为1个字符的数字', trigger: 'blur' }
                ],
                week:[
                    { required: true, message: '请输入周数', trigger: 'blur' },
                    { min: 1, max: 99, type: 'number', message: '长度需为1至2个字符且不为0的数字', trigger: 'blur' }
                ],
                startnumber:[
                    { required: true, message: '请输入起始编号', trigger: 'blur' },
                    { min: 0, max: 9999, type: 'number', message: '需要0-9999范围的数值', trigger: 'blur' }
                ],
                endnumber:[
                    { required: true, message: '请输入截止编号', trigger: 'blur' },
                    { min: 0, max: 9999, type: 'number', message: '需要0-9999范围内且大于起始编号的数值', trigger: 'blur' }
                ],
            },
            rules2:{
                type: [{ required: true, message: '请选择类型', trigger: 'change' }],
                rids:[{ required: true, message: '请输入设备号', trigger: 'blur' }]
            }
        }
    },
    props:['myheight'],
    created() {
        this.tableHeight = this.$props.myheight;
    },
    methods:{
        handleClick(tab, event) {
            console.log(tab, event);
        },
        //批量创建接收器
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {...this.ruleForm}
                    this.$ajax('/api/receiver/batchcreate',data)
                        .then(res=>{
                            if(res.errcode == 0){
                                const h = this.$createElement;
                                this.$msgbox({
                                    title: '创建成功',
                                    message: h('div', null, [
                                        h('p', null, '总记录条数 : '+res.count),
                                        h('p', null, '失败条数 : ' + res.failedcount),
                                        h('p', null, '失败设备号 : ' + res.faileds.join(',')),
                                    ]),
                                    showCancelButton: true,
                                    showCancelButton:false,
                                    confirmButtonText: '确定',
                                });
                            }else {
                                this.$msgbox({
                                    title: '创建失败',
                                    message: res.msg,
                                    showCancelButton: true,
                                    showCancelButton:false,
                                    confirmButtonText: '确定',
                                });
                            }
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //批量导入
        submitForm2(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {...this.ruleForm2}
                    data.rids = data.rids.replace(/[\u4e00-\u9fa5\A-Za-z\`~!@#$%^&*()_\-+=<>?:"{}|.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’。、,，]/g,'').replace(/\n{2,}/g,'\n').replace(/\n$/g,'').replace(/\n/g,',')
                    this.$ajax('/api/receiver/import',data)
                        .then(res=>{
                            if(res.errcode == 0){
                                const h = this.$createElement;
                                this.$msgbox({
                                    title: '创建成功',
                                    message: h('div', null, [
                                        h('p',{style:'margin-left:20px;'}, '总记录条数 : '+res.count),
                                        h('p', {style:'margin-left:20px;'}, '失败条数 : ' + res.failedcount),
                                        h('p', {style:'margin-left:20px;'}, '失败设备号 : ' + res.faileds.join(',')),
                                    ]),
                                    type:'success',
                                    showCancelButton: true,
                                    showCancelButton:false,
                                    confirmButtonText: '确定',
                                });
                            }else {
                                this.$msgbox({
                                    title: '创建失败',
                                    message: res.msg,
                                    showCancelButton: true,
                                    showCancelButton:false,
                                    confirmButtonText: '确定',
                                });
                            }
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //重置1
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //逗号换行
        myTextarea(value){
            if(value){
                // console.log(211);
                // this.ruleForm2.rids = value.replace(/[\u4e00-\u9fa5\A-Za-z\`~!@#$%^&*()_\-+=<>?:"{}|.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’。、]/g,'').replace(/，/g,',\n');
                // this.ruleForm2.rids = value.replace(/\s/g,',\n').replace(/，/g,',\n');
            }
        },
        //监听键盘事件
        listen () {
                let str = this.ruleForm2.rids;
                // this.ruleForm2.rids = str.replace(/[,，\\s+]/,',');
                this.ruleForm2.rids = str.replace(/[\u4e00-\u9fa5\A-Za-z\`~!@#$%^&*()_\-+=<>?:"{}|.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’。、,，]/g,'').replace(/\n{2,}/g,'\n');
        },
    }
}
</script>

<style lang="scss" type="text/scss">
#device_warehousing{
    width: 100%;
    height: 100%;
    .el-form-item__content{
        display: flex;
        justify-content: flex-start;
    }
    .el-input{
        width: 230px;
    }
    .el-textarea__inner{
        width: 230px;
        min-height: 460px !important;
        font-size: 16px;
    }
    .el-textarea{
        width: 230px;
        min-height: 460px !important;
    }
}
</style>

