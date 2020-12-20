import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://functional-shop-default-rtdb.firebaseio.com/'
})

export default instance