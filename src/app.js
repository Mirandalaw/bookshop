const express = require("express");
const cors = require("cors");
const testRouter = require("./router/testRoute");
const userRouter = require("./router/userRoute");
const categoryRouter = require("./router/categoryRoute");

const app = express();

const handlerStatusMiddleware = (req, res, next) => {
  res.handleStatus = (status, message) => {
    res.status(status).json({ status, message });
  };
  next();
};

if (process.env.NODE_ENV === "dev") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
}

app.get("/", (req, res) => {
  res.send("hello world");
});

// app.use('/upload', express.static('upload'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(handlerStatusMiddleware);
app.use("/test", testRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);

module.exports = app;
