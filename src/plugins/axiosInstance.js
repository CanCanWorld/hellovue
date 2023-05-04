import axios from "axios";

const API = axios.create({
    baseURL: "https://api.pingcc.cn",
    timeout: 2000
})

export default API