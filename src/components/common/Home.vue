<template>
    <div class="wrapper">
        <v-head></v-head>
        <div class="mainContent">
            <v-sidebar></v-sidebar>
            <!--<div class="content-box" :class="{'content-collapse':collapse}">-->
            <div id="content-box" ref='contentBox' style="height: 600px">
                <!--<v-tags></v-tags>-->
                <div class="content">
                    <transition name="move" mode="out-in">
                        <keep-alive :include="tagsList">
                            <router-view :myHeight='myh' v-bind:myheight='myh'></router-view>
                        </keep-alive>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from './bus';
    export default {
        data(){
            return {
                tagsList: ['device'],
                collapse: false,
                winHeight:600,
                myh:100,
            }
        },
        components:{
            vHead, vSidebar, vTags
        },
        created(){
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        },
        created(){
            window.addEventListener('resize', this.getHeight);
            this.getHeight()
        },
        destroyed(){
            window.removeEventListener('resize', this.getHeight)
        },
        mounted(){
            this.setHeight()
        },
        methods:{
            getHeight(){
                let winHeight;
                if (window.innerWidth)
                    winHeight = window.innerHeight;
                else if ((document.body) && (document.body.clientHeight)) {
                    winHeight = document.body.clientHeight;
                };
                this.winHeight = winHeight;
                this.myh = this.winHeight-70-40;
            },
            setHeight(){
                this.$refs.contentBox.style.height = (this.winHeight - 70) + 'px';
            }
        }
    }
</script>
