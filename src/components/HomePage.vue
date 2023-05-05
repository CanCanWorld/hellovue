<template>
    <div id="search">
        <input v-model="input" v-on:keydown.enter="loadVideos"/>
        <button @click="loadVideos" id="BtSearch">搜索</button>
    </div>
    <div id="body">
        <h3 v-show="videos.length === 0">没有数据</h3>
        <div v-for="item in videos" @click="videoClick(item)">
            <div id="itemBox">
                <div id="imgCover" v-bind:style="item.cover">
                    <img :src="item.cover" alt="这是啥">
                </div>
                <div id="itemTitle">
                    <h3 id="title">{{ item.title }}</h3>
                </div>
            </div>
        </div>
    </div>
    <div id="pageBox">
        <button v-show="page !== 1" @click="pageUp" id="pageup">上一页</button>
        <button @click="pageDown" id="pagelater">下一页</button>
    </div>
</template>

<script>

import API from "../plugins/axiosInstance";
import Route from "../plugins/Route";

export default {
    props: [],
    emits: ["navTo", "vidChanged"],
    data() {
        return {
            //当前页数
            page: 0,
            //视频列表
            videos: [],
            //输入框内容
            input: "",
        }
    },
    methods: {
        //上一页
        pageUp() {
            this.page--
            window.scrollTo(0, 0);
            this.loadVideos()
        },
        //下一页
        pageDown() {
            this.page++
            window.scrollTo(0, 0);
        },
        //加载视频
        loadVideos() {
            API({
                url: "/video/search/title/" + this.input + "/" + this.page + "/30",
                method: "get",
            }).then((res) => {
                console.log("loadVideos result: " + res)
                if (res?.data?.data == null) {
                    this.videos = []
                } else {
                    this.videos = res.data.data
                }
                console.log(this.videos);
            });
        },
        //视频点击
        videoClick(item) {
            this.$emit("navTo", Route.Chapter)
            this.$emit("vidChanged", item.videoId)
        }
    }
}
</script>

<style scoped>

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
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
}

#pageBox {
    width: 100%;
    /* display: flex; */
    align-items: center;
    justify-items: center;
    text-align: center;
    margin-top: 10px;
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
#pageup{
    margin: 10px;
}
#pageup:hover,#pagelater:hover{
    color: red;
    background-color: green;
}
#search{
    float: right;
}
#BtSearch{
    margin: 5px;
    font-weight: 700;
}
#BtSearch:hover{
    background-color: #a7dfff;
}
</style>