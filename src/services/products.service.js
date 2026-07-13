import { useSyncExternalStore } from "react";
import { prisma } from "../config/prisma.js";
import { AppError } from "../utils/appError.js";


export const createProduct = async (data) => {

    try{
       const product = await prisma.product.create({
        data:{
            name: data.name,
            description: data.description,
            price: data.price,
            imageURL: data.imageURL,

        },
        select:{
            name: true,
            description: true,
            price: true,
            imageURL: true,
            createdAt: true,
            updatedAt: true,
        }
    })

    return product; 
    }catch(error){
        throw error;
    }
    

   
    


}


export const getProducts = async()=>{

    try{
        const products = await prisma.product.findMany({
        select:{
            name:true,
            description:true,
            price: true,
            imageURL:true
        }
    })

    return products;
    }catch(error){
        console.log("ERROR:", error)
        throw error;
    }
}

export const deleteProduct = async(id)=>{
    try{   
        const findProduct = await prisma.product.findUnique({
            where: {
                id
            }
        })

        if(!findProduct){
            throw new AppError("El producto que intenta eliminar no existe", 404)
        }

        const deletedproduct = await prisma.product.delete({
            where:{
                id
            }, 
            select:{
                name:true,
                description: true,
                price: true,
                imageURL: true
            }
        
        })


        return deletedproduct;

    }catch(error){
        console.log("Error al borrar los datos de la DB: ", error)
        throw error;
    }
}