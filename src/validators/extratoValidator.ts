import {body, ValidationChain, validationResult} from "express-validator";
import {Request} from "express";

export const updateExtrato: ValidationChain = body("total", "total need to be a number").isNumeric()


export const valid = (req: Request) => {
    return validationResult(req)
}