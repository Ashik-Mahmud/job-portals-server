const app = require("./app");
const port = process.env.PORT || 5000;

/* Listen App */
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});




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
