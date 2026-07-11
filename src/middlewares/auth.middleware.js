import { registerSchema, loginSchema } from "../validators/auth.validator.js";

export const validateRegister = (req, res, next)=>{

    
    //No se usa const y variables porque estamos pasando el body completo
     const result = registerSchema.safeParse(req.body);

    if(!result.success){
        const errors = result.error.issues.map((issue)=>{
            return{
                field: issue.path[0],
                message: issue.message
            }
        })
        return res.status(400).json({
            success:false,
            message:"Datos inválidos",
            errors,
        })
    }

    next()
    

}

export const validateLogin = (req, res, next)=>{

    const result = loginSchema.safeParse(req.body);

    if(!result.success){
        const errors = result.error.issues.map((issue)=>{
            return{
                field: issue.path[0],
                message: issue.message
            }
        })
        return res.status(400).json({
            success:false,
            message:"Datos inválidos, Correo o contraseña son incorrectos"
        })
    }

    next()
}