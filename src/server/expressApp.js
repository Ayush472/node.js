import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import Ddos from "ddos";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";

// Variables defination.
const app = express();
app.use("/uploads", express.static(path.join("uploads")));

const url = "mongodb://localhost:27017/oemup";
// const url = 'mongodb+srv://ayush:Hp7Dm6ATKDOGRYnO@cluster0.h2pkdsq.mongodb.net/oemup';
// const url = config.DB;
// const url = config.productionDB;

// Connect to MongoDB
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

// Handle MongoDB connection events
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// mongoose.connect(url);
// mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// });

app.use(cors({ origin: "*" }));
app.set("trust proxy", 1); // trust first proxy
app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10mb",
  })
);
var ddos = new Ddos({ burst: 20, limit: 20 });
app.use(ddos.express);
app.use(logger("combined"));


app.get("/", function (req, res) {
  res.json({ Status: "Success", Message: "Server is running" });
});

export default app;
