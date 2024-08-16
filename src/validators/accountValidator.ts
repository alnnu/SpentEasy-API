import {Request} from "express";
import {body, param, ValidationChain, validationResult} from "express-validator";

export const createAccount: ValidationChain[] = [
    body("name", "Name can not be empty").notEmpty()
]

export const deleteAccount: ValidationChain[] = [
    body("accounts", "Accounts can not be null").exists()
]


export const editAccount: ValidationChain[] = [
    param("id", "Name can not be empty").isUUID(),
    body("name", "Name can not be empty").notEmpty()
]

export const valid = (req: Request) => {
    return validationResult(req)
}