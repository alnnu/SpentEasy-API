import {body, ValidationChain, validationResult} from "express-validator";
import {Request} from "express";

export const createTransacao: ValidationChain[] = [
    body("extratoId", "extratoId can not be empty").notEmpty(),
    body("extratoId", "extratoId need to a UUID").isUUID(),
    body("value", "extratoId need to a number").isNumeric(),
    body("date", "date need to be a date").notEmpty(),
    body("tag", "tag need to be one of: transporte, alimentação, diverção, outros").isIn(["transporte", "alimentação", "diverção","outros"]),
    body("type", "type need to be one of: cartao, pix, boleto, dinhero, outros").isIn(["cartao", "pix", "boleto", "dinhero", "outros"]),
]

export const uptadeTransacao: ValidationChain[] = [
    body("value", "extratoId need to a number").isNumeric(),
    body("date", "date need to be a date").notEmpty(),
    body("tag", "tag need to be one of: transporte, alimentação, diverção, outros").isIn(["transporte", "alimentação", "diverção","outros"]),
    body("type", "type need to be one of: cartao, pix, boleto, dinhero, outros").isIn(["cartao", "pix", "boleto", "dinhero", "outros"]),
]

export const valid = (req: Request) => {
    return validationResult(req)
}