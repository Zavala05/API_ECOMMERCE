import { success } from "zod";
import { registerUser, loginUser, getMe, deleteUser } from "../services/auth.service.js";
import { cookieOptions } from "../config/cookie.js";
import { AppError } from "../utils/appError.js";

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

        res.cookie("accessToken", loginData.token,{
            ...cookieOptions,
            maxAge: 60 * 60 * 1000,
        })

        return res.status(200).json({
            success:true,
            data:{
                user: loginData.user,
            }
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


export const logOutController = async (req, res) =>{
    
    res.clearCookie("accessToken", cookieOptions);

    return res.status(200).json({
        success: true,
        message:"Sesión cerrado correctamente"
    })
    
}

export const deleteUserController = async(req, res, next) =>{

    try{
        const user_id = Number(req.params.id);

        if (!Number.isInteger(user_id) || user_id <= 0){
                throw new AppError("El ID del usuario debe ser un entero positivo", 400)
            }

        const user = await deleteUser(user_id);

        return res.status(200).json({
            success: true,
            message:"Usuaurio eliminado exitosamente",
            data: user
        })

    }catch(error){
        next(error);

    }

}