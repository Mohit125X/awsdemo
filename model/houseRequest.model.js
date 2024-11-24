import sequelize from "../db/dbconfig.js";
import{DataTypes}from "sequelize";

const HouseRequest=sequelize.define("houseRequest",{
 
    message:{
        type:DataTypes.STRING
    },

    date:{
        type:DataTypes.STRING
    }

});

sequelize.sync().then(()=>{
    console.log("houseRequest Created");
}).catch();
export default HouseRequest;