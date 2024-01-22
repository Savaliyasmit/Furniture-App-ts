import express from "express";
import morgan from "morgan";
import dotenv from "dotenv"
import {UserRouter,ProductRouter} from "./routes/user/index.routes";
import { connectDB } from "./db/db";


dotenv.config()

const app = express()
const port :number | undefined | any = Number(process.env.PORT || 3000)

app.use(morgan("dev"));
app.use(express.json());

// base route
app.use('/api/v1/users',UserRouter)
app.use('/api/v1/admin',ProductRouter)


connectDB()
.then(()=>{console.log("DB conncted")})
.catch((error)=>{console.log("DB failed to connect",error)})

app.listen(port,()=>console.log(`server conncted localhost:${port}`,))

