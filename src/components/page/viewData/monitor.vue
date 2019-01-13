<template>
    <div id='monitor' :class="['my_wap', 'monitor',{'monitor1':fullscreen}]">
            <!--<baidu-map center="北京" class="mymap" ak="YOUR_APP_KEY"></baidu-map>-->
        <div class="mo_map">
            <baidu-map
                class="map"
                :center="center"
                :zoom="zoom"
                :scroll-wheel-zoom="true"
                @ready="handler">
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
                <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_STAR"  :icon="{url:'http://lbsyun.baidu.com/jsdemo/img/fox.gif'}" color="red" size="BMAP_POINT_SIZE_SMALL" @click="clickHandler"></bm-point-collection>
                <my-overlay
                    :position="{lng: 116.404, lat: 39.915}"
                    text="点击我"
                    :active="active"
                    @mouseover.native="active = true"
                    @mouseleave.native="active = false">
                </my-overlay>
            </baidu-map>
        </div>
        <div class="mo_search_box">
            <span class="extend" @click='changeExtend'><i :class="extend?'el-icon-arrow-right':'el-icon-arrow-left'"></i></span>
            <el-input
                placeholder="车牌号/lmel"
                suffix-icon="el-icon-search"
                v-model="input"
                :class='["mo_searchinput",{"mo_searchinput1":extend}]'
                >
            </el-input>
            <i class="el-icon-rank fullscreen" @click="handleFullScreen"></i>
        </div>
    </div>
</template>

<script>
    import MyOverlay from '../../../components/page/viewData/myoverlay'
    export default {
        name: 'monitor',
        data() {
            return {
                center: {lng: 0, lat: 0},
                zoom: 7,
                input:'',
                extend:false,
                fullscreen: false,
                points: [],
                active: false
            }
        },
        components: {
            MyOverlay
        },
        mounted: function () {
            this.addPoints();
            // this.draw();
        },
        computed: {},
        methods: {
            handler : function ({BMap, map}) {
                this.center = {lng: 116.404, lat: 39.915}
                this.zoom = 7
            },
            clickHandler (e) {
                alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
            },
            draw ({el, BMap, map}) {
                const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915))
                el.style.left = pixel.x - 60 + 'px'
                el.style.top = pixel.y - 20 + 'px'
            },
            addPoints () {
                const points = [];
                for (var i = 0; i < 1000; i++) {
                    const position = {lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21}
                    points.push(position)
                }
                this.points = points
            },
            //折叠
            changeExtend: function () {
                this.extend = this.extend?false:true;
            },
            //全屏
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        }
    }

</script>


<style lang='scss'>
    .monitor {
        position: relative;
        .mo_map{
            width: 100%;
            height: 800px;
            overflow-y: auto;
            .map {
                width: 100%;
                height: 100%;
            }
        }
        .mo_search_box{
            height: 32px;
            line-height: 32px;
            position: absolute;
            top: 8px;
            left: 8px;
            display: flex;
            justify-content: flex-start;
            .mo_searchinput{
                width: 204px;
                transition: all 0.3s;
                overflow: hidden;
                .el-input__inner{
                    border-radius: 0px 4px 4px 0px;
                    outline:none;
                }
            }
            .mo_searchinput1{
                width: 0px;
            }
            .extend{
                display: block;
                height: 100%;
                width: 16px;
                background-color: #cccccc;
                border-radius: 4px 0px 0px 4px;
                i{
                    color: #ffffff;
                }
                &:hover{
                    cursor: pointer;
                }
            }
            .fullscreen{
                transform: rotate(45deg);
                font-size: 32px;
                color: #409EFF;
                margin-left: 20px;
                &:hover{
                    cursor: pointer;
                }
            }
        }
    }
    .monitor1{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        .mo_map{
            height: 100%;
        }
    }
</style>
