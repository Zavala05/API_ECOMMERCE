import app from "./app.js";
import dotenv from 'dotenv';
import { env } from "./config/env.js";

dotenv.config();

const PORT = process.env.PORT || 3000;



app.listen(env.PORT, ()=>{
    console.log("Servidor Corrriendo en puerto: ",env.PORT)
})