<template>
    <div id="setserver">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm"
                 style='width: 650px;margin: 20px 0 0 20px;' v-loading='loading'>
            <el-form-item label="服务器IP" prop="ip">
                <el-input v-model="ruleForm.ip"></el-input>
                <span style='padding-left: 8px;color: #999999;'>*服务器IP或域名，不包含"http://"</span>
            </el-form-item>
            <el-form-item label="端口号" prop="port">
                <el-input v-model.number="ruleForm.port"></el-input>
                <span style='padding-left: 8px;color: #999999;'></span>
            </el-form-item>
            <el-form-item label="更新全部">
                <el-switch v-model="ruleForm.createManager" @change='wsChange'></el-switch>
            </el-form-item>
            <el-form-item label="设备号" prop="rids">
                <el-input type="textarea" v-model="ruleForm.rids" @keyup.enter.native="listen" :disabled='myDisabled'></el-input>
                <span style='padding-left: 8px;color: #999999;'>每行一个设备号</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'divdistribution',
        data() {
            return {
                teamList: [],
                ruleForm: {
                    rids: '',
                    ip:'',
                    port:'',
                    createManager:false
                },
                rules: {
                    ip: [{required: true, message: '请输入服务器IP地址', trigger: 'blur'}],
                    port: [
                        {required: true, message: '请输入端口号', trigger: 'blur'},
                        {type: 'number', message: '端口号必须为数字', trigger: 'blur' }
                    ],
                    rids:[{ required: true, message: '请输入设备号', trigger: 'blur' }]
                },
                loading:false,
                myDisabled:false,
            }
        },
        mounted() {
        },
        methods: {
            //确认修改服务器ip
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('该操作将修改设备的服务器IP，是否确认修改？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.loading = true;
                            let data = {...this.ruleForm}
                            data.rids = data.rids.replace(/[\u4e00-\u9fa5\A-Za-z\`~!@#$%^&*()_\-+=<>?:"{}|.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’。、,，]/g,'').replace(/\n{2,}/g,'\n').replace(/\n$/g,'').replace(/\n/g,',')
                            this.$ajax('/api/receiver/setserver',data)
                                .then(res=>{
                                    this.loading = false;
                                    if(res.errcode == 0){
                                        this.$message.success('服务器IP修改成功')
                                    }else {
                                        this.$message.error(res.msg)
                                    }
                                })
                        }).catch(() => {
                            // this.$message({
                            //     type: 'info',
                            //     message: '已取消删除'
                            // });
                        });
                    } else {
                        this.loading = false;
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //监听键盘事件
            listen () {
                let str = this.ruleForm.rids;
                // this.ruleForm2.rids = str.replace(/[,，\\s+]/,',');
                this.ruleForm.rids = str.replace(/[\u4e00-\u9fa5\A-Za-z\`~!@#$%^&*()_\-+=<>?:"{}|.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’。、,，]/g,'').replace(/\n{2,}/g,'\n');
            },
            wsChange(val){
                this.ruleForm.createManager = val;
                this.myDisabled = val;
                if(val){
                    this.ruleForm.rids = ''
                }
            }
        }
    }
</script>

<style lang="scss" type="text/scss">
    #setserver {
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
            min-height: 360px !important;
            font-size: 16px;
        }
        .el-textarea{
            width: 230px;
            min-height: 360px !important;
        }
    }
</style>

