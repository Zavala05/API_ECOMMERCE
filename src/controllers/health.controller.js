export const healthMessage= (req, res)=>{
    res.status(200).json({
        status:"ok",
        message:"API funcionando"
    })
}