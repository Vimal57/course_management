const express = require("express");
const app = express();
const route = require("./routes/route");
const port = 3000;
const bodyParser = require("body-parser");
const path = require("path");


app.set("view engine", 'ejs');
app.use(express.static("course_management"));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use(route);

app.listen(port, () => {
    console.log("Listenint to the port", port);
});