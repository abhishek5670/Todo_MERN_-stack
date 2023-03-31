import { validationResult } from "express-validator"
import List from "../models/list.js"
import User from "../models/user.js"
import { statusCode } from "../utils/constant.js"
import { jsonGenerate } from "../utils/helpers.js"

export const createllist = async (req,res) =>{
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"List is required",error.mapped()))
    }
    try{
        const result=await List.create({
            userId:req.userId,
            desc:req.body.desc
        })
        if(result){
            const user=await User.findOneAndUpdate({_id:req.userId},
             {
                $push:{lists:result}

             })
            return res.json(jsonGenerate(statusCode.SUCCESS,"List created succesfully",result))
        }
        
    }catch(error){
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"somenthing went wrong",error))
    }
}