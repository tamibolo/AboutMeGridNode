/* PUT YOUR SETUP CODE HERE (requires, initialization, port number, etc.) */
const fs = require('node:fs/promises');
const readFile = fs.readFile;
const path = require('path');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json())


// This code reads the word list into the wordlist array
// You can read in enwords.txt for English, frwords.txt for French, or spwords.txt for Spanish
// You need the 'uft8' argument to get the words as text, not binary
let wordlist = [];
let url = 'enwords.txt'

// utility function to read from a file
async function readFileContent(url) {
    const data = await readFile(path.join(__dirname, url), { encoding: 'utf8' })
    wordlist = data.split('\n')     
}

/* PUT YOUR DEFAULT ROUTE CODE HERE - app.get('/', ... );  */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'))
})

/* PUT YOUR app.get CODE HERE to return the next or previous set of words in the wordlist array.
    You may want to return the list of words as a JSON string for easier parsing
    on the client side.  You can do this by using res.json(list) instead of res.send(list)
*/
// app.get('/prev', (req, res) => {
//     res.json(wordlist)
// })

// app.get('/next', (req, res) => {
//     res.json(wordlist)
// })

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

// This is the code that starts the server listening for requests
let server = app.listen(PORT, function () {
    console.log("App server is running on port", PORT);
    console.log("to end press Ctrl + C");
});




