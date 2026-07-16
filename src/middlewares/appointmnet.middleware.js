import { appointmentsSchema } from "../validators/appointments.validator.js"

export const validateAppointment = async(req, res, next) =>{

    const result = appointmentsSchema.safeParse(req.body);

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