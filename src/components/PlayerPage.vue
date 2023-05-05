<template>
    <div ref="videoRef"></div>
</template>

<script setup>
import DPlayer from 'dplayer'
import Hls from 'hls.js';
import {ref, reactive, onBeforeUnmount, watch} from 'vue'

const videoRef = ref()
const state = reactive({
    instance: null
})

const props = defineProps([
    "path"
])

watch(() => props.path, () => {
    console.log("onMounted: " + props.path)
    let player = {
        container: videoRef.value,
        autoplay: false,
        theme: '#0093ff',
        loop: true,
        lang: 'zh-cn',
        screenshot: false,
        hotkey: true,
        preload: 'auto',
        volume: 0.7,
        playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2],
        logo: 'http://jiuaibuni.top/wp-content/uploads/2020/12/logo.png',
        video: {
            url: props.path, //视频地址
            type: 'customHls',
            customType: {
                customHls: function (video) {
                    const hls = new Hls(); //实例化Hls  用于解析m3u8
                    hls.loadSource(video.src);
                    hls.attachMedia(video);
                }
            }
        },
        contextmenu: [],
        highlight: [],
        mutex: true,
    }
    console.log(player);
    state.instance = new DPlayer(player)
})
// 销毁
onBeforeUnmount(() => {
    state.instance?.destroy()
})
</script>

<style lang='scss' scoped>
</style>
