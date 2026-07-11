import {z} from "zod"

export const registerSchema = z.object({
    name : z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email : z.string().email("Debe ingresar un correo electronico valido"),
    password : z.string().min(6, "La contraseña debe tener al menos 6 caracteres")


})

export const loginSchema = z.object({
    email: z.string().email("Deeb ingresar un correo valido"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
})