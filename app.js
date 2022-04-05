const express = require("express");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRoutes");

const app = express();

app.use(cors());

app.enable("trust proxy");

// Data sanitization against XSS(cross side scripting)
app.use(xss());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser, reading data from body to req.body
app.use(express.json({ limit: "500kb" }));
app.use(express.urlencoded({ extended: true, limit: "500kb" }));
app.use(cookieParser());

// Data sanitization against NoSql query Injection
app.use(mongoSanitize());

app.use(compression());

// logging cookies
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// API ROUTES
app.use("/api", userRouter);

// Routes which are not defined
app.all("*", (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  next(err);
});

// All errors come down to this point
app.use(globalErrorHandler);

module.exports = app;
