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

</script>

<template>
    <div id="topBar">
        <img id="icon" src="../src/assets/icon_back.png">
        <p id="topTitle">{{ data.nav }}</p>
    </div>
    <div v-show="data.nav === Route.Home">
        <input v-model="input"/>
        <button @click="getData">搜索</button>
        <div id="body">
            <div v-for="item in data.list" @click="itemClick(item)">
                {{ item.title }}
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

#topBar {
    width: 100%;
    display: flex;
    padding-bottom: 10px;
    padding-top: 10px;
    align-items: center;
    background-color: bisque;
}

#topTitle {
    text-align: center;
    flex: 1;
    margin-right: 30px;
}

#icon{
    margin-left: 10px;
    width: 20px;
    height: 20px;
}

#body {
    width: 100%;
    height: auto;
    border: pink solid 5px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 250px);
    grid-auto-rows: 300px;
    justify-content: center;
    align-content: center;
}
</style>
