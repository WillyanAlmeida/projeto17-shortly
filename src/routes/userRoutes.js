import { Router } from "express";
import { signup, signin } from "../controllers/userController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemasignup, schemasignin } from "../schemas/userSchemas.js";



const userRouter = Router()


userRouter.post("/signup", validateSchema(schemasignup), signup);
userRouter.post("/signin", validateSchema(schemasignin), signin);



export default userRouter