import express from "express"
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from "./config/db.js"
import { clerkWebhooks } from "./controllers/webhooks.js"

const app = express()

connectDB()

app.use(cors())

// Optional: body parser for other routes
app.use(express.json())

// Health check route
app.get('/', (req, res) => {
  res.send("API working")
})

// Clerk Webhook — MUST use raw body
app.post('/clerk',express.json(),clerkWebhooks)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
