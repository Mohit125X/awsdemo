import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import Property from "../model/property.model.js";
import User from "../model/user.model.js";
import HouseRequest from "../model/houseRequest.model.js";
export const ownersignUp = async (request, response, next) => {
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

export const ownersignin = async (request, response, next) => {

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

export const viewproperty = (request,response,next)=>{
    try{
        let property =  Property.findAll({
            where : {
                userid:request.params.userid
            }
        })
        if(property){
            return response.status(200).json({ message: "properties found",token ,status: true ,property});
        }
    }
    catch(err){
        request.response.status(500).json({message:"internal server error" ,status : false});
    }

}

export const updateproperty = async (request, response, next) => {
    try {
        let result = await Property.update(
            {
              description:request.body.description,
              rent:request.body.rent,
              imagesUrl:request.body.imageUrl
            },
            {
                where: {
                    userid : request.body.userid
                }
            }
        );
        return response.status(200).json({ message: "property updated", result, status: true });

    }
    catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });

    }
}

export const owner_change_password = async (request, response, next) => {
    try {
        let result = await User.update(
            {
                password: request.body.newPassword
            },
            {
                where: {
                    password: request.body.password
                }
            }
        );
        return response.status(200).json({ message: "owner password update", result, status: true });

    }
    catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });

    }
}

export const owner_view_profile = async (request, response, next) => {
    try {
        let result = await User.findOne(
            {
                where: {
                    userid: request.body.userid
                }
            }
        );
        if(result)
           return response.status(200).json({ message: "owner profile is", result, status: true });

           return response.status(202).json({message:"something went wrong" ,status:false});

    }
    catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });

    }
}

export const viewenquiry = async (request,response,next)=>{
    try {
        let result = await HouseRequest.findOne();
        if(result)
           return response.status(200).json({ message: "owner profile is", result, status: true });

           return response.status(202).json({message:"something went wrong" ,status:false});

    }
    catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });

    }   
}