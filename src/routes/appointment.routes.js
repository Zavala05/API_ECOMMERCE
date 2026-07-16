import express from "express";
import { createAppointmentController } from "../controllers/appointments_controller.js";
import { validateAppointment } from "../middlewares/appointmnet.middleware.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/", validateAppointment ,createAppointmentController);

export default appointmentRouter;