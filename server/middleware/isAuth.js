import jwt from "jsonwebtoken";

const isAuth=(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token)
        {
            return res.status(400).json({
                message:"Token not found"
            })
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        if(!decodeToken)
        {
            return res.status(400).json({
                message:"token is not verify"
            })
        }
        req.userId=decodeToken.userId
        next()
    } catch (error) {
        console.log("JWT ERROR:", error.message);
        return res.status(401).json({
            message: error.message
        });
    }
}

export default isAuth