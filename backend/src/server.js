import express from 'express'
import 'dotenv/config'
import dbConfig from './config/dbConfig.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import userRouter from './routes/UserRouter.js'
import dataRouter from './routes/DataRouter.js'

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: "GET,PUT,POST,DELETE",
  credentials: true
}));
app.use(bodyParser.json({ limit: '10mb' }))
app.use(cookieParser())

// DB connection
dbConfig()

app.use('/api/auth',userRouter);
app.use('/api/data',dataRouter);

// default routing
app.get('/', (req, res) => {
  res.send('backend is running...')
})

app.listen(port, () => {
  console.log(`Example server listening on port http://localhost:${port}`)
})

