import { productsSchema } from "../validators/products.validators.js";

export const validateProduct = (req, res, next)=>{

    const result = productsSchema.safeParse(req.body);

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