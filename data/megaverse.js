const mongoose = require('mongoose');
const db = require('./db')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const config = require('./../cfg/config.json');
const schema = mongoose.Schema;

// create an schema for users collections
let mapSchema = schema({
                    
});

const dataLayer = {

    /**
     * Create user from signup screen
     * @param {JSON} data 
     * @returns {JSON} error, result
     */
    insertMap: async (data) => {

        try {
            let userDoc = mongoose.model('users', userSchema);

            //Check candidate  availability based on email
            let userExist = await userDoc.exists({ email: data.email });

            if(userExist) {
                return {error: "conflict", message: "User Already Exists"};
            }
            
            data.password = bcrypt.hashSync(data.password, 8);

            userDoc = new userDoc(data);
            return await userDoc.save(); 
        }
        catch(e) {
            console.log(`Error occured in insert ${e}`);
            return new Error(e);
        }
    }

}


module.exports = dataLayer    
