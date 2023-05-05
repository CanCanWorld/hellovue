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
    height: 10%;
    align-items: center;
    position: absolute;
    background-color: bisque;
}

#topTitle {
    position: absolute;
    top: 50%;
    left: 50%;
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

</style>
