const PDFDocument = require('pdfkit-table');
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

        // docs info
        doc.info['Title'] = `เกียรติบัตรเข้าร่วมกิจกรรม โครงการเตรียมความพร้อมสำหรับการสอบ Timed-Station Examination (TSE) ของกระบวนวิชาระบบโครงกระดูกและกล้ามเนื้อในมนุษย์ สำหรับนักศึกษาแพทย์ชั้นปีที่ 2 มหาวิทยาลัยเชียงใหม่ ประจำปีการศึกษา 1/2567 (Pre-TSE 2567)`;
        doc.info['Author'] = `CMSO ONLINE`;
        doc.info['Subject'] = `กมุทพร อยู่บ้านแพ้ว รัตนโกมล`;
        doc.info['Keywords '] = `Pre-TSE 2567`;
        doc.info['ModDate'] = new Date(); // date of making cert

        // set default text & bg thing
        doc.font(Regular)
        doc.image(`${__dirname}/asset/background/TP_CLEAN_PCP_TH.png`)


        // start text
        doc.font(Bold).fontSize(185).fillColor('#1c3a4f').text(' ', doc.x + 485, doc.y, defaultMargin);

        doc.font(Bold).fontSize(60).text('คณะแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่', defaultMargin);

        doc.font(Bold).fontSize(60).text(' ', defaultMargin);

        doc.font(Regular).fontSize(40).text('ขอมอบเกียรติบัตรให้แก่', defaultMargin);

        doc.font(Bold).fontSize(80).text(' ', defaultMargin);

        doc.font(Bold).fontSize(85).fillColor('#349288').text('กมุทพร อยู่บ้านแพ้ว รัตนโกมล', defaultMargin);

        doc.font(Bold).fontSize(10).text(' ', defaultMargin);

        doc.font(Regular).fontSize(37).fillColor('#1c3a4f').text('ได้เข้าร่วมโค (Pre-TSE 2567)', {
            ...defaultMargin,
        });
        doc.font(Regular).fontSize(37).text('เมื่อวันที่ 16 กรกฎาคม พ.ศ. 2567', defaultMargin);



        doc.fontSize(37).text('ให้ไว้ ณ วันที่ 20 เดือน กันยายน พ.ศ.2567', doc.x, 1010, defaultMargin);



        const init_pad = 157.5
        const line_length = 350
        const spacing = 45

        // const pad2 = init_pad + line_length + spacing
        // const pad3 = pad2 + line_length + spacing

        // doc.moveTo(doc.x + init_pad, doc.y).lineCap('round').lineWidth(3).fillColor('#a6a6a6').lineTo(doc.x + init_pad + line_length, doc.y).stroke();
        // doc.moveTo(doc.x + pad2, doc.y).lineCap('round').lineWidth(3).fillColor('#a6a6a6').lineTo(doc.x + pad2 + line_length, doc.y).stroke();
        // doc.moveTo(doc.x + pad3, doc.y).lineCap('round').lineWidth(3).fillColor('#a6a6a6').lineTo(doc.x + pad3 + line_length, doc.y).stroke();

        // doc.rect(doc.x + 110, doc.y + 10, 1300, 100).stroke();

        // const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;';

        // doc.font(Bold).fontSize(25).text(lorem, doc.x + 110, doc.y + 25, {
        //     columns: 3,
        //     columnGap: 10,
        //     height: 150,
        //     width: 1300,
        //     align: 'center'
        // });

        const commonHeaderStyle = {
            align: 'center',
            headerColor: "#ffffff",
            headerOpacity: 0,
            width: 400
        }

        const table = {
            headers: [
                { label: `นศพ. ชื่อ สกุล`, property: 'ownerName', ...commonHeaderStyle },
                { label: "ผศ.พญ. จีระนันท์ คุณาชีวะ", property: 'advisorName', ...commonHeaderStyle },
                { label: "นศพ. พิมพ์ลักษณ์ ชัยจิตติประเสริฐ", property: 'cmsoHeadName', ...commonHeaderStyle },
            ],
            rows: [
                ["ประธานโครงการ", "ผู้ช่วยคณบดีคณะแพทยศาสตร์", "นายกสโมสรนักศึกษาคณะแพทยศาสตร์ ประจำปีการศึกษา 2567"],
            ],
        };

        await doc.table(table, {
            width: 1200,
            x: doc.x + init_pad,
            y: 1270,
            columnSpacing: 1,
            divider: {
                header: { disabled: true },
                horizontal: { disabled: true },
            },
            prepareHeader: () => doc.font(Bold).fontSize(25),
            prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => doc.font(Regular).fontSize(20),
        });

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