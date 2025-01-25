const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    userName:{
        type:String,
        require:true,
        uniqure:true
    },
    email:{
        type:String,
        require:true,
        uniqure:true
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        default:'user'
    }
})
const User=mongoose.model("User",UserSchema)
module.exports=User;