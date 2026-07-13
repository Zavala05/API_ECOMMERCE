import { AppError } from "../utils/appError.js";
import { prisma } from "../config/prisma.js";
import bcrypt from 'bcrypt'
import { generateToken, verifyToken } from "../utils/jwt.js";

export const registerUser = async (data) => {
    const existingUser = await prisma.user.findUnique({
        where:{
            email: data.email,
        }
    })

    if (existingUser !== null){
        throw new AppError("El correo ya esta registrado", 409)
    }
    //Hasheo de contraseña 
    const hashedPassword = await bcrypt.hash(data.password, 10);
    try{
        const user = await prisma.user.create({
        data:{
            name:data.name,
            email:data.email,
            password:hashedPassword
        },
        select:{
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        }
    });

    return user;
    }catch(error){
        if(error.code === "P2002"){
            throw new AppError("El correo ya está registrado", 409)
        }

        throw error;
    }
    

    
};

export const loginUser = async (loginData) => {

    const user = await prisma.user.findUnique({
        where:{
            email:loginData.email
        }
    })

    if (user === null){
        throw new AppError("Credenciales Inválidas", 401)
    }
    
    const isPasswordValid = await bcrypt.compare(loginData.password, user.password)
    
    if (!isPasswordValid){
        
        throw new AppError("Credenciales Invalidas", 401)
    }

    const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }
    //Generamos el token
    const token = generateToken(safeUser)
    return {user:safeUser, token}
};

export const getMe = async(userId) => {
    const user = await prisma.user.findUnique({
        where:{
            id: userId,
        },
        select:{
            id: true,
            name:true,
            email:true, 
            role:true,
            createdAt:true,
            updatedAt:true
        }
    });

    if (user === null){
        throw new AppError("Usuario no encontrado", 401)
    }

    return user;
}

export const deleteUser = async(id)=>{
    try{
        const findUser = await prisma.user.findUnique({
            where:{
                id
            }
        })

        if(!findUser){
            throw new AppError("El Usuario que desea eliminar no existe", 404)
        }

        const deletedUser = await prisma.user.delete({
            where:{
                id
            },
            select:{
                id: true,
                name:true,
                email:true
            }
        })

    }catch(error){
        console.log("Error al borrar el Usuario de la DB ", error);
        throw error;
    }
}