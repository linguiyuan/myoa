<template>
    <div id='nowtimeOrders' class='my_wap'>

    </div>
</template>

<script>
    export default {
        name: 'datadtatistics',
        data() {
            return {

            }
        },
        mounted: function () {

        },
        computed: {},
        methods: {

        }
    }

</script>


<style lang='scss' scoped>
    #nowtimeOrders {

        table, thead, tbody, tr, th, td {
            border: 1px solid #dedede;
            white-space: nowrap;
        }
        .da_header {
            display: flex;
            justify-content: flex-start;
            height: 32px;
            line-height: 32px;
            margin-bottom: 20px;
            .shortcut {
                margin-left: 40px;
                span {
                    display: inline-block;
                    width: 50px;
                    color: #409eff;
                    &:hover {
                        cursor: pointer;
                    }
                }
                .activate {
                    color: #e6a23c;
                }
            }
        }
        .device {
            width: 100%;
            background-color: transparent;
            border: none;
            color: #606266;
            font-size: 12px;
        }
    }
</style>
