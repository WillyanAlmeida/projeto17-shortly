import { Router } from "express";
import { signup, signin } from "../controllers/userController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemasignup, schemasignin } from "../schemas/userSchemas.js";
import { validateAuth } from "../middlewares/validateAuth.js";


const userRouter = Router()


userRouter.post("/sign-up", validateSchema(schemasignup), signup);
userRouter.post("/sign-in", validateSchema(schemasignin), signin);



export default userRouter