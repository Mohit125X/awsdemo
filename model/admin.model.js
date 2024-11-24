import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfig.js";
let Admin = sequelize.define("admin", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
    },

});
sequelize.sync().then(()=>{
    console.log(" Admin Table Created");
}).catch(err=>{
    console.log(err);
});
export default Admin;