const express = require("express");
const compression = require("compression");
const helmet = require("helmet");

const app = express();

app.use(compression());
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'unsafe-inline'", "'self'"],
    },
  })
);

const routes = require("./routes/routes");

app.use(express.urlencoded({ extended: false }));
app.use("/css", express.static("./node_modules/bootstrap/dist/css"));
app.use("/js", express.static("./node_modules/bootstrap/dist/js"));
app.use("/js", express.static("./node_modules/jquery/dist"));
app.use(express.static("./public/"));
app.use(routes);

app.set("view engine", "ejs");

module.exports = app;
