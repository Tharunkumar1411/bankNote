var pdf2table = require('pdf2table');
const express = require('express');
const app = express();
const fs = require('fs');
const { processTransactions } = require('./Controller/bankScrapers/IndianBank');
const decryptPDF = require('./middleware/decryptPDF');

app.get('/', async(req, res) => {
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
            res.json(transactions);
        });
    });
});

app.listen(8080, () => {
    console.log(`Example app listening on port 8080`);
});
