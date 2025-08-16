import express from 'express';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';
import { upload } from '../config/multer.js';
import authSeller from '../middlewares/authSeller.js';

const productRouter=express.Router();


productRouter.post('/add',upload.array(["images"]),authSeller,addProduct);
productRouter.get('/list',productList)
productRouter.post('/id',productById)
productRouter.post('/id',authSeller,changeStock)


export default productRouter;