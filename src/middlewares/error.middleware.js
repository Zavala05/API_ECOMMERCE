export const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;

    const message =
        error.isOperational
            ? error.message
            : "Error interno del servidor";
            console.log(error)

    return res.status(statusCode).json({
        success: false,
        message,
    });
};