import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: {
        type:String,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type:String,
        allowNull: false,
    },
    balance: {

        type:Number,
        allowNull: false,
        defaultValue:0
    },

});
export const Admin = mongoose.model("admin",adminSchema);