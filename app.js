require("./config/config");
require("./models/db");
// require("./config/passportConfig");
const path = require('path')
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

// const rtsIndex = require("./routes/index.router");

var app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, x-Requested-With , Content-Type,Accept,Author ,Authorization"
  );
  next();
});
app.get('/uploads/:path', (req, res) => {
  // console.log('hihi')
  // console.log(req.params.path)
  res.sendFile(path.join(__dirname,`uploads/${req.params.path}`));
});
app.use(cors());
app.use(passport.initialize());
// app.use('/api', rtsIndex);
app.use("/api", require("./routes/customer.routes"));
app.use("/api", require("./routes/admin.routes"));
app.use("/api", require("./routes/category_product.routes"));
app.use("/api", require("./routes/product.routes"));
app.use("/api", require("./routes/order.routes"));
// error handler
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach(key =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  } else {
    console.log(err);
  }
});

// start server
app.listen(process.env.PORT, () =>
  console.log(`Server started at port : ${process.env.PORT}`)
);
