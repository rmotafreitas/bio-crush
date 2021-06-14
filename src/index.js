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

// keepAlive.js
const fetch = require("node-fetch");

// globals
const interval = 25 * 60 * 1000; 
const url = "https://bio-crush.herokuapp.com/";
wake();
function wake() {
  try {
    const handler = setInterval(() => {
      fetch(url).then((res) =>
        console
          .log(`response-ok: ${res.ok}, status: ${res.status}`)
          .catch((err) => console.error(`Error occured: ${err}`))
      );
    }, interval);
  } catch (err) {
    console.error("Error occured: retrying...");
    clearInterval(handler);
    return setTimeout(() => wake(), 10000);
  }
} 



console.log("ok!");
