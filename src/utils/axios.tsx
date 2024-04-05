import axios from "axios";

const app = axios.create({
    //  baseURL:'https://hrmsoftware.onrender.com/',
    baseURL:'http://localhost:5000',
    withCredentials:true,
})

export default app;
