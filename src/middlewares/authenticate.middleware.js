import { AppError } from "../utils/appError.js";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = (req, res, next) => {

    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            throw new AppError("Token no proporcionado", 401)
        }
        const token = authHeader.split(" ")[1];

        if(!token){
            throw new AppError("Token no proporcionado", 404)
        }

        const payload = verifyToken(token);

        req.user = payload;

        next()
    }catch(error){
        

        if (error.name === "TokenExpiredError") {
            return next(new AppError("El token ha expirado", 401));
        }

        if (error.name === "JsonWebTokenError") {
            return next(new AppError("Token inválido", 401));
        }
        
        next(error);
    }
    

}