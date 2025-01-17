import mongoose,{mongo, Schema} from "mongoose";

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password  : {
        type : String,
        required  : true
    },
    
});

const accountSchema  = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true 
    }
});

export const Account = mongoose.model('Account',accountSchema)

export const User = mongoose.model('User',userSchema);

    