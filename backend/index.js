import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoute from './routes/user.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/message.js';
import cors from 'cors';
import { app, server } from './socket/socket.js'
import path from 'path';

dotenv.config({});

const __dirname = path.resolve();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, async ()=>{
    await connectDB();
    console.log(`Server listening at ${PORT}`)
});