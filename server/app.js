const env = require("dotenv");
const cors = require("cors");
const express = require("express");
const TaskRouter = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const app = express();

env.config();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // if using cookies
  })
);

app.use(express.json());

app.use("/api/v1/tasks", TaskRouter);

app.use(notFound);

app.use(errorHandlerMiddleware);

const url = process.env.MONGO_URL;
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(url);
    app.listen(port, () => console.log("Server running on port 5002"));
  } catch (error) {
    console.log(error.message);
  }
};

start();
