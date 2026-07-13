import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().min(1, "DATABASE_URL es requerida"),
    JWT_SECRET: z
        .string()
        .min(16, "JWT_SECRET debe tener al menos 16 caracteres"),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
    console.error("Variables de entorno inválidas:");
    console.error(result.error.flatten().fieldErrors);
    process.exit(1);
}



export const env = result.data;
