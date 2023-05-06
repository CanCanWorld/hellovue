<template>

  <!--    todo:添加详情卡片       -->
    <div id="chapterBody">
        <div v-for="item in chapters" @click="chapterClick(item)">
            <div id="chapterBox">
                {{ item.title }}
            </div>
        </div>
    </div>
</template>

<script>

import API from "../plugins/axiosInstance";
import Route from "../plugins/Route";

export default {
    props: ["vid"],
    emits: ["navChanged", "pathChanged"],
    data() {
        return {
            //章节列表
            chapters: [],
        }
    },
    watch: {
        vid() {
            console.log("vid改变: " + this.vid)
            this.loadChapter()
        }
    },
    methods: {
        //加载章节
        loadChapter() {
            API({
                url: "/videoChapter/search/" + this.vid,
                method: "get",
            }).then((res) => {
                console.log(res)
                if (res?.data?.data?.chapterList == null) {
                    console.log("空")
                    //todo:ui显示空提示
                    this.chapters = []
                } else {
                    this.chapters = res.data.data.chapterList
                }
                console.log("chapter:" + this.chapters);
            });
        },
        //章节点击
        chapterClick(item) {
            console.log(item.chapterPath)
            this.$emit("navChanged", Route.Play)
            this.$emit("pathChanged", item.chapterPath)
        }
    }
}

</script>

<style scoped>
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