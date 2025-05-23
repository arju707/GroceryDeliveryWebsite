
import express from "express";
import authUser from "../middleware/authUser.js";
import { getUserOrders, placeOrderCOd } from "../controllers/orderController.js";
import authSeller from "../middleware/authSeller.js";

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOd)
orderRouter.get('/user', authUser, getUserOrders)
orderRouter.get('/seller', authSeller, getUserOrders)


export default orderRouter;
