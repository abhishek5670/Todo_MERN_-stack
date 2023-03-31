import User from "../models/user.js"
import { statusCode } from "../utils/constant.js"
import { jsonGenerate } from "../utils/helpers.js"

export const getlist=async (req,res)=>{
    try{
        const list = await User.findById(req.userId)
            .select("-password")
            .populate("lists")
            .exec()
        console.log(list)
        return res.json(jsonGenerate(statusCode.SUCCESS,"All list",list))
    }catch(error)
    {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"Error",error.mapp))
    }
}