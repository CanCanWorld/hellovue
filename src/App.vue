<script>

import Route from "./plugins/Route";
import HomePage from "./components/HomePage.vue";
import ChapterPage from "./components/ChapterPage.vue";
import PlayerPage from "./components/PlayerPage.vue";

export default {
    computed: {
        Route() {
            return Route
        }
    },
    components: {PlayerPage, ChapterPage, HomePage},
    data() {
        return {
            //当前导航
            nav: Route.Home,
            //选中视频id
            videoId: "",
            //选中章节path
            chapterPath: "",
        }
    },
    methods: {
        //返回
        onBackClick() {
            console.log("back")
            switch (this.nav) {
                case Route.Home:
                    break;
                case Route.Chapter:
                    this.nav = Route.Home
                    break;
                case Route.Play:
                    this.nav = Route.Chapter
                    break;
            }
        },
        //跳转
        navTo(target) {
            this.nav = target
        },
        vidChanged(vid) {
            this.videoId = vid
        },
        pathChanged(path) {
            this.chapterPath = path
        }
    }
}
</script>

<template>
  <!-- todo:提取topBar -->
    <div id="topBar">
        <img v-show="nav !== Route.Home" id="icon" src="../src/assets/icon_back.png" @click="onBackClick" alt="啥东西">
        <h2 id="topTitle">{{ nav }}</h2>
        <form id="sform" name="sform" method="get" >
            <input id="keyw" type="text"  class="sinp" placeholder="请输入要搜索的关键词" v-model="input" v-on:keydown.enter="loadVideos"/>
            <button type="submit" class="sbut" @click="loadVideos">搜索</button>
        </form>
        <div id="lll">
            <ul>
                <li id="PaiHang">
                    <img src="../src/assets/paihang.png">
                    <a href="">排行榜</a>
                </li>
                <li id="History">
                    <img src="../src/assets/history.png">
                    <a href="">历史记录</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="page" v-show="nav === Route.Home">
        <HomePage @navTo="navTo" @vidChanged="vidChanged"/>
    </div>
    <div class="page" v-show="nav === Route.Chapter">
        <ChapterPage :vid="videoId" @navTo="navTo" @pathChanged="pathChanged"/>
    </div>
    <div class="page" v-show="nav === Route.Play">
        <PlayerPage :path="chapterPath"/>
    </div>
</template>


<style scoped>

* {
    padding: 0;
    margin: 0;
}

.page {
    width: 100%;
    top: 10%;
    position: absolute;
}

#topBar {
    width: 100%;
    height: 8%;
    align-items: center;
    position: absolute;
    background-color: bisque;
}

#topTitle {
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(-50%, -50%);
    font-weight: bold;
}

#icon {
    position: absolute;
    top: 50%;
    transform: translate(0%, -50%);
    margin-left: 10px;
    height: 70%;
}
#search{
    position: absolute;
    left: 35%;
    top: 20%;
}
#BtSearch{
    margin: 5px;
    font-weight: 700;
}
#BtSearch:hover{
    background-color: #a7dfff;
}
.sbut {
    border-color: #99aa00dd;
    height: 30px;
    width: 92px;
    line-height: 30px;
    margin-top: 8px;
    cursor: pointer;
    font-size: 16px;
    background-color: #99aa00;
    color: #ffffff;
    border-radius: 10px;
    text-align: center;
}
.sbut:hover{
    background-color: #55AA00;
}
.sinp{
    border-color: #e0e0e0;
    margin: 8px;
    width: 300px;
    height: 28px;
    line-height: 28px;
    border-radius: 7px;
    background-color: #FFFFFF;
    border-width: 1px;
    border-style: solid;
    display: inline-block;
    vertical-align: top;
    text-indent: 5px;
    background-color: #fff;
}
#sform{
    position: absolute;
    left: 33%;
    top: 18%;
}
#lll{
    position: absolute;
    left: 61%;
    top: 18%;
}
#lll li{
    display: inline-block;
    margin: 5px;
}
img{
    margin-right: 10px;
    vertical-align: middle;
}
#lll a{
    text-align: center;
    text-decoration: none;
    height: 32px;
}
a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: underline;
}
</style>
