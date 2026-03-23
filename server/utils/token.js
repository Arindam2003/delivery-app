import jwt from "jsonwebtoken"

const token=(userId)=>{
    try{
        const genToken= jwt.sign({ userId },process.env.SECRET_CODE,{expiresIn:"7d"});
        return genToken
    }catch(err)
    {
        console.error(err);
        throw err;
    }
}

export default token