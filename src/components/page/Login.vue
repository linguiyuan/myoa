<template>
    <div class="login-wrap">
        <div class="bgc_img"></div>
        <div class="login_wrap_w">
            <div class="log_logo">LOGO</div>
            <div class="ms-title">智能轮胎管理系统</div>
            <div class='ms-login' v-loading="loading">
                <el-form :model="ruleForm" :rules="{
                    username: [
                        { required: true, message: $t('message.loginPage.inputTip1')}
                    ],
                    password: [
                        { required: true, message: $t('message.loginPage.inputTip2')}
                    ]
                }" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" :placeholder="$t('message.loginPage.userName')"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :placeholder="$t('message.loginPage.passWord')" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm('ruleForm')">{{$t('message.loginPage.login')}}</el-button>
                    </div>
                    <!--<div class="lg_tip">-->
                        <!--<p><span>中文</span>&nbsp;|&nbsp;<span>English</span></p>-->
                    <!--</div>-->
                    <div class="language_box">
                        <el-select v-model="value" placeholder="请选择" @change='switchLanguage'>
                            <el-option
                                v-for="item in language"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data: function(){
            return {
                value: this.$i18n.locale,
                language: [
                    {
                        value: "cn",
                        label: "中文简体"
                    },
                    {
                        value: "en",
                        label: "English"
                    },
                ],
                loading:false,
                ruleForm: {
                    username: '',
                    password: ''
                },
                // rules: {
                //     username: [
                //         { required: true, message: '', trigger: 'blur' }
                //     ],
                //     password: [
                //         { required: true, message: '', trigger: 'blur' }
                //     ]
                // },
            }
        },
        methods: {
            // 登录
            switchLanguage(lang){
                let vm = this;
                switch (lang){
                    case 'cn':vm.$i18n.locale = 'cn';
                        break;
                    case 'en':vm.$i18n.locale = 'en';
                        break;
                    default : vm.$i18n.locale = 'cn';
                }
                // this.$cookie.set(
                //     "DefaultLanguage",
                //     (vm.value),        //
                //     {                     //
                //         expires: "30m"        //默认cookie有效时间为30分钟
                //     }
                // );
            },
            submitForm(formName) {
                let vm = this;
                vm.$refs[formName].validate((valid) => {
                    if (valid) {
                        vm.loading = true;
                        sessionStorage.setItem('token','123456');
                        vm.$router.push('/');
                        // vm.$axios({
                        //     method:'post',
                        //     url:window.$g_Api+'/oa/login',
                        //     data:vm.ruleForm
                        // })
                        //    .then(function(res){
                        //        vm.loading  = false;
                        //        if(res.data.code == 0){
                        //            //更改store中token,role,auth
                        //            sessionStorage.setItem('token',res.data.data.token);
                        //            sessionStorage.setItem('role',res.data.data.role);
                        //            sessionStorage.setItem('uid',res.data.data.uid);
                        //            sessionStorage.setItem('auth',JSON.stringify(res.data.data.auth));
                        //            sessionStorage.setItem('username',vm.ruleForm.username);
                        //            vm.$router.push('/');
                        //        }else {
                        //            vm.$message.error(res.data.message)
                        //        }
                        //    })
                        //    .catch(function(err){});
                    } else {
                        console.log('error submit!!');
                        return false;
                    }

                });
            },
        }
    }
</script>

<style lang='scss'>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        text-align: center;
        padding-top: 40px;
        .login_wrap_w{
            position: relative;
            width:400px;
            z-index: 888;
            margin: 0 auto;
            padding:30px 40px;
            border-radius: 5px;
            background-color: rgba(255,255,255,0.4);
        }
        .bgc_img{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background:url("/static/img/400730822.jpg") no-repeat center center;
            background-size:cover;
            opacity: 0.9;
        }
        .log_logo{
            width: 100%;
            text-align: center;
            font-size: 44px;
            color: #666666;
        }
        .ms-title{
            text-align: center;
            font-size:22px;
            color: #999999;
        }
        .ms-login{
            width:300px;
            padding:30px 40px;
            border-radius: 5px;
            margin: 0 auto;
        }
        .ti{
            width: 100%;
            text-align: center;
            margin-bottom: 20px;
        }
        .login-btn{
            text-align: center;
        }
        .login-btn button{
            width:100%;
            height:36px;
            font-size: 16px;
        }
        .language_box{
            text-align: left;
            padding-left: 0px;
            .el-input__inner{
                width: 100px;
                border:none;
                background-color: transparent;
                color: #409eff;
                padding-left: 0px !important;
            }
            .el-input__suffix{
                i{
                    color: #409eff !important;
                }
            }
        }
        .lg_tip{
            font-size: 12px;
            color: #409eff;
            text-align: left;
            margin-top: 8px;
            span{
                &:hover{
                    cursor: pointer;
                }
            }
        }
    }

</style>
