import express from 'express'
import authUser from '../middlewares/authUser.js';
import { getAllOrders, getUserOrder, placeOdrerCOD } from '../controllers/oderController.js';
import authSeller from '../middlewares/authSeller.js';
const orderRouter=express.Router();


orderRouter.post('/cod',authUser,placeOdrerCOD)
orderRouter.get('/user',authUser,getUserOrder)
orderRouter.get('/cod',authSeller,getAllOrders)

export default orderRouter;