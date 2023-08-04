import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";

import { schemasurl } from "../schemas/urlSchemas.js";
import { validateAuth } from "../middlewares/validateAuth.js";
import { getUribyid, postUri } from "../controllers/urlController.js";



const urlRouter = Router()


urlRouter.post("/urls/shorten",validateAuth, validateSchema(schemasurl), postUri);
urlRouter.get("/urls/:id", getUribyid);



export default urlRouter