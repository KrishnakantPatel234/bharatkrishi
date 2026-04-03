import bcrypt from "bcrypt"; 
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    avatar : {
        type : String,
        default : "",
    },
    fullname : {
        type : String,
        required : [true , "Name is required for creating your account"],
        trim : true
    },
    about : {
        type : String,
        trim : true,
    },
    username : {
        type : String,
        required : [true , "username is required for creating your account"],
        trim : true,
        unique : true,
    },
    email : {
        type : String,
        required : [true , "email is required for creating your account"],
        trim : true,
        unique : true,
    },
    password : {
        type : String,
        required : [true , "password is required for creating your account"],
        trim : true,
        minLength : [8 , "minimum 8 characters required"],
        select : false
    },
    contact : {
        type : String,   //     ✅ String
        trim : true,
        match: [/^[0-9]{10}$/, "Please enter valid 10-digit phone number"]  // ✅ validation
    },
    type : {
        type : String,
        enum : {
            values : ["FARMER" , "WHOLESALE FARMER" , "BUYER" , "BULK BUYER"],
            message : "A user can be a FARMER, WHOLESALE FARMER, BUYER or a BULK BUYER"
        },
        required : true,
    },
    business : {
        type : String,
        trim : true,
    },
    ratingcount : {
        type : Number,
        default : 0,
    },
    averagerating : {
        type : Number,
        min : 0,
        max : 5,
        default : 0
    },
    country : {
        type : String,
        default : "India",
        trim : true,
    },
    streetaddress : {
        type : String,
        trim : true,
    },
    city : {
        type : String,
        trim : true,
    },
    state : {
        type : String,
        trim : true,
    },
    postalcode : {
        type : Number,
        trim : true
    }
}, {
    timestamps : true
})

// Indexes for better performance
// userSchema.index({ email: 1 });          already used unique : true
// userSchema.index({ username: 1 });       already used unique : true
userSchema.index({ type: 1 });

userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;
    
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password);
}

const User = mongoose.model("User" , userSchema);

export default User;