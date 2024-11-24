import sequelize from "../db/dbConfig.js";
import{DataTypes}from "sequelize";

const WishListHouse=sequelize.define("wishListHouse",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    }
});

sequelize.sync().then(()=>{
    console.log(" wishListhouse table cretae");
}).catch(err=>{
    console.log(err);
});

export default WishListHouse;