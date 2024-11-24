import sequelize from "../db/dbConfig.js";
import{DataTypes}from "sequelize";
const WishList=sequelize.define("wishList",{
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
});
sequelize.sync().then(()=>{
    console.log("WishList......");
}).catch(err=>{
    console.log(err);
});
export default WishList;