const app = require("./app");



/* Imports Router Here */
const jobsRouter = require("./../routes/jobs.route")
const userRouter = require("./../routes/user.route")


/* Apply Router Here */
app.use("/api/user", userRouter)
app.use("/api/jobs", jobsRouter);







/* Global Error Handling */
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
})


app.use((err, req, res, next) => {
    console.log(err);
    if(req.headersSent) {
        return next(err);
    }
    res.status(500).json({
        message: err.message,
        error: err
    });
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
