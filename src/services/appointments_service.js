import { AppError } from "../utils/appError.js";
import { prisma } from "../config/prisma.js";

export const createAppointment = async (data) =>{

    try{
        const appointment = await prisma.appointments.create({
            data:{
                client_name: data.client_name,
                phone: data.phone,
                description: data.description,
                date: data.date,
            },
            select:{
                id: true,
                client_name: true,
                phone: true,
                description: true,
                date: true,
                createdAt: true,
                appointment_state: true,
            }
        })

        console.log("Registro Creado Exitosamente")

        return appointment;
    }catch(error){
        console.log("ERROR:", error)
        throw new AppError("No se pudo crear la cita", 400);
        

    }
    
}