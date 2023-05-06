<template>
    <div id="body">
        <h3 v-show="videos.length === 0">{{ loadTip }}</h3>
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

import Route from "../plugins/Route";

export default {
    props: ["page", "videos", "loadTip"],
    emits: ["navChanged", "vidChanged", "pageChanged"],
    data() {
        return {}
    },

    methods: {
        //上一页
        pageUp() {
            this.$emit("pageChanged", this.page - 1)
        },
        //下一页
        pageDown() {
            this.$emit("pageChanged", this.page + 1)
        },
        //视频点击
        videoClick(item) {
            this.$emit("navChanged", Route.Chapter)
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

#pageup {
    margin: 10px;
}

#pageup:hover, #pagelater:hover {
    color: red;
    background-color: green;
}
</style>