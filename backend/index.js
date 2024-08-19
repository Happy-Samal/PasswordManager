import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { passOP } from './models/info.js';

const app = express();
const port = process.env.PORT;

// CORS configuration
const corsOptions = {
    origin: 'https://password-manager-happy-samal.vercel.app',
    methods: 'GET,POST,DELETE',
    allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions));

await mongoose.connect(process.env.MONGO_URI);

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    try {
        let data = await passOP.find({});
        res.json(data); // Use res.json() for proper JSON response
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/', async (req, res) => {
    try {
        let data = req.body;
        let result = await passOP.insertMany(data);
        res.json({ success: true, result: result }); // Use res.json() for proper JSON response
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/', async (req, res) => {
    try {
        let data = req.body;
        let result = await passOP.deleteOne(data);
        res.json({ success: true, result: result }); // Use res.json() for proper JSON response
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on ${port}`);
});
