import mongoose from "mongoose";
const citySchema = new mongoose.Schema({
 cityName:{
    type:String,
    allowNull:false
 }
});
export const City = mongoose.model("city",citySchema);