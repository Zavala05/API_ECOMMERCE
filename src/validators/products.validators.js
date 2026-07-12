import {z} from "zod";

export const productsSchema = z.object({
    name : z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    description: z.string().min(10, "La descripcion tiene muy pocos caracteres"),
    price : z.number().int().positive("El numero debe ser positivo"),
    imageURL : z.string().min(6,"formato de imagen incorrecto")
})