import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(express.json());

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    if (connection) {
        console.log('MongoDB Connected....💖')
    }
}
connectDB();

app.get('/api/health', async (req, res) => {
    res.json({
        success: true,
        message: "Server is live"
    })
})

const checkApi = (req, res,next) => {
    const { apiKey } = req.query;

    if (apiKey === "abc123") {
        next();
    }

    else {
        return res.status(401).json({
            success: false,
            message: "API key is Invalid"
        })
    }
}

const validateParams = (req, res, next) => {
    const { title, description, price } = req.body;
    if (!title || !description || !price) {
        return res.json({
            success: true,
            message: "All fields are required"
        })
    }
}
app.get('/api/orders', checkApi, validateParams, async (req, res) => {
   return  res.json({
        success: true,
        data: {},
        message: "Order fetched successfully"
    })
    next();
})

app.post('/api/orders', checkApi, validateParams, async (req, res) => {
    return res.json({
        success: true,
        data: {},
        message: "Order is Created"
    })
    next();
})
let counter = 0;
const apiCallCounters = (req, res, next) => {
    counter++;
    console.log(`API calls :${counter}`)
    next();
}
app.use(apiCallCounters);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})