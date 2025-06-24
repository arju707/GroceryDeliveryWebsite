import express from "express"

import authUser from "../middleware/authUser.js";
import { updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post('/update', updateCart)

export default cartRouter;