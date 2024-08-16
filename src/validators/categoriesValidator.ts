import {Request} from "express";
import {body, param, ValidationChain, validationResult} from "express-validator";

export const createCategory: ValidationChain[] = [
    body("name", "Name can not be empty").notEmpty()
]

export const deleteCategory: ValidationChain[] = [
    body("categories", "Category can not be null").exists()
]



export const editCategory: ValidationChain[] = [
    param("id", "Name can not be empty").isUUID(),
    body("name", "Name can not be empty").notEmpty()
]

export const valid = (req: Request) => {
    return validationResult(req)
}