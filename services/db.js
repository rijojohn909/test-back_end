// import mongoose in db.js
const mongoose=require('mongoose')
mongoose.set('strictQuery', false);
// define connection string  using  mongoose--bank-db name
mongoose.connect('mongodb://localhost:27017/bank',()=>{
    console.log('connected to mongodb successfully');
})

// create model for the project
// collection-users

const User = mongoose.model('User',{
    username:String,
    acno:Number,
    password:String,
    balance:Number,
    transaction:[]

})

// export the model
module.exports={User}
