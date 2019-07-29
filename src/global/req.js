import router from '@/router/index'
import Vue from "vue";
import axios from "axios";
Vue.prototype.$axios = axios;

// --------------- //
const localhost = "http://120.78.76.139:8800"; //调试地址/
// const localhost = "http://127.0.0.1:8800"; //调试地址
// const localhost = ""; //正式
var jwt = ""
var id = 0
var name = ""
function getAuthorization(even) {
    return {
        headers: {
            'Authorization': even.jwt,
        }
    }
}
function ret(response) {
    if (response == undefined) {
        return {
            status: 500,
            msg: "net::ERR_CONNECTION_REFUSED"
        }
    }
    if (response.status == 200) {
    } else if (response.status == 301) {
        router.push('/');
    } else {
    }
    return response
}

export default {
    jwt,
    id,
    name,
    localhost,
    post: async function (url, postData) {
        var response = await Vue.prototype.$axios
            .post(localhost + url, postData, getAuthorization(this)).catch(error => {
                return error.response
            })
        return ret(response)
    },
    get: async function (url) {
        var response = await Vue.prototype.$axios
            .get(localhost + url, getAuthorization(this)).then(response => {
                return response
            }).catch(error => {
                return error.response
            })
        return ret(response)
    },
    put: async function (url, putData) {
        var response = await Vue.prototype.$axios
            .put(localhost + url, putData, getAuthorization(this)).catch(error => {
                return error.response
            })
        return ret(response)
    },
    del: async function (url, delData) {
        var response = await Vue.prototype.$axios
            .delete(localhost + url, {
                data: delData,
                headers: getAuthorization(this).headers
            }).catch(error => {
                return error.response
            })
        return ret(response)
    },
    postfile: async function (url, postData, config = 0) {
        var response = await Vue.prototype.$axios
            .post(localhost + url + "?Authorization=" + global.userinfo.jwt, postData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": global.jwt(),
                    "Config": config,
                }
            }).catch(error => {
                return error.response
            })
        return ret(response)
    },
};
