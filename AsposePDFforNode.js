// AsposePDFforNode.js
// Mock implementation
var pdf2table = require('pdf2table');
const fs = require('fs');

function AsposePdf() {
    return Promise.resolve({
        AsposePdfDecrypt: (pdfFile, password, output) => {
            console.log(`Decrypting ${pdfFile}...`);
            // Mock decryption process
            if (password === "6176667684") {
                // Simulate a successful decryption
                return { errorCode: 0, fileNameResult: output, errorText: null };
            } else {
                // Simulate a failed decryption
                return { errorCode: 1, fileNameResult: null, errorText: "Invalid password" };
            }
        }
    });
}

module.exports = AsposePdf;
