//require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const database = require("./repository/datasource");

var debug = require("debug")("taskids:server");

// init db
database.init();

// set routes
const usersRouter = require("./routes/user.route");
const rewardRouter = require("./routes/reward.route");
const taskRouter = require("./routes/task.route");
const authRouter = require("./routes/auth.route");

// application
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

// use routes
app.use("/api/users", usersRouter);
app.use("/api/rewards", rewardRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/auth", authRouter);

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "client/build/index.html"));
  });
}

var port = process.env.PORT || "4000";
app.set("port", port);
app.listen(port, () => {
  console.log(`Application started sucessfully on port ${port}`);
  debug(`Application started sucessfully on port ${port}`);
});
