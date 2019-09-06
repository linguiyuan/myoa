<template>
<div id="tyres">
    <div class="btn_add">
        <el-button type="primary" plain @click="dialogVisible = true">添加轮胎品牌</el-button>
    </div>
    <el-table
        :data="brandlist"
        style="width: 100%">
        <el-table-column
            type="index"
            width="50">
        </el-table-column>
        <el-table-column
            prop="id"
            label="id号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="品牌名称"
            width="180">
        </el-table-column>
        <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button
                    size="mini"
                    plain
                    @click="toModel(scope.row.id)">查看规格</el-button>
                <el-button
                    plain
                    type="info"
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
    <div class="page">
        <!--<div class="lrbtn">-->
        <!--<el-button size="mini" :disabled='page==0?true:false' @click='pageL()'>上一页</el-button>-->
        <!--<el-button size="mini" :disabled='end' @click='pageR()'>下一页</el-button>-->
        <!--</div>-->
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
    <el-dialog
        title="添加轮胎品牌"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-input style='width: 220px' placeholder='填写新的品牌名称' v-model='data.name'></el-input>
        <br>
        <span style='display: block;color:red;padding-left: 4px;height: 20px'>{{tip}}</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="submitData">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title="修改轮胎品牌"
        :visible.sync="dialogVisible2"
        width="30%"
        :before-close="handleClose2">
        <el-input style='width: 220px' placeholder='填写新的品牌名称' v-model='re.name'></el-input>
        <br>
        <span style='display: block;color:red;padding-left: 4px;height: 20px'>{{tip2}}</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose2">取 消</el-button>
            <el-button type="primary" @click="Edit">修 改</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script type="text/ecmascript-6">
export default {
    name:'tyres',
    data(){
        return{
            brandlist:[],//品牌列表数据
            dialogVisible: false,//新增弹框控制
            dialogVisible2: false,//新增弹框控制
            data:{
                cid:sessionStorage.getItem('companyid'),
                name:'',
            },
            re:{
                cid:sessionStorage.getItem('companyid'),
                name:'',
                brandid:''
            },
            tip:'',
            tip2:'',
            page:0,
            total:0,
        }
    },
    mounted(){
        this.getBrandlist();
    },
    methods:{
        //获取列表数据
        getBrandlist(page=this.page){
            this.$ajax('/api/tire/brandlist',{cid:sessionStorage.getItem('companyid'),page})
                .then(res => {
                    if(res.errcode == 0){
                        this.brandlist =res.tirebrands;
                        this.total = res.total;
                    }else {
                        this.brandlist = [];
                    }
                })
                .catch(function (err) {
                    this.$message.error(err);
                })
        },
        handleCurrentChange(val){
            this.getBrandlist(val-1)
        },
        //查看品牌下的所有规格
        toModel(brandid){
            sessionStorage.setItem('brandid',brandid)
            this.$router.push({
                name:'tiremodel',
                params:{
                    brandid
                }
            })
        },
        //打开修改
        handleEdit(index,row){
            this.dialogVisible2 = true;
            this.re.name= row.name;
            this.re.brandid = row.id
        },
        //修改
        Edit(){
            this.$ajax('/api/tire/brandedit',this.re)
                .then((res)=>{
                    if(res.errcode == 0){
                        this.dialogVisible2 = false;
                        this.$message.success('修改成功!');
                        this.getBrandlist()
                    }else {
                        this.tip2 = res.msg;
                    }
                })
                .catch(err=>{
                    this.tip2 = err;
                })
        },
        //删除
        handleDelete(index,row){
            this.$confirm('此操作将删除该品牌, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$ajax('/api/tire/brandremove',{cid:sessionStorage.getItem('companyid'),brandid:row.id})
                    .then(res=>{
                        if(res.errcode == 0){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getBrandlist();
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
        //新增
        addTyres(){},
        //关闭弹框确认
        handleClose() {
            this.data.name = '';
            this.dialogVisible = false;
            this.tip = '';
        },
        handleClose2() {
            this.data.name = '';
            this.dialogVisible2 = false;
            this.tip = '';
        },
        //确认添加
        submitData(){
            if(this.data.name){
                this.tip=''
                this.$ajax('/api/tire/brandadd',this.data)
                    .then((res)=>{
                        if(res.errcode == 0){
                            this.getBrandlist();
                            this.$message.success('添加成功');
                            this.data.name = '';
                            this.dialogVisible = false;
                        }else {
                            this.tip=res.msg;
                        }
                    })
            }else {
                this.tip='品牌名称不能为空';
            }
        }
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
#tyres{
    width: 100%;
    height: 100%;
    padding: 10px;
    position: relative;
    .btn_add{
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-start;
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

