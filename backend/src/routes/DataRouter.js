import express from 'express'
import { addData,getAllData,updateData,deleteData } from '../controllers/DataController.js'
import authMiddleware from '../middlewares/AuthMiddleware.js';

const dataRouter = express.Router();

dataRouter.post('/addData',authMiddleware,addData)
dataRouter.get('/getAllData',authMiddleware,getAllData)
dataRouter.put('/updateData',authMiddleware,updateData)
dataRouter.delete('/deleteData',authMiddleware,deleteData)

export default dataRouter