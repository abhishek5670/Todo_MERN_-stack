import { json } from "express"
import { JWT_TOKEN_SECRET, statusCode } from "../utils/constant.js"
import { jsonGenerate } from "../utils/helpers.js"
import jwt from 'jsonwebtoken'

const AuthMiddleware =(req,res,next) =>{
    if(req.headers["auth"]===undefined){
        return res.json(jsonGenerate(statusCode.AUTH_ERROR,"Access Denied"))
    }

    const token=req.headers['auth']
    try{
        const decoded = jwt.verify(token,JWT_TOKEN_SECRET)
        console.log(decoded)
        req.userId=decoded.userId
        return next()
    }catch(error){
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"Invalid Token"))
    }
}
export default AuthMiddleware