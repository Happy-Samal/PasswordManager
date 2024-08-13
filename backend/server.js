import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose';
import {passOP} from './models/info.js'
const app = express()
const port = 3000

await mongoose.connect("mongodb://localhost:27017/passOP");

app.use(bodyParser.json())
app.use(cors())

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
  console.log(`Example app listening on port http://localhost:${port}/`)
})