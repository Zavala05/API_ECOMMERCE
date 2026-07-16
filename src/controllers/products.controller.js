import { number, success } from "zod";
import { createProduct, getProducts, deleteProduct, editProduct } from "../services/products.service.js";
import { AppError } from "../utils/appError.js";


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
        next(error)
    }
}

export const deleteProductController = async(req, res, next) => {
    try{
        const product_id = Number(req.params.id)

        if (!Number.isInteger(product_id) || product_id <= 0){
            throw new AppError("El ID del producto debe ser un entero positivo", 400)
        }

        const product = await deleteProduct(product_id);

        return res.status(200).json({
            success:true,
            message:"Producto eliminado exitosamente",
            data:product
        })
        
    }catch(error){
       next(error)
    }
}

export const updateProductController = async (req, res, next) => {
    try{
        const id = Number(req.params.id)
        const newData = req.body;
        
        const newProduct = editProduct(id, newData)

        return res.status(200).json({
            success: true,
            message: "Producto editado de forma exitosa",
            data:newProduct
        })
    }catch(error){
        next(error);
    }
}

