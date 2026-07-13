import { AppError } from "../utils/appError.js";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            throw new AppError("Token no proporcionado", 401);
        }

        const payload = verifyToken(token);

        req.user = payload;

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return next(new AppError("El token ha expirado", 401));
        }

        if (error.name === "JsonWebTokenError") {
            return next(new AppError("Token inválido", 401));
        }

        next(error);
    }
};