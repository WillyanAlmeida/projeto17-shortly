import joi from "joi"



export const schemasurl = joi.object({
    url: joi.string().uri().required()
  })

