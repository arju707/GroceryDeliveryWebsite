
import express from "express";
import authUser from "../middleware/authUser.js";
import { addAdress, getAdress } from "../controllers/adressController.js";

const adressRouter = express.Router();

adressRouter.post('/add', authUser, addAdress);

adressRouter.post('/get', authUser, getAdress);


export default adressRouter;