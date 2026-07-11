import { AppError } from "../utils/appError.js"

export const authorize = (...allowedRoles) =>{
    return(req, res, next)=>{

        const hasPermission = allowedRoles.includes(req.user.role);

        if (hasPermission === false){
            throw new AppError("Sin permisos para acceder a este recurso", 403)
        }

        next();

        
        


    }
}
