import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        
    },
    password:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        default:'lastname',
        required:true
    },
    location:{
        type:String,
        default:'lastname',
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    avatar:String,
    avatarPublicId: String
})

userSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.password;
    return obj;
}

export default mongoose.model('User',userSchema)