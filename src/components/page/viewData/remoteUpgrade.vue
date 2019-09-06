<template>
    <div id="remoteUpgrade">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm"
                 style='width: 650px;margin: 20px 0 0 20px;' v-loading='loading'>
            <el-form-item label="软件地址" prop="url">
                <el-input v-model="ruleForm.url"></el-input>
                <span style='padding-left: 8px;color: #999999;'>*升级文件包的地址，包括http://"</span>
            </el-form-item>
            <el-form-item label="制造商" prop="productor">
                <el-input v-model="ruleForm.productor"></el-input>
                <span style='padding-left: 8px;color: #999999;'>*如：SZRXT</span>
            </el-form-item>
            <el-form-item label="固件版本" prop="firmwarever">
                <el-input v-model="ruleForm.firmwarever"></el-input>
                <span style='padding-left: 8px;color: #999999;'>*如：RXTmt2503aV1.0</span>
            </el-form-item>
            <el-form-item label="软件版本" prop="softwarever">
                <el-input v-model="ruleForm.softwarever"></el-input>
                <span style='padding-left: 8px;color: #999999;'>如：308V1.0</span>
            </el-form-item>
            <!--<el-form-item label="更新全部">-->
                <!--<el-switch v-model="ruleForm.createManager" @change='wsChange'></el-switch>-->
            <!--</el-form-item>-->
            <el-form-item label="设备号" prop="rids">
                <el-input type="textarea" v-model="ruleForm.rids" @keyup.enter.native="listen" :disabled='myDisabled'></el-input>
                <span style='padding-left: 8px;color: #999999;'>每行一个设备号</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">升级</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'remoteUpgrade',
        data() {
            return {
                teamList: [],
                ruleForm: {
                    rids: '',
                    url:'',
                    productor:'',
                    firmwarever:'',
                    softwarever:'',
                },
                rules: {
                    rids: [{required: true, message: '请输入设备号', trigger: 'blur'}],
                    url: [{required: true, message: '请输入地址', trigger: 'blur'}],
                    productor: [{required: true, message: '请输入制造商', trigger: 'blur'}],
                    firmwarever:[{ required: true, message: '请输入固件版本', trigger: 'blur' }],
                    softwarever:[{ required: true, message: '请输入软件版本', trigger: 'blur' }],
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
                        this.$confirm('此操作将远程升级这些设备，是否确定？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.loading = true;
                            let data = {...this.ruleForm}
                            data.rids = data.rids.replace(/[\u4e00-\u9fa5\A-Za-z\`~!@#$%^&*()_\-+=<>?:"{}|.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’。、,，]/g,'').replace(/\n{2,}/g,'\n').replace(/\n$/g,'').replace(/\n/g,',')
                            this.$ajax('/api/receiver/remoteupdate',data)
                                .then(res=>{
                                    this.loading = false;
                                    if(res.errcode == 0){
                                        this.$message.success('升级成功')
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
            }
        }
    }
</script>

<style lang="scss" type="text/scss">
    #remoteUpgrade {
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

