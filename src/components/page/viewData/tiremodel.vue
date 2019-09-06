<template>
    <div id="tiremodel">
        <div class="control">
            <el-button type="primary" plain icon="el-icon-back" circle @click='back()'></el-button>
            <el-button type="primary" plain @click="dialogVisible = true">添加轮胎规格</el-button>
        </div>
        <el-table
            :data="modellist"
            style="width: 100%">
            <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
                prop="name"
                label="规格名称">
            </el-table-column>
            <el-table-column
                prop="model"
                label="规格">
            </el-table-column>
            <el-table-column
                prop="pattern"
                label="花纹">
            </el-table-column>
            <el-table-column
                prop="depth"
                label="花纹初始深度">
            </el-table-column>
            <el-table-column
                prop="mileage"
                label="预计里程(公里)">
            </el-table-column>
            <el-table-column
                prop="pressure"
                label="最大气压(kpa)">
            </el-table-column>
            <el-table-column
                prop="load"
                label="最大负荷(kg)">
            </el-table-column>
            <el-table-column
                min-width='100'
                label="操作">
                <template slot-scope="scope">
                    <el-button
                        plain
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button
                        plain
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="添加轮胎规格"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-form :model="modelkeys" label-position='left' :rules="rules" ref="modelkeys">
                <el-form-item label="规格名称" :label-width="formLabelWidth" prop='name'>
                    <el-input v-model="modelkeys.name" autocomplete="off" :style='iptStyle'></el-input>
                </el-form-item>
                <el-form-item label="轮胎规格" :label-width="formLabelWidth" prop='model'>
                    <el-input v-model="modelkeys.model" autocomplete="off" :style='iptStyle'></el-input>
                </el-form-item>
                <el-form-item label="花纹类型" :label-width="formLabelWidth" prop='pattern'>
                    <el-input v-model="modelkeys.pattern" autocomplete="off" :style='iptStyle'></el-input>
                </el-form-item>
                <el-form-item label="花纹深度(毫米)" :label-width="formLabelWidth" prop='depth'>
                    <el-input v-model.number="modelkeys.depth" autocomplete="off" :style='iptStyle'></el-input>
                </el-form-item>
                <el-form-item label='预计总里程(公里)' :label-width="formLabelWidth">
                    <el-input type="number" v-model.number="modelkeys.mileage" autocomplete="off" :style='iptStyle'></el-input>
                </el-form-item>
                <el-form-item label="最大气压(kpa)" :label-width="formLabelWidth">
                    <el-input type="number" v-model.number="modelkeys.pressure" autocomplete="off" :style='iptStyle'></el-input>
                </el-form-item>
                <el-form-item label="最大负荷(kg)" :label-width="formLabelWidth">
                    <el-input type="number" v-model.number="modelkeys.load" autocomplete="off" :style='iptStyle'></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="resetForm('modelkeys')">取 消</el-button>
            <el-button type="primary" @click="submitForm('modelkeys')">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog
            title="修改轮胎规格"
            :visible.sync="dialogVisible1"
            width="30%"
            :before-close="handleClose1">
            <el-form :model="rekeys" label-position='left' :rules="rules1" ref="rekeys">
                <el-form-item label="规格名称" :label-width="formLabelWidth" prop='name'>
                    <el-input v-model="rekeys.name" autocomplete="off" :style='iptStyle' disabled></el-input>
                </el-form-item>
                <el-form-item label="轮胎规格" :label-width="formLabelWidth" prop='model'>
                    <el-input v-model="rekeys.model" autocomplete="off" :style='iptStyle' disabled></el-input>
                </el-form-item>
                <el-form-item label="花纹类型" :label-width="formLabelWidth" prop='pattern'>
                    <el-input v-model="rekeys.pattern" autocomplete="off" :style='iptStyle'></el-input>
                </el-form-item>
                <el-form-item label="花纹深度(毫米)" :label-width="formLabelWidth" prop='depth'>
                    <el-input v-model.number="rekeys.depth" autocomplete="off" :style='iptStyle'></el-input>
                </el-form-item>
                <el-form-item label='预计总里程(公里)' :label-width="formLabelWidth">
                    <el-input type="number" v-model.number="rekeys.mileage" autocomplete="off" :style='iptStyle'></el-input>
                </el-form-item>
                <el-form-item label="最大气压(kpa)" :label-width="formLabelWidth">
                    <el-input type="number" v-model.number="rekeys.pressure" autocomplete="off" :style='iptStyle'></el-input>
                </el-form-item>
                <el-form-item label="最大负荷(kg)" :label-width="formLabelWidth">
                    <el-input type="number" v-model.number="rekeys.load" autocomplete="off" :style='iptStyle'></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm1('rekeys')">修 改</el-button>
        </span>
        </el-dialog>
        <div class="page">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-size="10"
                layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name:'tiremodel',
    data(){
        return{
            modellist:[],//规格列表数据
            dialogVisible: false,//新增弹框控制
            dialogVisible1: false,//新增弹框控制
            brandid:sessionStorage.getItem('brandid'),
            cid:sessionStorage.getItem('companyid'),
            modelkeys:{
                name:'',
                model:'',
                pattern:'',
                depth:'',
                mileage:'',
                pressure:'',
                load:''
            },
            rekeys:{
                name:'',
                model:'',
                pattern:'',
                depth:'',
                mileage:'',
                pressure:'',
                load:''
            },
            formLabelWidth:'130px',
            iptStyle:{
                width:'215px'
            },
            //验证规则
            rules:{
                name:[{required: true, message: '规格名称不能为空', trigger: 'blur'}],
                model:[{required: true, message: '轮胎规格不能为空', trigger: 'blur'}],
                pattern:[{required: true, message: '花纹类型不能为空', trigger: 'blur'}],
                depth:[
                    {required: true, message: '花纹深度不能为空', trigger: 'blur'},
                    { type: 'number', message: '花纹深度必须为数字值'}
                ],
                mileage:[{ type: 'number', message: '里程数必须为数字值'}],
                pressure:[{ type: 'number', message: '里程数必须为数字值'}],
                load:[{ type: 'number', message: '里程数必须为数字值'}],
            },
            rules1:{
                pattern:[{required: true, message: '花纹类型不能为空', trigger: 'blur'}],
                depth:[
                    {required: true, message: '花纹深度不能为空', trigger: 'blur'},
                    { type: 'number', message: '花纹深度必须为数字值'}
                ],
                mileage:[{ type: 'number', message: '里程数必须为数字值'}],
                pressure:[{ type: 'number', message: '里程数必须为数字值'}],
                load:[{ type: 'number', message: '里程数必须为数字值'}],
            },
            page:0,
            total:0
        }
    },
    created(){
        this.getmodellist();
    },
    methods:{
        //获取列表数据
        getmodellist(page=this.page){
            let vm= this;
            vm.$ajax('/api/tire/modellist',{brandid:vm.brandid,page})
                .then(res => {
                    if(res.errcode == 0){
                        vm.modellist =res.tiremodels;
                        vm.total = res.total;
                    }else {
                        vm.modellist = [];
                    }
                })
                .catch(function (err) {
                    vm.$message.error(err);
                })
        },
        //取消
        handleClose() {
            Object.keys(this.modelkeys).forEach(key=>{
                this.modelkeys[key] = '';
            })
            this.dialogVisible = false;
        },
        handleClose1() {
            Object.keys(this.rekeys).forEach(key=>{
                this.rekeys[key] = '';
            })
            this.dialogVisible1 = false;
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
            this.dialogVisible = false;
        },
        //提交数据
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = this.modelkeys;
                    data.cid = this.cid;
                    data.brandid = this.brandid;
                    this.$ajax('/api/tire/modeladd',data)
                        .then((res)=>{
                            if(res.errcode == 0){
                                this.$message.success('添加规格成功!');
                                this.$refs[formName].resetFields();
                                this.dialogVisible = false;
                                this.getmodellist();
                            }else {
                                this.$message.error(res.msg);
                            }
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        submitForm1(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = this.rekeys;
                    data.cid = this.cid;
                    data.brandid = this.brandid;
                    this.$ajax('/api/tire/modeledit',data)
                        .then((res)=>{
                            if(res.errcode == 0){
                                this.$message.success('修改规格成功!');
                                this.$refs[formName].resetFields();
                                this.dialogVisible1 = false;
                                this.getmodellist();
                            }else {
                                this.$message.error(res.msg);
                            }
                        })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //修改
        handleEdit(index,row){
            this.dialogVisible1 = true;
            this.rekeys = {...row}
        },
        //删除
        handleDelete(index,row){
            console.log(row);
            this.$confirm('此操作将删除该轮胎规格, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$ajax('/api/tire/modelremove',{
                    cid:sessionStorage.getItem('companyid'),
                    brandid:this.brandid,
                    model:row.model
                })
                    .then(res=>{
                        if(res.errcode == 0){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getmodellist();
                        }else {
                            this.$message({
                                type: 'error',
                                message: res.msg
                            });
                        }
                    })
                    .catch(err=>{
                        this.$message({
                            type: 'error',
                            message:err
                        });
                    })
            }).catch(() => {
                // this.$message({
                //     type: 'info',
                //     message: '已取消删除'
                // });
            });
        },
        //返回
        back(){
            this.$router.push('/tyres');
        },

        handleInput(e){
            this.val=e.target.value.replace(/[^\d]/g,'');
        },
        //翻页
        handleCurrentChange(val){
            this.getmodellist(val-1);
        }
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
#tiremodel{
    width: 100%;
    height: 100%;
    padding: 10px;
    position: relative;
    .control{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .page {
        width: 100%;
        text-align: center;
        margin: 10px auto;
        position:absolute;
        bottom: 0;
        left: 0;
    }
}
</style>

