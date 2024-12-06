const PDFDocument = require('pdfkit-table');
const fs = require('fs');
const getStream = require('get-stream');
const { formatThaiDate } = require('../../../../_helpers/formatDate');

const Regular = `${__dirname}/asset/font/Prompt-Regular.ttf`
const Bold = `${__dirname}/asset/font/Prompt-Bold.ttf`
const Thin = `${__dirname}/asset/font/Prompt-Thin.ttf`
const defaultMargin = {
    align: 'center'
}

const generatePCPPdf = async (userFullName, projectName, projectNickname, activityDate, certDate, projectOwnerFullName, advisorName, advisorTitle) => {
    try {

        const doc = new PDFDocument({
            size: [2000, 1414],
            margin: 0
        });

        // docs info
        doc.info['Title'] = `เกียรติบัตรเข้าร่วมกิจกรรม ${projectNickname || projectName}`;
        doc.info['Author'] = `CMSO ONLINE`;
        doc.info['Subject'] = `${userFullName}`;
        doc.info['Keywords '] = `${projectNickname || projectName}`;
        doc.info['ModDate'] = new Date(certDate); // date of making cert

        // set default text & bg thing
        doc.font(Regular)
        doc.image(`${__dirname}/asset/background/TP_CLEAN_PCP_TH.png`)

        // date text
        const activityStringDate = formatThaiDate(activityDate)
        const certStringDate = formatThaiDate(certDate)

        // start text
        doc.font(Bold).fontSize(185).fillColor('#1c3a4f').text(' ', doc.x + 485, doc.y, defaultMargin);

        doc.font(Bold).fontSize(60).text('คณะแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่', defaultMargin);

        doc.font(Bold).fontSize(60).text(' ', defaultMargin);

        doc.font(Regular).fontSize(40).text('ขอมอบเกียรติบัตรให้แก่', defaultMargin);

        doc.font(Bold).fontSize(80).text(' ', defaultMargin);

        doc.font(Bold).fontSize(85).fillColor('#349288').text(`${userFullName}`, defaultMargin);

        doc.font(Bold).fontSize(10).text(' ', defaultMargin);

        doc.font(Regular).fontSize(35).fillColor('#1c3a4f').text(`ได้เข้าร่วม${projectNickname || projectName}`, defaultMargin);
        doc.font(Regular).fontSize(35).text(`เมื่อวันที่ ${activityStringDate}`, defaultMargin);

        doc.fontSize(37).text(`ให้ไว้ ณ วันที่ ${certStringDate}`, doc.x, 1010, defaultMargin);

        // spacing below
        const init_pad = 157.5
        const line_length = 350
        const spacing = 45
        const pad2 = init_pad + line_length + spacing
        const pad3 = pad2 + line_length + spacing

        // sign image
        const image_width = 400
        const image_height = 100
        // doc.lineWidth(2).rect(doc.x + init_pad + 6.5, 1100, image_width, image_height).stroke();
        // doc.lineWidth(2).rect(doc.x + init_pad + 6.5 + 400, 1100, image_width, image_height).stroke();
        // doc.lineWidth(2).rect(doc.x + init_pad + 6.5 + 800, 1100, image_width, image_height).stroke();

        // real image
        const SIGN_OWNER = `${__dirname}/asset/placeholder/SIGNED_OWNER.png`
        const SIGN_ADVISOR = `${__dirname}/asset/placeholder/SIGNED_ADVISOR.png`
        const SIGN_CMSOHEAD = `${__dirname}/asset/placeholder/SIGNED_CMSOHEAD.png`
        // Fit the image in the dimensions, and center it both horizontally and vertically
        doc.image(SIGN_OWNER, doc.x + init_pad, 1145, { fit: [image_width, image_height], align: 'center', valign: 'center' })
        doc.image(SIGN_ADVISOR, doc.x + init_pad + 400, 1145, { fit: [image_width, image_height], align: 'center', valign: 'center' })
        doc.image(SIGN_CMSOHEAD, doc.x + init_pad + 800, 1145, { fit: [image_width, image_height], align: 'center', valign: 'center' })

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

        // name of signed ppl
        const PROJECT_OWNER = `นศพ. ${projectOwnerFullName}`.replace(' ', ' ')
        const PROJECT_ADVISOR = `${advisorName}`.replace(' ', ' ')
        const PROJECT_ADVISOR_TITLE = `${advisorTitle}`
        const PROJECT_CMSO_HEAD = `นศพ. พิมพ์ลักษณ์ ชัยจิตติประเสริฐ`.replace(' ', ' ')


        const commonHeaderStyle = {
            align: 'center',
            headerColor: "#ffffff",
            headerOpacity: 0,
            width: 400
        }

        const table = {
            headers: [
                { label: PROJECT_OWNER, property: 'ownerName', ...commonHeaderStyle },
                { label: PROJECT_ADVISOR, property: 'advisorName', ...commonHeaderStyle },
                { label: PROJECT_CMSO_HEAD, property: 'cmsoHeadName', ...commonHeaderStyle },
            ],
            rows: [
                ["ประธานโครงการ", PROJECT_ADVISOR_TITLE, "นายกสโมสรนักศึกษาคณะแพทยศาสตร์ ประจำปีการศึกษา 2567"],
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

        throw {
            code: 'GENERATE-CERTIFICATE-FAILED-INTERNAL-ERROR',
            desc: { userData: { error } },
        }

    }
}

const generateSTFPdf = async (userFullName, userPosition, projectName, projectNickname, activityDate, certDate, projectOwnerFullName, advisorName, advisorTitle) => {
    try {

        const doc = new PDFDocument({
            size: [2000, 1414],
            margin: 0
        });

        // docs info
        doc.info['Title'] = `เกียรติบัตรเข้าร่วมกิจกรรม ${projectNickname || projectName}`;
        doc.info['Author'] = `CMSO ONLINE`;
        doc.info['Subject'] = `${userFullName}`;
        doc.info['Keywords '] = `${projectNickname || projectName}`;
        doc.info['ModDate'] = new Date(certDate); // date of making cert

        // set default text & bg thing
        doc.font(Regular)
        doc.image(`${__dirname}/asset/background/TP_CLEAN_STF_TH.png`)

        // date text
        const activityStringDate = formatThaiDate(activityDate)
        const certStringDate = formatThaiDate(certDate)


        // start text
        doc.font(Bold).fontSize(305).fillColor('#ffffff').text(' ', defaultMargin);

        doc.font(Bold).fontSize(50).text('คณะแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่', defaultMargin);

        doc.font(Bold).fontSize(56).text(' ', defaultMargin);

        doc.font(Regular).fontSize(40).fillColor('#1c3a4f').text('ขอมอบเกียรติบัตรให้แก่', defaultMargin);

        doc.font(Bold).fontSize(30).text(' ', defaultMargin);

        doc.font(Bold).fontSize(85).fillColor('#5e17eb').text(`${userFullName}`, defaultMargin);

        doc.font(Bold).fontSize(14).text(' ', defaultMargin);

        doc.font(Regular).fontSize(31).fillColor('#1c3a4f').text(`ได้เข้าร่วมเป็นคณะกรรมการดำเนินงาน ตำแหน่ง ${userPosition}`, defaultMargin);

        const maxWidth = 1850
        doc.font(Regular).fontSize(31).fillColor('#1c3a4f').text(`${projectName}`, ((2000 - maxWidth) / 2), doc.y, {
            width: maxWidth,
            ...defaultMargin,
        });

        doc.font(Regular).fontSize(31).text(`เมื่อวันที่ ${activityStringDate}`, 0, doc.y, defaultMargin);

        doc.fontSize(31).text(`ให้ไว้ ณ วันที่ ${certStringDate}`, doc.x, 1080, defaultMargin);

        // spacing below
        const init_pad = 400
        const line_length = 350
        const spacing = 45
        const pad2 = init_pad + line_length + spacing
        const pad3 = pad2 + line_length + spacing

        // sign image
        const image_width = 400
        const image_height = 100
        // doc.lineWidth(2).rect(doc.x + init_pad, 1150, image_width, image_height).stroke();
        // doc.lineWidth(2).rect(doc.x + init_pad + 400, 1150, image_width, image_height).stroke();
        // doc.lineWidth(2).rect(doc.x + init_pad + 800, 1150, image_width, image_height).stroke();

        // real image
        const SIGN_OWNER = `${__dirname}/asset/placeholder/SIGNED_OWNER.png`
        const SIGN_ADVISOR = `${__dirname}/asset/placeholder/SIGNED_ADVISOR.png`
        const SIGN_CMSOHEAD = `${__dirname}/asset/placeholder/SIGNED_CMSOHEAD.png`
        // Fit the image in the dimensions, and center it both horizontally and vertically
        doc.image(SIGN_OWNER, doc.x + init_pad, 1150, { fit: [image_width, image_height], align: 'center', valign: 'center' })
        doc.image(SIGN_ADVISOR, doc.x + init_pad + 400, 1150, { fit: [image_width, image_height], align: 'center', valign: 'center' })
        doc.image(SIGN_CMSOHEAD, doc.x + init_pad + 800, 1150, { fit: [image_width, image_height], align: 'center', valign: 'center' })

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

        // name of signed ppl
        const PROJECT_OWNER = `นศพ. ${projectOwnerFullName}`.replace(' ', ' ')
        const PROJECT_ADVISOR = `${advisorName}`.replace(' ', ' ')
        const PROJECT_ADVISOR_TITLE = `${advisorTitle}`
        const PROJECT_CMSO_HEAD = `นศพ. พิมพ์ลักษณ์ ชัยจิตติประเสริฐ`.replace(' ', ' ')


        const commonHeaderStyle = {
            align: 'center',
            headerColor: "#ffffff",
            headerOpacity: 0,
            width: 400
        }

        const table = {
            headers: [
                { label: PROJECT_OWNER, property: 'ownerName', ...commonHeaderStyle },
                { label: PROJECT_ADVISOR, property: 'advisorName', ...commonHeaderStyle },
                { label: PROJECT_CMSO_HEAD, property: 'cmsoHeadName', ...commonHeaderStyle },
            ],
            rows: [
                ["ประธานโครงการ", PROJECT_ADVISOR_TITLE, "นายกสโมสรนักศึกษาคณะแพทยศาสตร์ ประจำปีการศึกษา 2567"],
            ],
        };

        await doc.table(table, {
            width: 1200,
            x: doc.x + init_pad,
            y: 1270,
            columnSpacing: 0,
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

        throw {
            code: 'GENERATE-CERTIFICATE-FAILED-INTERNAL-ERROR',
            desc: { userData: { error } },
        }
    }
}


module.exports = {
    generatePCPPdf,
    generateSTFPdf
}