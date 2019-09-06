<template>
    <div id="user">
        <p>
            <span>用户名:</span>
            <i>{{username}}</i>
        </p>
        <p>
            <span>账号:</span>
            <i>{{account}}</i>
        </p>
        <div class='ps'>
            <span>密码:</span>
            <div>
                <el-input
                    size="mini"
                    v-model="password"
                    show-password
                ></el-input>
            </div>
            <i class="el-icon-edit" style='color:#409EFF' @click='revise'>修改</i>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
export default {
    data:()=>{
        return{
            username:sessionStorage.getItem('username'),
            account:sessionStorage.getItem('account'),
            password:sessionStorage.getItem('password'),
            visibel:true,
        }
    },
    methods:{
        revise(){
            let vm = this;
            vm.$axios({
                method:'post',
                url:window.$g_Api+'/api/customer/changepassword',
                data:{
                    user:vm.account,
                    pass:vm.password,
                }
            })
               .then(function(res){
                   if(res.data.errcode == 0){
                       vm.$message({
                           message: '修改密码成功',
                           type: 'success',
                       });
                       sessionStorage.setItem('password',vm.password);
                   }else {
                       vm.password = sessionStorage.getItem('password'),
                       vm.$message({
                           message: res.data.msg,
                           type: 'error',
                       });
                   }
               })
               .catch(function(err){
                   vm.$message({
                       message: err,
                       type: 'error',
                   });
               });
        },
    }
}
</script>

<style lang="scss" type="text/scss">
#user{
    padding: 20px;
    p,.ps{
        height: 48px;
        line-height: 48px;
        display: flex;
        justify-content: flex-start;
        span{
            display: block;
            width: 80px;
        }
        div{
            height: 48px;
            line-height: 48px;
            width: 200px;
            .el-input__inner{
                width: 175px;
            }
        }
    }
    .ps{
        i{
            line-height: 48px;
            &:hover{
                cursor:pointer;
            }
        }
    }
}
</style>

