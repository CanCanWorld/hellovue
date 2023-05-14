<template>
    <div id="body">
        <h3 v-show="videos.length === 0">{{ loadTip }}</h3>
        <el-row>
            <el-col :span="6" v-for="item in videos">
                <el-card
                        :body-style="{ padding : '10px', backgroundColor:'#3e3f4c'}"
                        shadow="hover"
                        @click="videoClick(item)">
                    <el-image style="width: 100% ;height: 100% "
                              :src="item.cover"
                              :fit="'cover'"/>
                    <p id="title">{{ item.title }}</p>
                </el-card>
            </el-col>
        </el-row>
    </div>
    <div id="bottom" v-if="showBottom">
        <el-affix position="bottom" :offset="20">
            <el-button-group>
                <el-button type="primary" round v-if="page !== 1" @click="pageUp()">上一页</el-button>
                <el-button type="primary" round @click="pageDown()">下一页</el-button>
            </el-button-group>
        </el-affix>
    </div>
</template>

<script>

import Route from "../plugins/Route";

export default {
    props: ["page", "videos", "loadTip","showBottom"],
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

#body {
    width: 100%;
    height: auto;
}

#bottom {
    background-color: #3e3f4c;
    /*flex布局*/
    display: flex;
    /*水平居中*/
    justify-content: center;
    /*垂直居中*/
    align-items: center;
}

#title {
    padding: 5px;
    margin: 0;
    color: white;
}

.el-col {
    background-color: #be98aa;
}

.el-card {
    margin: 15px;
}
</style>