import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import cors from "cors"
import {passOP} from './models/info.js'
const app = express()
const port = 3000;

app.use(cors())

await mongoose.connect("mongodb://localhost:27017/PassOP");

app.use(bodyParser.json())

app.get('/', async (req, res) => {
    let data = await passOP.find({});
   res.send(data)
})
app.post('/',async(req,res)=>{
    let data = req.body
    let result = await passOP.insertMany(data)
    res.send({success:true,result:result})
})
app.delete('/',async(req,res)=>{
    let data = req.body
    let result = await passOP.deleteOne(data)
    res.send({success:true,result:result})
})
app.listen(port, () => {
    console.log(`Example app listening on  http://localhost:${port}`)
})