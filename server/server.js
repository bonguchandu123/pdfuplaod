import express from "express"
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from "./config/db.js"
import { clerkWebhooks } from "./controllers/webhooks.js"

const app = express()

connectDB()

app.use(cors())


app.get('/',(req,res) => {
    res.send("Api working ")
})

app.post('/clerk', express.json(),clerkWebhooks)

const PORT = process.env.PORT || 5000

app.listen(PORT,() => {
    console.log(`server is runing on port ${PORT}`)
})

