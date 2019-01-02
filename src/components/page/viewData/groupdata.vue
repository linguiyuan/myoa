<template>
    <div id="groupdata" class='my_wap'>
        <p class="position"><i class="el-icon-location-outline"></i>您现在的位置：数据统计 > 分组数据</p>
        <template>
            <el-radio-group v-model="type" @change='typechange'>
                <el-radio :label="1">订单数据</el-radio>
                <el-radio :label="2">绩效分数</el-radio>
                <el-radio :label="3">设备信息</el-radio>
            </el-radio-group>
        </template>

    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name:'groupdata',
    data: function () {
        return {
            type:1,
        }
    },
    methods:{
        typechange: function () {

        },
    }
}
</script>

<style lang="scss" type="text/scss" scoped>

</style>

