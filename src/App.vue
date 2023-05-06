<script>

import Route from "./plugins/Route";
import HomePage from "./components/HomePage.vue";
import ChapterPage from "./components/ChapterPage.vue";
import PlayerPage from "./components/PlayerPage.vue";
import TopBarWidget from "./components/TopBarWidget.vue";
import API from "./plugins/axiosInstance";
import LoadTip from "./plugins/LoadTip";

export default {
    computed: {
        Route() {
            return Route
        }
    },
    components: {TopBarWidget, PlayerPage, ChapterPage, HomePage},
    data() {
        return {
            //当前导航
            nav: Route.Home,
            //选中视频id
            videoId: "",
            //选中章节path
            chapterPath: "",
            //视频列表
            videos: [],
            //当前页数
            page: 1,
            //输入框内容
            input: "",
            //加载提示
            loadTip: LoadTip.Blank
        }
    },
    watch: {
        videos() {
            if (this.videos.length === 0) {
                this.loadTip = LoadTip.Blank
            }
        }
    },
    methods: {
        //加载视频
        loadVideos(input) {
            this.input = input
            this.loadTip = LoadTip.Loading
            this.nav = Route.Home
            this.videos = []
            let url = "/video/search/title/" + this.input + "/" + this.page + "/30"
            console.log("url:" + url)
            API({
                url: url,
                method: "get",
            }).then((res) => {
                console.log("loadVideos result: " + res)
                if (res?.data?.data != null) {
                    this.videos = res.data.data
                } else {
                    this.loadTip = LoadTip.Error
                }
                window.scrollTo(0, 0);
            });
        },
        //跳转
        navChanged(target) {	
            this.nav = target
        },
        vidChanged(vid) {
            this.videoId = vid
        },
        pathChanged(path) {
            this.chapterPath = path
        },
        pageChanged(page) {
            this.page = page
            this.loadVideos(this.input)
        }
    }
}
</script>

<template>
    <div id="topBar">
        <TopBarWidget @loadVideos="loadVideos"/>
    </div>
    <div class="page" v-show="nav === Route.Home">
        <HomePage :page="page" :videos="videos" :loadTip="loadTip" @pageChanged="pageChanged" @navChanged="navChanged"
                  @vidChanged="vidChanged"/>
    </div>
    <div class="page">
        <div v-show="nav === Route.Play">
            <PlayerPage :path="chapterPath" :nav="nav"/>
        </div>
        <div v-show="nav !== Route.Home">
            <ChapterPage :vid="videoId" @navChanged="navChanged" @pathChanged="pathChanged"/>
        </div>
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

</style>
