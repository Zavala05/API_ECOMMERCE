import { success } from "zod";
import { createProduct, getProducts } from "../services/products.service.js";


export const createProductController = async (req, res, next) => {
    try{
        const product = await createProduct(req.body);

        return res.status(201).json({
            success: true,
            message: "Producto Creado Exitosamente",
            data: product
        })
    }catch(error){
        next(error)
    }
}

export const getProductsController = async (req, res, next) => {
    try{
        const products = await getProducts();
        return res.status(200).json({
            success: true,
            message:"Datos Obtenidos Correctamente",
            data: products
        })
    }catch(error){
        console.log("Error al obtener datos: ", error);
        throw error;
    }
}