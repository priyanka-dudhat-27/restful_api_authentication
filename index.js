const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const path = require("path");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/restful_api", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("db is connected");
}).catch((err) => {
    console.log(err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use("/api/v1", require("./router/index"));

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`server listening on ${port}`);
});
