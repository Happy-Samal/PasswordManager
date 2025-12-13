import express from 'express'
import { signup, login,logout, isLogin } from "../controllers/UserController.js";
import AuthMiddleWare from '../middlewares/AuthMiddleware.js'


const userRouter = express.Router()

userRouter.post('/signup',signup);

userRouter.post('/login',login);

userRouter.get('/logout',logout);

userRouter.get('/isLogin',AuthMiddleWare,isLogin)

export default userRouter;