import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './database/connection.js';

const app = express()

connectDB()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
})