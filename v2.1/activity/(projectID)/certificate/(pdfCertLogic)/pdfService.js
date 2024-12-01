const PDFDocument = require('pdfkit');
const fs = require('fs');
const getStream = require('get-stream');

const Regular = `${__dirname}/asset/font/Prompt-Regular.ttf`
const Bold = `${__dirname}/asset/font/Prompt-Bold.ttf`
const Thin = `${__dirname}/asset/font/Prompt-Thin.ttf`
const defaultMargin = {
    align: 'center'
}

const generatePCPPdf = async () => {
    try {

        const doc = new PDFDocument({
            size: [2000, 1414],
            margin: 0
        });

        // set all thing
        doc.font(Regular)
        doc.image(`${__dirname}/asset/background/TP_PCP_TH.png`)


        doc.font(Bold).fontSize(185).fillColor('#1c3a4f').text(' ', doc.x + 485, doc.y, defaultMargin);

        doc.font(Bold).fontSize(60).text('คณะแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่', defaultMargin);

        doc.font(Bold).fontSize(60).text(' ', defaultMargin);

        doc.font(Regular).fontSize(40).text('ขอมอบเกียรติบัตรให้แก่', defaultMargin);

        doc.font(Bold).fontSize(80).text(' ', defaultMargin);

        doc.font(Bold).fontSize(85).fillColor('#349288').text('ณ ภัทร เสาโกมุท', defaultMargin);

        doc.font(Bold).fontSize(10).text(' ', defaultMargin);

        doc.font(Regular).fontSize(37).fillColor('#1c3a4f').text('ได้เข้าร่วมโครงการเตรียมความพร้อมสำหรับการสอบ Timed-Station Examination (TSE) ของกระบวนวิชาระบบโครงกระดูกและกล้ามเนื้อในมนุษย์ สำหรับนักศึกษาแพทย์ชั้นปีที่ 2 มหาวิทยาลัยเชียงใหม่ ประจำปีการศึกษา 1/2567 (Pre-TSE 2567)', {
            ...defaultMargin,
        });
        doc.font(Regular).fontSize(37).text('เมื่อวันที่ 16 กรกฎาคม พ.ศ. 2567', defaultMargin);

        doc.moveDown();

        doc.font(Regular).fontSize(37).text('ให้ไว้ ณ วันที่ 20 เดือน กันยายน พ.ศ.2567', defaultMargin);

        doc.moveDown();
        doc.moveDown();






        // const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;';

        // doc.text(lorem).widthOfString(100);


        // doc.fontSize(25).text('นศพ. ประธาน จริงใจ');
        // doc.fontSize(25).text('ประธานโครงการ');


        doc.end();

        const pdfStream = await getStream.buffer(doc);

        return pdfStream;

    } catch (error) {

        console.log('error', error);

        return null;
    }
}

module.exports = {
    generatePCPPdf
}