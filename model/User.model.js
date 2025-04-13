import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true , 
        unique : true
    }, 
    email : {
        type : String , 
        required : true , 
        unique : true
    }, 
    password : {
        type : String , 
        required : true , 
        min : [6 , "Password must be at least 6 characters"]
    } , 
    role : {
        type : String ,
        enum : ["user" , "admin"],
        default : "user"
    }, 
    isVerified : {
        type : Boolean , 
        default : false
    } , 
    verificationToken : {
        type : String
    } , 
    resetPasswordToken : {
        type : String
    } , 
    resetPasswordExpire : {
        type : Date
    }
}, {timestamps : true});
// * timestams : true => createdAt , updatedAt
export const User = mongoose.model('User' , userSchema);
