import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";
let User = sequelize.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false

    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false
        
    },
    role:{
       type:DataTypes.STRING,
       allowNull:false
    },
    longitude:{
        type:DataTypes.INTEGER
    },
    latitude:{
        type:DataTypes.INTEGER
    }
});
sequelize.sync().then(()=>{
    console.log(" Users Table Created");
}).catch(err=>{
    console.log(err);
});
export default User;