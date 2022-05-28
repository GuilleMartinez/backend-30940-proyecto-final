const express = require("express");
const { port } = require("./config/options");

const app = express();

// Default configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cart"));
app.all("*", require("./utils/rejectByNotImplemented"));
app.use(require("./utils/errorHandler"));

app.listen(port, (err) =>
    err ? console.log(err) : console.log(`Server listening on port ${port} ✔`)
);