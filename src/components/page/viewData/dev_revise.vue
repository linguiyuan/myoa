<template>
    <div id="dev_revise">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm"
                 style='width: 650px;margin: 20px 0 0 20px;' v-loading='loading'>
            <el-form-item label="设备类型更改" prop="type">
                <el-select v-model="ruleForm.type" placeholder="更改类型">
                    <el-option v-for='item in options' :label="item.label" :value="item.value"
                               :key='item.value'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设备号" prop="rids">
                <el-input type="textarea" v-model="ruleForm.rids" @keyup.enter.native="listen"></el-input>
                <span style='padding-left: 8px;color: #999999;'>每行一个设备号</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确认更改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'devrevise',
        data() {
            return {
                options:[
                    {label:'小车',value:1},
                    {label:'大车',value:2},
                    {label:'挂车',value:3},
                    {label:'车头',value:4},
                    {label:'整车',value:5},
                ],
                ruleForm: {type: '', rids: ''},
                rules: {
                    type: [{required: true, message: '请选择更改类别', trigger: 'change'}],
                    rids:[{ required: true, message: '请输入设备号', trigger: 'blur' }]
                },
                loading:false,
            }
        },
        mounted() {
            this.getTeamlist1()
        },
        methods: {
            //批量创建接收器
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        let data = {...this.ruleForm}
                        data.rids = data.rids.replace(/[\u4e00-\u9fa5\A-Za-z\`~!@#$%^&*()_\-+=<>?:"{}|.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’。、,，]/g,'').replace(/\n{2,}/g,'\n').replace(/\n$/g,'').replace(/\n/g,',')
                        this.$ajax('/api/receiver/changetype',data)
                            .then(res=>{
                                this.loading = false;
                                if(res.errcode == 0){
                                    this.$message.success('设备类型更改成功')
                                }else {
                                    this.$message.error(res.msg)
                                }
                            })
                    } else {
                        this.loading = false;
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //获取车队列表
            getTeamlist1() {
                this.$ajax('/api/team/list', {
                    cid: sessionStorage.getItem('companyid'),
                    tid: sessionStorage.getItem('teamid')
                })
                    .then(res => {
                        if (res.errcode == 0) {
                            let teams = res.teams;
                            let arr = []
                            for (let i = 0, len = teams.length; i < len; i++) {
                                arr.push({
                                    label: teams[i].name,
                                    value: teams[i].cid,
                                })
                            }
                            this.teamList = arr;
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                    .catch(error => {
                        this.$message.error(error)
                    })
            },
            //监听键盘事件
            listen() {
                let str = this.ruleForm.rids;
                // this.ruleForm2.rids = str.replace(/[,，\\s+]/,',');
                this.ruleForm.rids = str.replace(/[\u4e00-\u9fa5\A-Za-z\`~!@#$%^&*()_\-+=<>?:"{}|.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’。、,，]/g,'').replace(/\n{2,}/g,'\n');
            },
        }
    }
</script>

<style lang="scss" type="text/scss">
    #dev_revise {
        width: 100%;
        height: 100%;
        padding: 15px;
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

