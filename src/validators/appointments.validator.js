import {z} from "zod";

export const appointmentsSchema = z.object({

    client_name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    phone: z.string().min(8, "El numero de telefono debe tener al menos 8 digitos").max(8, "El numero de telefono debe tener menos de 8 digitos"),
    description: z.string().min(10, "La descripcion tiene muy pocos caracteres"),
    date: z.coerce.date().min(new Date(), "La fecha debe ser mayor a hoy")

})