import { Router } from "express";

import userRouter from "./userRoutes.js";
import urlRouter from "./urlRoutes.js";


const router = Router()

router.use(userRouter)
router.use(urlRouter)




export default router;