import {body, ValidationChain, validationResult} from "express-validator";
import {Request} from "express";

export const createTransacao: ValidationChain[] = [
    body("accountId", "accountId can not be empty").notEmpty(),
    body("accountId", "accountId need to a UUID").isUUID(),
    body("categoryId", "categoryId can not be empty").notEmpty(),
    body("categoryId", "categoryId need to a UUID").isUUID(),
    body("value", "extratoId need to a number").isNumeric(),
    body("date", "date need to be a date").notEmpty(),
]

export const uptadeTransacao: ValidationChain[] = [
    body("accountId", "accountId can not be empty").notEmpty(),
    body("accountId", "accountId need to a UUID").isUUID(),
    body("categoryId", "categoryId can not be empty").notEmpty(),
    body("categoryId", "categoryId need to a UUID").isUUID(),
    body("value", "extratoId need to a number").isNumeric(),
    body("date", "date need to be a date").notEmpty(),
]

export const valid = (req: Request) => {
    return validationResult(req)
}