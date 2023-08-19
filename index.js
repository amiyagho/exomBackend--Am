const express = require ('express');
const cors = require('cors');
const dbconnection = require("./config/database")
const userRouter = require('./routes/authRoute')

const app = express();
dbconnection.connect();
app.use(express.json());


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Server is working"
    })
})

app.use('/api/v1', userRouter)

app.listen(5000,()=>{
    console.log("server is up and running");
})

