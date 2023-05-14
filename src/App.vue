<script>

import Route from "./plugins/Route";
import HomePage from "./components/HomePage.vue";
import ChapterPage from "./components/ChapterPage.vue";
import PlayerPage from "./components/PlayerPage.vue";
import API from "./plugins/axiosInstance";
import LoadTip from "./plugins/LoadTip";
import {Search} from "@element-plus/icons-vue";

export default {
    computed: {
        Search() {
            return Search
        },
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
            //视频列表
            videos: [],
            //当前页数
            page: 1,
            //输入框内容
            input: "",
            //加载提示
            loadTip: LoadTip.Blank,
            showBottom: false,
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
        loadVideos() {
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
                    this.showBottom = true
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

    <el-affix>
        <div id="header">
            <el-input
                    placeholder="请输入关键字"
                    v-model="input"
                    v-on:keydown.enter="loadVideos()">
                <template #prepend>
                    <el-button :icon="Search"/>
                </template>
                <template #append>
                    <el-button @click="loadVideos()">
                        搜索
                    </el-button>
                </template>
            </el-input>
        </div>
    </el-affix>
    <div class="page" v-show="nav === Route.Home">
        <HomePage
                :page="page"
                :videos="videos"
                :loadTip="loadTip"
                :showBottom="showBottom"
                @pageChanged="pageChanged"
                @navChanged="navChanged"
                @vidChanged="vidChanged"/>
    </div>
    <div class="page">
        <div v-show="nav === Route.Play">
            <PlayerPage
                    :path="chapterPath"
                    :nav="nav"/>
        </div>
        <div v-show="nav !== Route.Home">
            <ChapterPage
                    :vid="videoId"
                    @navChanged="navChanged"
                    @pathChanged="pathChanged"/>
        </div>
    </div>
</template>


<style scoped>

body {
    padding: 0;
    margin: 0;
}

.page {
    width: 100%;
}

#header {
    height: 52px;
    padding: 0 10%;
    background-color: #3e3f4c;
    /*flex布局*/
    display: flex;
    /*水平居中*/
    justify-content: center;
    /*垂直居中*/
    align-items: center;
}

</style>
