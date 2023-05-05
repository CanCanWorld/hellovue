<script setup>

import {reactive, ref} from "vue";
import API from "@/plugins/axiosInstance";
import MyPlayer from "./components/MyPlayer.vue";
//导航标题
const Route = {
    Home: "主页",
    Chapter: "章节",
    Play: "播放页",
};
//绑定的数据集
const data = reactive({
    //视频列表
    videos: [],
    //章节列表
    chapters: [],
    //当前导航
    nav: Route.Home,
    //当前页数
    page: 1
})
//输入框内容
const input = ref("")
//选中视频id
const videoId = ref("")
//选中章节id
const chapterPath = ref("")

// methods
//加载视频
function loadVideos() {
    console.log("input: " + input.value);
    console.log("page: " + data.page);
    API({
        url: "/video/search/title/" + input.value + "/" + data.page + "/30",
        method: "get",
    }).then((res) => {
        console.log("loadVideos result: " + res)
        if (res.data.data === null) {
            data.videos = []
        }else {
            data.videos = res.data.data
        }
        console.log(data.videos);
    });
}

//加载章节
function loadChapter() {
    API({
        url: "/videoChapter/search/" + videoId.value,
        method: "get",
    }).then((res) => {
        console.log(res)
        if (res.data.data.chapterList === null) {
            data.chapters = []
        }else {
            data.chapters = res.data.data.chapterList
        }
        console.log("chapter:" + data.chapters);
    });
}

//视频点击
function videoClick(item) {
    console.log(item.videoId)
    videoId.value = item.videoId
    data.nav = Route.Chapter
    loadChapter()
}

//章节点击
function chapterClick(item) {
    console.log(item.chapterPath)
    chapterPath.value = item.chapterPath
    data.nav = Route.Play
}

//返回
function onBackClick() {
    console.log("back")
    switch (data.nav) {
        case Route.Home:
            break;
        case Route.Chapter:
            data.nav = Route.Home
            break;
        case Route.Play:
            data.nav = Route.Chapter
            break;
    }
}

//上一页
function pageUp() {
    data.page--
    loadVideos()
    window.scrollTo(0, 0);
}

//下一页
function pageDown() {
    data.page++
    window.scrollTo(0, 0);
    loadVideos()
}

</script>

<template>
    <div id="topBar">
        <img v-show="data.nav !== Route.Home" id="icon" src="../src/assets/icon_back.png" @click="onBackClick">
        <h2 id="topTitle">{{ data.nav }}</h2>
    </div>
    <div class="home" v-show="data.nav === Route.Home">
        <input v-model="input"  v-on:keydown.enter="loadVideos"/>
        <button @click="loadVideos">搜索</button>
        <div id="body">
            <h3 v-show="data.videos.length === 0">没有数据</h3>
            <div v-for="item in data.videos" @click="videoClick(item)">
                <div id="itemBox">
                    <div id="imgCover" v-bind:style="item.cover">
                        <img :src="item.cover">
                    </div>
                    <div id="itemTitle">
                        <h3 id="title">{{ item.title }}</h3>
                    </div>
                </div>
            </div>
        </div>
        <div id="pageBox">
            <h3 v-show="data.page !== 1" @click="pageUp">上一页</h3>
            <h3 @click="pageDown">下一页</h3>
        </div>
    </div>
    <div class="home" v-show="data.nav === Route.Chapter">
        <div id="chapterBody">
            <div v-for="item in data.chapters" @click="chapterClick(item)">
                <div id="chapterBox">
                    {{ item.title }}
                </div>
            </div>
        </div>
    </div>
    <div class="home" v-show="data.nav === Route.Play">
        <MyPlayer :path="chapterPath"/>
    </div>
</template>

<style scoped>
ul {
    display: inline;
}

* {
    padding: 0;
    margin: 0;
}

.home {
    width: 100%;
    top: 10%;
    position: absolute;
}

#itemBox {
    background-color: #a7dfff;
    height: 100%;
    padding: 20px;
}

#imgCover {
    width: 100%;
    height: 80%;
    background-color: bisque;
}

#imgCover img {
    width: 100%;
    height: 100%;
}

#itemTitle {
    height: 20%;
    position: relative;
}

#title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
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

#pageBox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-items: center;
}

#body {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-auto-rows: 400px;
    justify-content: center;
    align-content: center;
}

#chapterBody {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    grid-auto-rows: 50px;
    justify-content: center;
    align-content: center;
    align-items: center;
    justify-items: center;
}

#chapterBox {
    background-color: #a7dfff;
    height: 40%;
    padding: 10px 20px 10px 20px;
}
</style>
