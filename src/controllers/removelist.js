import { validationResult } from "express-validator"
import List from "../models/list.js"
import User from "../models/user.js"
import { statusCode } from "../utils/constant.js"
import { jsonGenerate } from "../utils/helpers.js"

export const removelist=async(req,res)=>{
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res,json(jsonGenerate(statusCode.VALIDATION_ERROR,"list id is required",error.mapped()))
    }
    try{
        const result = await List.findOneAndDelete({
            userId:req.userId,
            _id:req.body.list_id
        })
        if(result){
            const user=await User.findOneAndUpdate({
                _id:req.userId,
            },
            {
                $pull:{lists:req.body.todo_id}
            })
            return res.json(jsonGenerate(statusCode.SUCCESS,"list deleted",null))
        }
    }catch(error){
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"could not deleted",error))
    }
}