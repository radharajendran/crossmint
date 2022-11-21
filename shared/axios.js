 const axios = require('axios');

 module.exports = {
    
    post: async ({url, data}) => {

        // Send a POST request
        return axios({
            method: 'post',
            url: url,
            data: data,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    },

    delete: async ({url, data}) => {
        return axios({
            method: 'delete',
            url: url,
            data: data
        });
    },

    get: async ({url, data}) => {
        return axios({
            method: 'get',
            url: url,
            params: data
        });
    }
 };