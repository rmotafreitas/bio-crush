const dotenv = require("dotenv");
const express = require("express");
const path = require("path");


dotenv.config();
const app = express();



const port = process.env.PORT || 3001;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.static(__dirname + '/pages'));

/*app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "pages", "mainPage.html"));
});*/


app.get("/", (req, res) => {
  res.status(200).render('game')
})


app.listen(port);

console.log("ok!");
