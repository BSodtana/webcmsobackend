const pdfService = require("./pdfService");


const pdfPCPController = async (req, res) => {

    const pdfStream = await pdfService.generatePCPPdf()

    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfStream),
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=Certificate.pdf',
    }).end(pdfStream);


}

const pdfSTFController = async (req, res) => {

    const pdfStream = await pdfService.generateSTFPdf()

    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfStream),
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=Certificate.pdf',
    }).end(pdfStream);


}

module.exports = {
    pdfPCPController,
    pdfSTFController
}