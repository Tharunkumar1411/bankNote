var pdf2table = require('pdf2table');
const express = require('express');
const app = express();
const fs = require('fs');
const { processTransactions } = require('./Controller/bankScrapers/IndianBank');
const decryptPDF = require('./middleware/decryptPDF');
const multer  = require('multer');

app.set('view engine', 'ejs');
  
// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/statementPDF/') // Make sure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

app.post('/expense', upload.single('pdfFile'), async(req, res) => {
    await decryptPDF()
    fs.readFile('./assets/ResultDecrypt.pdf', function (err, buffer) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading PDF file');
        }

        pdf2table.parse(buffer, function (err, rows) {
            if (err) {
                console.error(err);
                return res.status(500).send('Error parsing PDF');
            }

            const transactions = processTransactions(rows);
            // res.json(transactions);
            console.log("chekcing txn:", transactions)
            res.render(`${__dirname}/views/pages/expense.ejs`, {
                tnxDetails: transactions
            });
        });
    });
});

app.get('/', (req, res) => {
    res.render(`${__dirname}/views/pages/index.ejs`,)
})

app.listen(8080, () => {
    console.log(`Example app listening on port 8080`);
});
