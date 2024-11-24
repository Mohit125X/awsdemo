import sequelize from "../db/dbconfig.js";
import{DataTypes, STRING}from "sequelize";

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();

if(dd<10) 
    dd='0'+dd; 
if(mm<10) 
    mm='0'+mm; 
today = dd+'/'+mm+'/'+yyyy;

const Engagement = sequelize.define("wishList",{
   
    houseVisitCount :{
     type : DataTypes.INTEGER,
      allowNull : false
   },
   date:{
     type:DataTypes>STRING,
     allowNull: false
   }

});
sequelize.sync().then(()=>{
    console.log("Engagement Table Created");
}).catch(err=>{
    console.log(err);
});
export default Engagement;