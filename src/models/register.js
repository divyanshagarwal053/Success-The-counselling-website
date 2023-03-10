const mongoose = require("mongoose");

//we have defined the schema
const  register = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true

    },
    name:{
        type:String,
        required:true
    },
    email :{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        // required:true
    }
});

const Register = new mongoose.model("Register", register);
module.exports= Register;