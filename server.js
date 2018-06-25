const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request");

var db = require("./models");

var PORT = 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect("mongodb://localhost/scraper")


app.get("/", (req, res) => {
    res.render("index");
})

app.get("/scrape", (req, res) => {

    request("https://theonion.com/", (error, response, html) => {
        var $ = cheerio.load(html);

        let result = {};

        $(".story-teaser").each(((i, element) => {
            result.headline = $(element).children("a").attr("title");
            result.link = $(element).children("a").attr("href");
            db.Article.create(result)
                .then((dbArticle) => {
                    console.log(dbArticle)
                })
                .catch((err) => {
                    return res.json(err);
                })
        }))
        res.send("Scrape Complete");
    })
})


app.get("/articles", (req, res) => {

    db.Article.find({})
    .then((dbArticle) => {
        res.json(dbArticle)
    })
    .catch((err) => {
        res.json(err)
    })
})

app.listen(PORT, () => {
    console.log("app listening on port: " + PORT);

})
