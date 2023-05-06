<template>
    <input id="keyw" type="text" class="sinp" placeholder="请输入要搜索的关键词" v-model="input"
           v-on:keydown.enter="loadVideos"/>
    <button class="sbut" @click="loadVideos">搜索</button>
    <div id="lll">
        <ul>
            <li id="PaiHang">
                <img src="../assets/paihang.png" alt="排行榜">
                <a href="">排行榜</a>
            </li>
            <li id="History">
                <img src="../assets/history.png" alt="历史记录">
                <a href="">历史记录</a>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: "TopBarWidget",
    props: [],
    emits: ["loadVideos"],
    data() {
        return {
            //输入框内容
            input: "",
        }
    },
    methods: {
        loadVideos(){
            this.$emit("loadVideos", this.input)
        }
    },
}
</script>

<style scoped>

.sbut {
    border-color: #99aa00dd;
    height: 30px;
    width: 92px;
    line-height: 30px;
    margin-top: 8px;
    cursor: pointer;
    font-size: 16px;
    background-color: #99aa00;
    color: #ffffff;
    border-radius: 10px;
    text-align: center;
}

.sbut:hover {
    background-color: #55AA00;
}

.sinp {
    border-color: #e0e0e0;
    margin: 8px;
    width: 300px;
    height: 28px;
    line-height: 28px;
    border-radius: 7px;
    border-width: 1px;
    border-style: solid;
    display: inline-block;
    vertical-align: top;
    text-indent: 5px;
    background-color: #fff;
}

#sform {
    position: absolute;
    left: 33%;
    top: 18%;
}

#lll {
    position: absolute;
    left: 61%;
    top: 18%;
}

#lll li {
    display: inline-block;
    margin: 5px;
}

img {
    margin-right: 10px;
    vertical-align: middle;
}

#lll a {
    text-align: center;
    text-decoration: none;
    height: 32px;
}

a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: underline;
}
</style>