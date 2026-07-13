import express from 'express'
import healthRoutes from './routes/health.routes.js';
import { notFound } from './middlewares/notFound.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import authRouter from './routes/auth.routes.js';
import productsRouter from './routes/products.routes.js';
import cookieParser from 'cookie-parser';

const app = express()
app.use(cookieParser());

app.use(express.json())

app.use("/api/health", healthRoutes)

app.use("/api/auth", authRouter)

app.use("/api/products", productsRouter)

app.use(notFound)

app.use(errorHandler)

export default app;