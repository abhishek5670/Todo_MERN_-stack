import {check} from "express-validator";

export const RegisterSchema=[
    check('name').trim().isAlpha()
    .withMessage("Name should be alphabets only"),

    check('username','username is required').exists()
    .isAlphanumeric().withMessage('username should be alphanumeric character only')
    .trim().isLength({min:6,max:32}),
    
    check('password','password is required').isLength({min:6,max:100}).trim(),

    check('email','mail is required').exists().isEmail(),
]
export default RegisterSchema