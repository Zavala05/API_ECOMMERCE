import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import healthRoutes from './routes/health.routes.js';
import { notFound } from './middlewares/notFound.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import authRouter from './routes/auth.routes.js';
import productsRouter from './routes/products.routes.js';
import appointmentRouter from './routes/appointment.routes.js';
import { env } from './config/env.js';

const app = express()
app.use(cookieParser());

app.use(express.json())

app.use(
    cors({
        origin: env.FRONTEND_URL,
        credentials: true
    })
)

app.use("/api/health", healthRoutes)

app.use("/api/auth", authRouter)

app.use("/api/products", productsRouter)

app.use("/api/appointments", appointmentRouter)

app.use(notFound)

app.use(errorHandler)

export default app;