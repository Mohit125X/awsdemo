import mongoose from "mongoose";

const houseRequestSchema = new mongoose.Schema({
 
    message:{
        type:String
    },

    date:{
        type:String
    }

});

export const HouseRequest = mongoose.model("houserequest",houseRequestSchema);