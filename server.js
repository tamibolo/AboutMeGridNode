const express = require('express'); 
const ejs = require("ejs") 
const path = require('path') 

const imageUrls = ["images/ABOUTME.png", "images/HEADSHOT.JPG", "images/INSTAGRAM.png", "images/LINKEDIN.png", "images/doorClosed.png", "images/doorOpened.png"]

function generateRandomUrl() {
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
}

const app = express(); 
const PORT = 8080; 


app.set('view engine', "ejs")

app.use(express.static("public"))


app.get('/', (req, res) => {
    res.render("index")
});

app.get('/aboutme', (req, res) => {
  res.render("aboutme")
});

app.get('/books', (req, res) => {
  res.render("books")
});

app.get('/websites', (req, res) => {
  res.render("websites")
});

app.get('/random', (req, res) => {
  res.render("random")
});

app.get('/random/generate', (req, res) => {
  res.json({url: generateRandomUrl()})
});

app.listen(PORT, () => {
  console.log(`App server is running on port: ${PORT}`);
  console.log("to end press Ctrl + C");
});

