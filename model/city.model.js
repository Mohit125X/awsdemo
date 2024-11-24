import sequelize from "../db/dbConfig.js";
import{DataTypes}from "sequelize";
const City=sequelize.define("city",{
 cityName:{
    type:DataTypes.STRING,
    allowNull:false
 }
});
sequelize.sync().then(()=>{
    console.log("City table Created");
}).catch();
export default City;