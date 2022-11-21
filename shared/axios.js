 const axios = require('axios');

 module.exports = {
    
    /**
     * 
     * @param {url}  
     * @paran {JSON} data needs to be send
     * @returns 
     */
    post: async ({url, data}) => {
        return axios({
            method: 'post',
            url,
            data,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    },

    /**
     * 
     * @param {url}  
     * @paran {JSON} data needs to be send
     * @returns 
     */
    delete: async ({url, data}) => {
        return axios({
            method: 'delete',
            url,
            data,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    },

    /**
     * 
     * @param {url}  
     * @paran {JSON} data needs to be send
     * @returns 
     */
    get: async ({url, data}) => {
        return axios({
            method: 'get',
            url: url,
            params: data
        });
    }
 };