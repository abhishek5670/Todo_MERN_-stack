import { validationResult } from "express-validator"
import List from "../models/list.js"
import { statusCode } from "../utils/constant.js"
import { jsonGenerate } from "../utils/helpers.js"

export const marklist=async (req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"list is is required",error.mapped()))
    }
    try{
        const list = await List.findOneAndUpdate({
            _id:req.body.list_id,
            userId:req.userId
        },
        [
            {
                $set:{
                    isCompleted:{
                        $eq:[false,"$isCompleted"]
                    }
                }
            }
        ])
        if(list){
            return res.json(jsonGenerate(statusCode.SUCCESS,"updated",list))
        }
    }
    catch(error){
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"could not updated",null))
    }
}