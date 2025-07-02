import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dbConnection from "./db/db.js"
import "dotenv/config";
import router from "./routes/user.route.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())
app.use("/users", router);


dbConnection().then(()=>{
    app.listen(process.env.PORT, ()=>{ 
    console.log(`Listening at port ${process.env.PORT}`);
})
}).catch((err)=>{
    console.log("connection failed\n", err)
})




//wWXyOlkM5HEiVYEr


//mongodb+srv://chiragchavan:wWXyOlkM5HEiVYEr@blog-portal.drqgtj0.mongodb.net/?retryWrites=true&w=majority&appName=Blog-Portal