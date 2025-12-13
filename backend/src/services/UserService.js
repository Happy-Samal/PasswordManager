import User from '../models/User.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


class userSer {


async signup (username,email,password){
    const existUser = await User.findOne({email});
    if(existUser){
        return {
            success: false,
            message: "User already exist!"
        };
    }else{
        const hashPassword = await bcrypt.hash(password,10)
        const res = await User.create({username,email,password: hashPassword})
        return {
            success:true,
            message:"Signed in successfully!",
            redirectUrl: '/user/login'
        }
    }
}

async login (email,password){

    const user = await User.findOne({email});

    if (!user){
        return{
            success: false,
            message: "User doesn't exist!"
        };  
    }else{
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return{
                success:false,
                message:"Incorrect Password!",
            };
        }else{
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            return {
                token
            }
        }
    }

}

async isLogin(userId){
    
    const user = await User.findById(userId).select('-password')
    if(!user){
        return {
            success:false,
            message:"User Doesn't Exist"
        }
    }else{
        return {
            success:true,
            user:user
        }
    }
}

}

export default  new userSer();