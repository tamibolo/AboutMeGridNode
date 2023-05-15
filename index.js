/* PUT YOUR SETUP CODE HERE (requires, initialization, port number, etc.) */
const express = require('express');
const app = express();
const router = express.Router({ mergeParams: true });
const fs = require('fs');
const path = require('path');
const port = 3333;

/* PUT YOUR DEFAULT ROUTE CODE HERE - app.get('/', ... );  */

/* PUT YOUR app.get CODE HERE to return the next or previous set of words in the wordlist array.
   You may want to return the list of words as a JSON string for easier parsing
   on the client side. You can do this by using res.json(list) instead of res.send(list)
*/

let words = [];

router.use('/:id', (req, res, next) => {
  const { id } = req.params;
  const startIndex = id ? parseInt(id) : 0;
  const pageSize = 20;
  
  const endIndex = startIndex + pageSize;
  const paginatedWords = words.slice(startIndex, endIndex);
  
  res.status(200).json(paginatedWords);
});

// This code reads the word list into the words array
// You can read in enwords.txt for English, frwords.txt for French, or spwords.txt for Spanish
// You need the 'utf8' argument to get the words as text, not binary
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

// This is the code that starts the server listening for requests
loadWords().then(() => {
  app.use('/', router);
  
  let server = app.listen(port, function () {
    console.log("App server is running on port", port);
    console.log("To end, press Ctrl + C");
  });
  
  module.exports = server;
});

