import express from 'express'
import { healthMessage } from '../controllers/health.controller.js';

const healthRoutes = express.Router();

healthRoutes.get('/', healthMessage)

export default healthRoutes;