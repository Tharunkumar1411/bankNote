const AsposePdf = require('asposepdfnodejs');

async function decryptPDF (){
    const pdf_encrypt_file = './assets/statementPDF/indianBook.pdf';
    await AsposePdf().then(AsposePdfModule => {
        const json = AsposePdfModule.AsposePdfDecrypt(pdf_encrypt_file, "6176667684", "./assets/ResultDecrypt.pdf");
        console.log("AsposePdfDecrypt => %O", json.errorCode == 0 ? json.fileNameResult : json.errorText);
    });
}

module.exports = decryptPDF
