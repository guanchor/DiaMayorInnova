import axios from "axios";

export default axios.create({
    baseURL:"http://localhost:3000", //Rails url
    headers: {
        "Content-Type":"application/json"
    }
});