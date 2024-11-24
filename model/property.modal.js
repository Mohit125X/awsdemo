import mongoose from "mongoose";

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();

if(dd<10) 
    dd='0'+dd; 
if(mm<10) 
    mm='0'+mm; 
today = dd+'/'+mm+'/'+yyyy;

const propertySchema = new mongoose.Schema({
    userId:{
        type:Number,
        allowNull:false
    },
    description:{
        type:String,
        allowNull:false
    },
    rent:{
        type:String,
        allowNull:false
    },
    address:{
        type:String,
        allowNull:false
    },
    status:{
        type:String,
        allowNull:false
    },
    houseCategory:{
        type:String,
        allowNull:false
    },
    imagesUrlArray:[],
    latitude:{
        type:String,
        allowNull:false
    },
    longitude:{
        type:String,
        allowNull:false
    },
    date:{
       type:String,
       defaultValue: today
    }
});
export const Property = mongoose.model("property",propertySchema);