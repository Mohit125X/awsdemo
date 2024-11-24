import nodemailer from "nodemailer";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import WishList from "../model/wishList.model.js";
import WishListHouse from "../model/wishListHouse.model.js";
import HouseRequest from "../model/houseRequest.model.js";
import Property from "../model/property.model.js";
import sequelize from "../db/dbconfig.js";


export const signUp = async (request, response, next) => {
    try {
        
        let error = await validationResult(request);
      
        if (!error.isEmpty())
            return response.status(400).json({ message: "bad request", message: error.array(), status: false });

        let genSalt = await bcrypt.genSalt(10);
        let ecryptpassword = await bcrypt.hash(request.body.password, genSalt);
        request.body.password = ecryptpassword;

        let user = await User.create(request.body);
        return response.status(200).json({ user, status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ message: "internal server error", status: false });
    }
}

export const signIn = async (request, response, next) => {
    console.log(request.body);
    try {
        let user = await User.findOne({where: { email: request.body.email } });
        if (user) {
            console.log(user.dataValues);
           let  status = await bcrypt.compare(request.body.password, user.password);
           console.log("user status....   "+status);
           if (status){
           
             let payload = {subject: user.email};
             let token = jwt.sign(payload,'xyzxyzdfg');      
            return response.status(200).json({ message: "sign in success",token ,status: true });
           }
            return response.status(500).json({ message: "wrong email password", status: false });
        }
    } catch (err) {
        console.log(err);
        return response.status(500).json({ message: "internal server error", status: false });
    }
}

export const view_profile = async(request,response,next)=>{
   console.log(request.body);
   console.log("1---");

    try {
   console.log("2---");
        let user =  await User.findOne({where:{
            id : request.body.userId
        }});
   console.log("3---");
   console.log(user);
        if (user)
            return response.status(200).json({ user, status: true });
        return response.status(500).json({ message: "Bad Request Error", status: false });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ message: "internal server error", status: false });
   }
}

export const viewProperty = async(request,response,next)=>{
     try {
    
         let property =  await Property.findOne({where:{
             id : request.params.propertyId
         }});
    console.log(property);
         if (property)
             return response.status(200).json({ property, status: true });
         return response.status(500).json({ message: "Bad Request Error", status: false });
     } catch (err) {
         console.log(err);
         return response.status(500).json({ message: "internal server error", status: false });
    }
}



export const change_password = async (request, response, next) => {
    try {
        let result = await Admin.update(
            {
                password: request.body.newPassword
            },
            {
                where: {
                    password: request.body.password
                }
            }
        );
        return response.status(200).json({ message: "password update", result, status: true });

    }
    catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });

    }
}

export const forgotPassword = async (request, response, next) => {
    try{
    console.log(request.body.contact)
    let user = await User.findOne({ where: { contact: request.body.contact } })
   
     var otp = Math.random(); 
    if (user) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'rajputmohit2134@gmail.com',
            pass: 'drxyrqbrxikerqfn'
            }
        }); 
    
        var mailOptions = {
            from: 'rajputmohit2134@gmail.com',
            to: user.email,
            subject: 'Sending Email using Node.js',
            html: '<p> Kiraye Wala ..!<br/>This is your Temprory password'+otp+'</p>'
        };
  
        transporter.sendMail(mailOptions, function(error, info){
            if (error)
            console.log(error);
            else 
            console.log('Email sent: ' + info.response);
            
        });
            return response.status(200).json({message:"successfully set password....."});

    }
    return response.status(401).json({message:"this customer not available",status:false});
    }
    catch(err){
        console.log(err);
        return response.status(500).json({err:"internal server error",status:false});
    }
}


export const searchCity=async (request,response,next)=>{
    try{
    let find=await State.findOne({
        where:{
            stateName:request.body.stateName
        }
    })
    if(find){
        let findAll=await City.findAll({
            where:{
                stateId:find.id,
            }
        })
        return response.status(200).json({result:findAll,status:true});
    }
    return response.status(401).json({message:"bad request",status:false});
}
catch(err){
    return response.status(500).json({err:"internal server error",status:false})
}
}



export const addToWishList = async (request,response,next)=>{
    console.log(request.body);
    const errors = validationResult(request);
    if(!errors.isEmpty())
      return response.status(400).json({error: "Bad request", errors: errors.array(), status: false});
   
    const transaction = await sequelize.transaction();
    try{ 
       let wishList = await WishList.findOne({raw: true, where:{userId: request.body.userId}});
       if(wishList){
         let wishListHouse = await WishListHouse.findOne({raw: true, where:{
           wishListId: wishList.id,
           propertyId: request.body.propertyId
         }});
         if(wishListHouse)
           return response.status(200).json({message:"Product is already added in wishList", status: true});
   
         await WishListHouse.create({propertyId: request.body.propertyId,
           wishList: wishList.id}).then(result=>{return result.dataValues});
       
         return response.status(200).json({message: "Item added in cart", status: true});
       }
       else{
         let wishList = await WishList.create({userId: request.body.userId},{
           transaction
         })
         .then(result=>{return result.dataValues});
   
         let wishListHouse = await WishListHouse.create({propertyId: request.body.propertyId,wishList: wishList.id},{transaction})
         .then(result=>{return result.dataValues});
   
         await transaction.commit();
         return response.status(200).json({message: "Item added in cart", status: true});      
       }
    }
    catch(err){
      await transaction.rollback();
      return response.status(500).json({error: "Internal server error", status: false});
    }
   }

   export const removeFromWishList = async (request,response,next)=>{
    try{ 
      const wishList = await WishList.findOne({raw: true, where:{userId: request.body.userId}});
      if(!wishList)
        return response.status(404).json({error: "Requested resouce not found : 404", status: false});
      
      let status = await WishListHouse.destroy({
        where: {wishList: wishList.id, propertyId: request.body.propertyId}
      });   
      
      if(status)
       return response.status(200).json({message: "Item removed from cart", status: true});
      return response.status(404).json({message: "Requested resouce not found", status: false});
    }
    catch(err){
       return response.status(500).json({error: "Internal server error", status: false});
    }
  }


  export const houseRequest = async (request, response, next) => {
    try {
        
        let error = await validationResult(request);
      
        if (!error.isEmpty())
            return response.status(400).json({ message: "bad request", message: error.array(), status: false });

        let houseRequest = await HouseRequest.create(request.body);
        return response.status(200).json({ houseRequest, status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ message: "internal server error", status: false });
    }
}
