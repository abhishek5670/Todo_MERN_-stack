import express from 'express'
import { check } from 'express-validator'
import { createllist } from '../controllers/list.js'
import Login from '../controllers/login.js'
import { marklist } from '../controllers/marklist.js'
import register from '../controllers/register.js'
import { removelist } from '../controllers/removelist.js'
import { getlist } from '../controllers/todolist.js'
import list from '../models/list.js'
import LoginSchema from '../validation schema/loginSchema.js'
import RegisterSchema  from '../validation schema/registerSchema.js'
const api = express.Router()
export const apiprotected = express.Router()

api.post('/register',RegisterSchema,register)
api.post('/login',LoginSchema,Login)

apiprotected.post("/createlist",[check("desc","list desc is required").exists()],createllist)

apiprotected.get("/showlist",getlist)

apiprotected.post("/marklist",[check("list_id","list is is required").exists()],marklist)

apiprotected.post("/deletlist",[check("list_id","list is is required").exists()],removelist)

export default api