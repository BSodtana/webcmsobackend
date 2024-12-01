const pdfService = require("./pdfService");


const pdfController = async (req, res) => {

    const pdfStream = await pdfService.generatePCPPdf()

    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfStream),
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=test.pdf',
    })
        .end(pdfStream);


}

module.exports = {
    pdfController
}