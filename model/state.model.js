import sequelize from "../db/dbConfig.js";
import{DataTypes}from "sequelize";

const State=sequelize.define("state",{
 stateName:{
    type:DataTypes.STRING,
 }
});

sequelize.sync().then(()=>{
    console.log("State table Created");
}).catch();

export default State;