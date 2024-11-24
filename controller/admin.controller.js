
import Admin from "../model/admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";


export const signUp = async (request, response, next) => {
    try {
        let error = await validationResult(request);
        if (!error.isEmpty())
            return response.status(400).json({ message: "bad request", message: error.array(), status: false });
        let genSalt = await bcrypt.genSalt(10);
        let ecryptpassword = await bcrypt.hash(request.body.password, genSalt);
        request.body.password = ecryptpassword;
        console.log(ecryptpassword);
        let admin = await Admin.create(request.body);
        return response.status(200).json({ admin: admin, status: true });
    }
    catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });
    }
}
export const signIn = async (request, response, next) => {

    try {
        let admin = await Admin.findOne({where: { email: request.body.email } });
        if (admin) {
           let  status = await bcrypt.compare(request.body.password, admin.password);
           if (status){
             let payload = {subject: admin.email};
               let token = jwt.sign(payload,'xyzxyzdfg');      
            return response.status(200).json({ message: "sign in success",token ,status: true });
           }
            return response.status(500).json({ message: "wrong email password", status: false });
        }
    } catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });
    }
}

export const viewBalance=async(request,response,next)=>{
    try {
        let admin =  await Admin.findOne();
        if (admin)
            return response.status(200).json({ balance: admin.balance, status: true });
        return response.status(500).json({ message: "Bad Request Error", status: false });
    } catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });
   }
}

export const view_owners = async (request, response, next) => {
    try {
        let owners = await User.findAll({
            where: {
                role: request.params.role
            }
        });
        return response.status(200).json({ ownerList: owners, status: true });
    } catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });

    }
}
export const view_tenants = async (request, response, next) => {
    try {
        let tenantList = await User.findAll({
            where: {
                role: request.params.role
            }
        });
        return response.status(200).json({ tenantList, status: true });
    } catch (err) {
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