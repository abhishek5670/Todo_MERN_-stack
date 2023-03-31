import  Express  from "express";
import api, { apiprotected } from "./routes/api.js";
import mongoose from "mongoose";
import { DB } from "./utils/constant.js";
import AuthMiddleware from "./middlewares/authmiddleware.js";
import cors from 'cors'

const app = Express();
app.use(Express.json())
app.use(cors())

mongoose.connect(DB,{useNewUrlParser:true}).then(()=> console.log("MongoDb Connected ...........")).catch((error)=> console.error("MongoDB connection failed :", error.message));

app.use('/api/',api)
app.use('/api/',AuthMiddleware,apiprotected)

if(process.env.NODE_ENV=="production"){
    app.use(Express.static("frontend/build"))
}


const PORT= process.env.PORT || 5000
app.listen(PORT,()=>console.log('server is running'))