const express=require('express');
const app=express();
require('dotenv').config();
const mongoose=require('mongoose');
const userRouter=require('./routes/user');
const cors = require('cors');
const expenseRouter=require('./routes/expense');


app.use(cors({
    origin: ["http://localhost:5173"],
    credentials:true,
    allowedHeaders:["Content-Type","Authorization"]
}));
app.use(express.json());


app.use('/',userRouter);
app.use('/',expenseRouter);


const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        console.error("MongoDB connection failed", error);
        process.exit(1); // Exit if connection fails
    }
};
connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`);
})