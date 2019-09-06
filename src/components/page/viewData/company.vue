<template>
    <div id="company">
        <div class="company_header">
            <el-button type="primary" size="mini" icon='el-icon-plus' style='margin-bottom: 10px;' @click='getAddbox'>添加公司</el-button>
        </div>
        <div>
            <el-table
                :height='tableHeight'
                v-loading='loading'
                :data='companyList'>
                <el-table-column
                    label="公司名"
                    prop="name">
                </el-table-column>
                <el-table-column
                    label="管理人员"
                    prop="manager">
                </el-table-column>
                <el-table-column
                    label="联系方式"
                    prop="phone">
                </el-table-column>
                <el-table-column
                    label="邮箱"
                    prop="email">
                </el-table-column>
                <el-table-column
                    label="状态"
                    prop="stat">
                    <template slot-scope="scope">
                        <span>{{scope.row.stat == 0 ?'正常':'异常'}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width='130'>
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="myForm_box" v-show='addBox'>
            <div class="myForm" v-loading='loading'>
                <div class="colse"><i class="el-icon-circle-close" @click='closeRidbox'></i></div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="公司名称:" prop="one.name" class='label'>
                        <el-input v-model="ruleForm.one.name" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item label="联系人:" prop="one.manager" class='label'>
                        <el-input v-model="ruleForm.one.manager" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item label="联系人电话:" prop="one.phone" class='label'>
                        <el-input v-model="ruleForm.one.phone" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item label="联系人邮箱:" prop="one.email" class='label'>
                        <el-input v-model="ruleForm.one.email" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item label="同时创建管理员">
                        <el-switch v-model="ruleForm.createManager" @change='wsChange'></el-switch>
                    </el-form-item>
                    <el-form-item label="管理员名称:" prop="two.name" class='label'>
                        <el-input v-model="ruleForm.two.name" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item label="管理员账号:" prop="two.user" class='label'>
                        <el-input v-model="ruleForm.two.user" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item label="管理员密码:" prop="two.pass" class='label'>
                        <el-input v-model="ruleForm.two.pass" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item label="管理员电话:" prop="two.phone" class='label'>
                        <el-input v-model="ruleForm.two.phone" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item label="管理员邮箱:" prop="two.email" class='label'>
                        <el-input v-model="ruleForm.two.email" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')"  @keyup.enter.native="submitForm('ruleForm')">确认添加</el-button>
                        <!--<el-button @click="resetForm('ruleForm2')">重置</el-button>-->
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="myForm_box1" v-show='modifybox'>
            <div class="myForm" v-loading='loading1'>
                <div class="colse"><i class="el-icon-circle-close" @click='closeRidbox1'></i></div>
                <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="公司名称:" prop="name" class='label'>
                        <el-input v-model="ruleForm1.name" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item label="联系人:" prop="manager" class='label'>
                        <el-input v-model="ruleForm1.manager" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item label="联系人电话:" prop="phone" class='label'>
                        <el-input v-model="ruleForm1.phone" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item label="联系人邮箱:" prop="email" class='label'>
                        <el-input v-model="ruleForm1.email" style='width: 203px'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm1('ruleForm1')" @keyup.enter.native="submitForm('ruleForm')">确认修改</el-button>
                        <!--<el-button @click="resetForm('ruleForm2')">重置</el-button>-->
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'tyrelist',
        data() {
            return {
                page: 0,
                total: 0,
                tableHeight: 0,
                loading: false,
                loading1: false,
                companyList:[],
                ruleForm:{
                    one:{
                        name:'',
                        email:'',
                        manager:'',
                        phone:'',
                    },
                    two:{
                        name:'',
                        user:'',
                        pass:'',
                        email:'',
                        phone:'',
                    },
                    createManager:true
                },
                ruleForm1:{
                    cid:'',
                    name:'',
                    email:'',
                    manager:'',
                    phone:'',
                },
                addBox:false,
                modifybox:false,
                rules:{
                    ['one.name']:[
                        {required: true, message: '请输入公司名称', trigger: 'blur' }
                    ],
                    ['one.email']:[
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                    ['two.name']:[
                        {required: true, message: '请输入客户中文名', trigger: 'blur' }
                    ],
                    ['two.user']:[
                        {required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    ['two.pass']:[
                        {required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                },
                rules1:{
                    name:[
                        {required: true, message: '请输入公司名称', trigger: 'blur' }
                    ],
                    email:[
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                },
                loading:false,
            }
        },
        props: ['myheight'],
        created() {
            this.tableHeight = this.$props.myheight-58;
        },
        mounted(){
            this.getCompanines();
        },
        methods:{
            getCompanines(){
                this.$ajax('/api/company/list')
                    .then(res=>{
                        if(res.errcode == 0){
                            this.companyList = res.companies
                        }else {
                            this.companyList = []
                        }
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            },
            //关闭添加框
            closeRidbox(){
                this.addBox = false;
                this.$refs['ruleForm'].resetFields();
            },
            closeRidbox1(){
                this.modifybox = false;
                this.$refs['ruleForm1'].resetFields();
            },
            //开关
            wsChange(val){
                if(val){
                    this.rules={
                        ['one.name']:[
                            {required: true, message: '请输入公司名称', trigger: 'blur' }
                        ],
                        ['one.email']:[
                            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                        ],
                        ['two.name']:[
                            {required: true, message: '请输入客户中文名', trigger: 'blur' }
                        ],
                        ['two.user']:[
                            {required: true, message: '请输入账号', trigger: 'blur' }
                        ],
                        ['two.pass']:[
                            {required: true, message: '请输入密码', trigger: 'blur' }
                        ],
                    }
                }else {
                    this.rules={
                        ['one.name']:[
                            {required: true, message: '请输入公司名称', trigger: 'blur' }
                        ],
                        ['one.email']:[
                            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                        ],
                    }
                }
            },
            //确认提交
            submitForm(formName){
                this.$refs[formName].validate(valid=>{
                    if(valid){
                        this.loading = true;
                        let data = {...this.ruleForm.one}
                        this.$ajax('/api/company/add',data)
                            .then(res=>{
                                this.loading = false;
                                if(res.errcode == 0){
                                    if(this.ruleForm.createManager){
                                        let customerdata = {...this.ruleForm.two};
                                        customerdata.cid = res.cid;
                                        customerdata.utype = 0;
                                        this.$ajax('/api/customer/add',customerdata)
                                            .then(res=>{
                                                if(res.errcode == 0){
                                                    this.$message.success('添加新公司并创建管理员成功!')
                                                    this.addBox = false;
                                                    this.getCompanines();
                                                }else {
                                                    this.$message.error(res.msg)
                                                }
                                            })
                                    }else {
                                        this.$message.success('添加新公司成功!')
                                        this.addBox = false;
                                        this.getCompanines();
                                    }
                                }else {
                                    this.$message.error(res.msg)
                                }
                            })
                    }else {
                        this.loading = false;
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //确认修改
            submitForm1(formName){
                this.$refs[formName].validate(valid=>{
                    if(valid){
                        this.loading1 = true;
                        this.$ajax('/api/company/modify',{...this.ruleForm1})
                            .then(res=>{
                                this.loading1 = false;
                                if(res.errcode == 0){
                                    this.$message.success('修改成功');
                                }else {
                                    this.$message.error(res.msg)
                                }
                                //关闭修改框
                                this.closeRidbox1();
                                //重新获取新的公司列表
                                this.getCompanines();
                            })
                    }else {
                        this.loading1 = false;
                        this.$message.error('修改失败,请重试')
                        return false
                    }
                })
            },
            //打开添加公司
            getAddbox(){
                this.$refs['ruleForm'].resetFields();
                this.addBox = true;
            },
            //打开修改公司
            getModifybox(){
                this.$refs['ruleForm1'].resetFields();
                this.modifybox = true;
            },
            //修改公司
            handleEdit(index,row){
                this.ruleForm1 = {...row}
                this.modifybox = true;
                // this.$ajax('/api/company/modify')
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
#company{
    width: 100%;
    height: 100%;
    padding: 10px;
    .myForm_box,.myForm_box1{
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color:rgba(0,0,0,0.1);
        border-radius: 10px;
        z-index: 999;
        .myForm{
            width: 420px;
            height: 610px;
            background-color: #fff;
            border-radius: 10px;
            padding: 15px 30px;
            margin: 0 auto;
            margin-top: 130px;
            .colse{
                margin-bottom: 10px;
                display: flex;
                flex-direction: row-reverse;
                justify-content: flex-start;
                i{
                    font-size: 24px;
                    color: #cccccc;
                    margin-top: -8px;
                    margin-right: -16px;
                    &:hover{
                        cursor: pointer;
                    }
                }
            }
            .el-form-item__label{
                text-align: left;
            }
            .label{
                .el-form-item__label{
                    width: 120px;
                    padding-left: 10px;
                }
            }
            .el-cascader,.el-cascader--small{
                width: 203px;
            }
            .el-select,.el-select--small{
                width: 203px;
            }
        }
        .ridBox{
            width: 420px;
            height: 140px;
            margin: 0 auto;
            margin-top: 120px;
            border-radius: 10px;
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-bottom: 20px;
            .close{
                width: 100%;
                height: 40px;
                display: flex;
                justify-content: space-between;
                padding: 8px;
                i{
                    float: right;
                    &:hover{
                        cursor: pointer;
                    }
                }
            }
            .bt_box{
                width: 100%;
                display: flex;
                justify-content: flex-start;
                flex-direction: row-reverse;
                padding-right: 20px;
            }
        }
    }
    .myForm_box1{
        .myForm{
            height: 320px;
        }
    }
}
</style>

