const mongoose = require('mongoose');
const DB_URL = process.env.ATLAS_URL;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const test = () => {
    const iou = new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, options)
            .then(goose => {
                console.log("---- Mongo Connection Test Successful ----");
                resolve({ 
                    msg: "Connection Test Successful.",
                    desc: "Test of connection to MongoDB Atlas Plurster DB succeeded" 
                });
                goose.disconnect();
            })
            .catch(err => {
                console.error(err);
                reject({ 
                    msg: "Connection Test Failed.",
                    desc: "Check server logs for details." 
                });
            });
    })
    return iou;
}

module.exports = {
    test
}