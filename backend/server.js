import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();
const port = process.env.PORT || 5000;

import router from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/users", router);

if(process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist')));

    app.get("*", (req, res) => { res.sendFile(path.resolve(__dirname, "frontend" , "dist", "index.html"))});
} else {
    app.get("/", (req, res) => { res.send("Server is up and running") });
}


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => { console.log(`Server listening on port ${port}`)});