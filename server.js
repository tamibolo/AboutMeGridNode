const express = require('express'); 
const ejs = require("ejs") 
const path = require('path') 

const router = express.Router({ mergeParams: true });
const fs = require('node:fs/promises');
const readFile = fs.readFile;


const imageUrls = ["images/ABOUTME.png", "images/HEADSHOT.JPG", "images/INSTAGRAM.png", "images/LINKEDIN.png", "images/doorClosed.png", "images/doorOpened.png"]

function generateRandomUrl() {
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
}

const app = express(); 
app.use(express.urlencoded({extended: true}));
app.use(express.json())
const PORT = 8080; 

let wordlist = [];
let url = 'enwords.txt'


async function readFileContent(url) {
    const data = await readFile(path.join(__dirname, url), { encoding: 'utf8' })
    wordlist = data.split('\n')     
}

// Utility route handler function
async function handler(req, res) {
     try {
        const language = req.body.language;
        console.log(language);
        if (language === "en") {
            url = 'enwords.txt'
        } else if (language === "fr") {
            url = 'frwords.txt'
        } else if (language === 'es') {
            url = 'eswords.txt'
        }

        await readFileContent(url);
        res.json(wordlist)
    } catch (error) {
         console.log(error);
    }
}

app.post('/prev', handler);

app.post('/next', handler);


app.set('view engine', "ejs")

app.use(express.static("public"))

app.get('/', (req, res) => {
  res.render('index.ejs')
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




  app.use('/', router);
  
  app.listen(PORT, () => {
    console.log(`App server is running on port: ${PORT}`);
    console.log("to end press Ctrl + C");
  });
  

