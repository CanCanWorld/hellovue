<script setup>

import {reactive, ref} from "vue";
import API from "@/plugins/axiosInstance";
import MyPlayer from "./components/MyPlayer.vue";

const Route = {
    Home: "主页",
    Chapter: "章节",
    Play: "播放页",
};

const input = ref("")

const data = reactive({
    list: [],
    nav: Route.Home
})

const videoId = ref("")

function getData() {
    console.log(input.value);
    API({
        url: "/video/search/title/" + input.value + "/1/30",
        method: "get",
    }).then((res) => {
        data.list = res.data.data
        console.log(data.list);
    });
}

function itemClick(item) {
    console.log(item.videoId)
    videoId.value = item.videoId
    data.nav = Route.Chapter
}

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

</script>

<template>
    <div id="topBar">

        <img v-show="data.nav !== Route.Home" id="icon" src="../src/assets/icon_back.png" @click="onBackClick">
        <h2 id="topTitle">{{ data.nav }}</h2>
    </div>
    <div v-show="data.nav === Route.Home">
        <input v-model="input"/>
        <button @click="getData">搜索</button>
        <div id="body">
            <div v-for="item in data.list" @click="itemClick(item)">
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
    </div>
    <div v-show="data.nav === Route.Chapter">
        <p>Chapter</p>
    </div>
    <div v-show="data.nav === Route.Play">
        <MyPlayer :path="videoId"/>
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

#imgCover img{
    width: 100%;
    height: 100%;
}

#itemTitle{
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
    display: flex;
    height: 30px;
    align-items: center;
    position: relative;
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
    margin-left: 10px;
    height: 60%;
}

#body {
    background-color: aqua;
    height: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-auto-rows: 400px;
    justify-content: center;
    align-content: center;
}
</style>
