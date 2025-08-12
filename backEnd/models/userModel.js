import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    isAdmin:{
        type:Boolean,
        required:true,
    }
})

const User = mongoose.model('User',userScheme)

export default User