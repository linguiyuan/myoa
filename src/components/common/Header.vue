<template>
    <div class="header">
        <div class="logo"><img src="../../../static/img/201902282302112.png" alt="" class='h_img'>{{name}}{{$t('message.ms')}}</div>
        <div class="header-right">
            <div class="header-user-con">
                <el-select v-model="lang" @change='switchLanguage'>
                    <el-option
                        v-for="item in language"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided  command="usercenter">个人中心</el-dropdown-item>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: true,
                fullscreen: false,
                name: 'userName ',
                message: 2,
                name:sessionStorage.getItem('companyname'),
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
                lang:sessionStorage.getItem('lang') || 'cn',
            }
        },
        computed:{
            username(){
                let username = sessionStorage.getItem('username');
                return username ? username : this.name;
            }
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    this.$router.push('/login');
                }else if(command == 'usercenter'){
                    this.$router.push('/user');
                }
            },
            //语言切换
            switchLanguage(){
                sessionStorage.setItem('lang',this.lang)
                this.$i18n.locale=sessionStorage.getItem('lang');
            },
            // 侧边栏折叠
            // collapseChage(){
            //     this.collapse = !this.collapse;
            //     bus.$emit('collapse', this.collapse);
            // },
            // 全屏事件
            // handleFullScreen(){
            //     let element = document.documentElement;
            //     if (this.fullscreen) {
            //         if (document.exitFullscreen) {
            //             document.exitFullscreen();
            //         } else if (document.webkitCancelFullScreen) {
            //             document.webkitCancelFullScreen();
            //         } else if (document.mozCancelFullScreen) {
            //             document.mozCancelFullScreen();
            //         } else if (document.msExitFullscreen) {
            //             document.msExitFullscreen();
            //         }
            //     } else {
            //         if (element.requestFullscreen) {
            //             element.requestFullscreen();
            //         } else if (element.webkitRequestFullScreen) {
            //             element.webkitRequestFullScreen();
            //         } else if (element.mozRequestFullScreen) {
            //             element.mozRequestFullScreen();
            //         } else if (element.msRequestFullscreen) {
            //             // IE11
            //             element.msRequestFullscreen();
            //         }
            //     }
            //     this.fullscreen = !this.fullscreen;
            // }
        },
        mounted(){
            // if(document.body.clientWidth < 1500){
            //     this.collapseChage();
            // }
        }
    }
</script>
<style lang='scss'>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo{
        display: flex;
        justify-content: flex-start;
        float: left;
        width:auto;
        height: 70px;
        overflow-y: hidden;
        line-height: 70px;
        margin-left: 40px;
    }
    .h_img{
        height: 70px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
        .el-input{
            background-color: transparent;
            width: 120px;
            border: none;
            margin-right: 30px;
            color: #ffffff;
            .el-input__inner{
                width: 120px;
                border:none;
                background-color: transparent;
                color: #ffffff;
                font-size: 14px;
            }
        }
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
