const mongoose = require('mongoose');
mongoose.set('debug', true);

const DB_URL = process.env.DB_URL;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

const connect = () => {
    const iou = new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, options)
            .then(goose => {
                console.log("---- Mongo Connection Test Successful ----");
                resolve({ 
                    msg: "Connection Test Successful.",
                    desc: "Test of connection to MongoDB Atlas Plurster DB succeeded" 
                });
                // CONNECTION EVENTS
                // When successfully connected
                mongoose.connection.on('connected', function () {
                    console.log('Mongoose default connection open to ' + dbURI);
                }); 
                    
                // If the connection throws an error
                mongoose.connection.on('error',function (err) { 
                    console.log('Mongoose default connection error: ' + err);
                }); 
                
                // When the connection is disconnected
                mongoose.connection.on('disconnected', function () { 
                    console.log('Mongoose default connection disconnected'); 
                });
                
                // If the Node process ends, close the Mongoose connection 
                process.on('SIGINT', function() {   
                    mongoose.connection.close(function () { 
                    console.log('Mongoose default connection disconnected through app termination'); 
                    process.exit(0); 
                    }); 
                }); 
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

class MongooseCRUD {
    constructor(name, schema){ 
        console.log(`---- Making ${name} Connection ----`)
        const connection = mongoose.createConnection(DB_URL, options);
        this.model = connection.model(name, schema);
    }
    findOne(id){
        return this.model.findById(id).exec()
    }
    findMany(info){
        return this.model.find({ [info.key] : new RegExp(info.value, 'i') }).exec();
    }
    findAll(){
        return this.model.find().exec()
    }
    createOne(data){
        const entity = new this.model(data);
        return entity.save();
    }
    createMany(data){
        return this.model.insertMany([...data]);
    }
    updateOne(info){
        return this.model.findByIdAndUpdate(info.id, 
                { ...info.data }, 
                { new: true })
            .exec();
    }
    deleteOne(id){
        return this.model.findOneAndRemove({ _id: id });
    }
}

module.exports = {
    test,
    MongooseCRUD
}