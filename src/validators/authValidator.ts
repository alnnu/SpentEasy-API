import {body, ValidationChain, validationResult} from "express-validator";
import {Request} from "express";

export const createUser: ValidationChain[] = [
    body("email", "email not valid").notEmpty().isEmail(),
    body("name", "name cant be empty").notEmpty(),
    body("lastName", "last name can not be empty").notEmpty(),
    body("password", "minimum password length is 6 characters").notEmpty().isLength({min:6}),
    body("password", "password can not have any space").matches(/^\S*$/),
    body("password", "password need do have at least 1 number").matches(/^.*\d.*/),
    body("password", "password need do have at least 1 character upper case").matches(/^.*[A-Z].*/),
    body("passwordConfirm", "passwordConfirm can not be empty").notEmpty()
]

export const loginUser: ValidationChain[] = [
    body("email", "email not valid").isEmail(),
    body("password", "minimum password length is 6 characters").isLength({ min: 5 }),
]

export const resetPassword: ValidationChain[] = [
    body("password", "password can not be empty").notEmpty(),
    body("password", "minimum password length is 6 characters").isLength({min:6}),
    body("passwordConfirm", "passwordConfirm can not be empty").notEmpty()
]

export const createResetPasswordToken: ValidationChain[] = [
    body("email", "email not valid").isEmail()
]
export const valid = (req: Request) => {
    return validationResult(req)
}
