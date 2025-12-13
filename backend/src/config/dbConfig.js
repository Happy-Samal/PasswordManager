import mongoose from 'mongoose';

let dbConfig = async()=>{
    try{
       await mongoose.connect(process.env.MONGO_URL)
        console.log("DB Connected Successfully")
    }catch(err){
        console.error("error in connect to db : ",err)
    }
}

export default dbConfig;