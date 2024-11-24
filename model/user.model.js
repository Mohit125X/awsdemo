import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

    name:{
    type: String,
    required: true,
    trim: true
    },

    email:{
    type: String,
    required: true,
    trim: true
    },

    password:{
    type: String,
    required: true
    },

    contact:{
    type: Number,
    required: true,
    trim: true
    },
    role : String,

    longitude:Number,

    lattitude:Number
});

export const User = mongoose.model("user",userSchema);