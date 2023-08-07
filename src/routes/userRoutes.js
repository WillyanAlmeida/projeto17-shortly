import { Router } from "express";
import { signup, signin, ranking } from "../controllers/userController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemasignup, schemasignin } from "../schemas/userSchemas.js";



const userRouter = Router()


userRouter.post("/signup", validateSchema(schemasignup), signup);
userRouter.post("/signin", validateSchema(schemasignin), signin);
userRouter.get("/ranking", ranking);



export default userRouter