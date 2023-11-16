import axios from 'axios'
import Configs from '@/configs/configs'
import { headerType } from '@/configs/type'
import MessageText from '@/configs/messageText'

/***
* Get method
*/
export async function getApi(url: string, data: object = {}, headerData: headerType = { 'Content-Type': 'application/json' }) {
    // axios.defaults.headers.get['Authorization'] = headerData['Authorization'];

    return axios.get(Configs.apiURL + url, { params: data, headers: headerData }).then(response => {
        return response.data
    }).catch(error => {
        if (!error.response.data) {
            return error.message
        } else if (error.response.data.statusCode === 401) {
            // TODO: Clear session and go to login page
        }

        return error.response.data
    })
}

/***
* Post method
*/
export async function postApi(url: string, data: object = {}, headerData: headerType = { 'Content-Type': 'application/json' }) {
    return axios.post(Configs.apiURL + url, data, { headers: headerData }).then(response => {
        //
        return response.data
    }).catch (error => {
        if (!error.response) {
            return {
                status: MessageText['R-0002'],
                data: {},
                message: error.message
            }
        } else if (error.response.data.statusCode === 401) {
            // TODO: Clear session and go to login paged
        }

        return error.response.data
    })
}

/***
* Put method
*/
export async function putApi(url: string, data: object = {}, headerData: headerType = { 'Content-Type': 'application/json' }) {
    return axios.put(Configs.apiURL + url, data, { headers: headerData }).then(response => {
        return response.data
    }).catch (error => {
        if (!error.response.data) {
            return error.message
        } else if (error.response.data.statusCode === 401) {
            // TODO: Clear session and go to login page
        }

        return error.response.data
    })
}

/***
* Delete method
*/
export async function deleteApi(url: string, data: object = {}, headerData: headerType = { 'Content-Type': 'application/json' }) {
    return axios.delete(Configs.apiURL + url, { headers: headerData }).then(response => {
        return response.data
    }).catch(error => {
        if (!error.response.data) {
            return error.message
        } else if (error.response.data.statusCode === 401) {
            // TODO: Clear session and go to login page
        }

        return error.response.data
    })
}
