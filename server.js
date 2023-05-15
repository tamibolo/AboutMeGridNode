const express = require('express'); 
const ejs = require("ejs") 
const path = require('path') 

const router = express.Router({ mergeParams: true });
const fs = require('fs');


const imageUrls = ["images/ABOUTME.png", "images/HEADSHOT.JPG", "images/INSTAGRAM.png", "images/LINKEDIN.png", "images/doorClosed.png", "images/doorOpened.png"]

function generateRandomUrl() {
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
}

const app = express(); 
app.use(express.urlencoded({extended: true}));
app.use(express.json())
const PORT = 8080; 
let words = [];

router.use('/:id', (req, res, next) => {
  const { place } = req.body || 0;
  const startIndex = id ? parseInt(place) : 0;
  const pageSize = 20;
  
  const endIndex = startIndex + pageSize;
  const paginatedWords = words.slice(startIndex, endIndex);
  
  res.render('index.ejs', {
    words: paginatedWords,
    place: place + 20
  })
});

const loadWords = async () => {
  if (words.length < 1) {
    try {
      fs.readFile(path.join(__dirname, 'enwords.txt'), 'utf8', function (err, data) {
        if (err) {
          console.error(err);
          return;
        }
        
        words = data.split('\n');
      });
    } catch (error) {
      console.log(error);
    }
  }
  return words;
};


app.set('view engine', "ejs")

app.use(express.static("public"))

app.get('/', (req, res) => {
  const { id } = req.params || 0;
  const startIndex = id ? parseInt(id) : 0;
  const pageSize = 20;
  
  const endIndex = startIndex + pageSize;
  const paginatedWords = words.slice(startIndex, endIndex);
  
  res.render('index.ejs', {
    words: paginatedWords,
    place: id + 20
  })
});

// app.get('/aboutme', (req, res) => {
//   res.render("aboutme")
// });

// app.get('/books', (req, res) => {
//   res.render("books")
// });

// app.get('/websites', (req, res) => {
//   res.render("websites")
// });

// app.get('/random', (req, res) => {
//   res.render("random")
// });

// app.get('/random/generate', (req, res) => {
//   res.json({url: generateRandomUrl()})
// });



loadWords().then(() => {
  app.use('/', router);
  
  app.listen(PORT, () => {
    console.log(`App server is running on port: ${PORT}`);
    console.log("to end press Ctrl + C");
  });
  
});
