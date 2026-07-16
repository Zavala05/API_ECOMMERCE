import { createAppointment } from "../services/appointments_service.js";

export const createAppointmentController = async(req, res, next) =>{
    try{
        const appointment = await createAppointment(req.body);

        return res.status(201).json({
            status: true,
            message: "Cita creada correctamente",
            data: appointment
        });           

    }catch(error){
        throw error;
    }
}
