import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import productRoute from './routes/product.js'

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

// ROUTES
app.use('/api/product', productRoute)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})