const mongoose=require('mongoose');

//define mongoose connection URL

const mongo=process.env.mongoURL;
//setup mongoose connection
mongoose.connect(mongo,{})
// GEt the default conn
const db=mongoose.connection;

//define event listenenr for db connection
db.on('connected',()=>{
    console.log('conncected to mongodb');

})
db.on('error',(err)=>{
    console.log('Mongodb conn error',err);
})
db.on('disconnected',()=>{
    console.log('Mongodb disconnected');
})

//export
module.exports=db;