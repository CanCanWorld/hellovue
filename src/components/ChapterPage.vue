<template>

  <!--    todo:添加详情卡片       -->
    <div id="body">
        <el-row>
            <el-col :span="4" v-for="item in chapters ">
                <el-card id="card"
                        :body-style="{ padding : '10px'}"
                        shadow="hover"
                        @click="chapterClick(item)">
                    <p id="title">{{ item.title }}</p>
                </el-card>
            </el-col>
        </el-row>
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
#body {
    width: 100%;
    height: auto;
}

.el-col {
    background-color: #be98aa;
}

#title {
    padding: 5px;
    margin: 0;
}

#card {
    margin: 10px;
    display: flex;
    /*水平居中*/
    justify-content: center;
    /*垂直居中*/
    align-items: center;
}
</style>