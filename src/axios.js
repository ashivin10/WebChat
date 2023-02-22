import axios from 'axios'

const instance = axios.create({
    url : "http://localhost:9000",  
})

export default instance