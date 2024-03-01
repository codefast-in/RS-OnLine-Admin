import axios from "axios";

const app = axios.create({
    baseURL:'https://hrmsoftware.onrender.com/',
    withCredentials:true,
})

export default app;