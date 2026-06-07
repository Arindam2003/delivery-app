import jwt from "jsonwebtoken"

const token=(userId)=>{
    try{
        const genToken = jwt.sign({ userId }, process.env.JWT_SECRET,{expiresIn:"7d"});
        return genToken
    }catch(err)
    {
        console.error(err);
        throw err;
    }
}

export default token