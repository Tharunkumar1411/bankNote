
async function decryptPDF (){
    const pdf_encrypt_file = './currentbook.pdf';
    await AsposePdf().then(AsposePdfModule => {
        const json = AsposePdfModule.AsposePdfDecrypt(pdf_encrypt_file, "6176667684", "ResultDecrypt.pdf");
        console.log("AsposePdfDecrypt => %O", json.errorCode == 0 ? json.fileNameResult : json.errorText);
    });
}

module.exports = decryptPDF
