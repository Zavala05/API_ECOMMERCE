import { success } from "zod";
import { registerUser, loginUser, getMe } from "../services/auth.service.js";

export const registerUserController = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);

        return res.status(201).json({
            success: true,
            message: "Usuario creado exitosamente",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};


export const loginUserController = async(req, res, next)=>{
   try{
        const loginData = await loginUser(req.body);

        return res.status(200).json({
            success:true,
            data:loginData
        })

   }catch(error){
    next(error)
   }
}

export const getMeController = async (req, res, next) => {
    try {
        const user = await getMe(req.user.id);

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        next(error);
    }
};