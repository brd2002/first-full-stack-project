import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
userSchema.pre("save" , async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password  , 10 );
    } 
    next(); 
})
const User = mongoose.model('User' , userSchema);
export default User ;
