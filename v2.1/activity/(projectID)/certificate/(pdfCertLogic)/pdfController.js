const { errorCodeToResponse } = require("../../../../_helpers/errorCodeToResponse");
const { successCodeToResponse } = require("../../../../_helpers/successCodeToResponse");
const { searchCertificateByProjectIDStudentID, getInfoFromCertNo } = require("../activityCertServices");
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


const downloadCertCon = async (req, res) => {
    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData
        const { projectID } = req.params

        // to download, user need to have certID
        const search = await searchCertificateByProjectIDStudentID(projectID, studentID)
        const allData = await getInfoFromCertNo(search.certificateID)

        // switch 'PCP_2024_TH', 'PCP_2024_EN', 'STF_2024_TH', 'STF_2024_EN', 'CMSO_2024_TH',
        //  'PCP_2025_TH', 'PCP_2025_EN', 'STF_2025_TH', 'STF_2025_EN'

        let pdfStream
        console.log('search.certUserType', search.certUserType);


        switch (search.certUserType) {
            case 'PCP_2024_TH':
                pdfStream = await pdfService.generatePCPPdf(
                    `${allData.userData.firstNameTH} ${allData.userData.lastNameTH}`,
                    `${allData.projectData.projectNameTH}`,
                    `${allData.projectData.projectNickNameTH}`,
                    allData.projectData.eventDateStart,
                    allData.certCommonData.certPCPCreatedDate,

                    `${allData.projectData.users.firstNameTH} ${allData.projectData.users.lastNameTH}`,
                    `${allData.certCommonData.projectOwnerSignatureFileID}`,

                    `${allData.certCommonData.teacherNameSignatureTH}`,
                    `${allData.certCommonData.teacherPositionSignatureTH}`,
                    `${allData.certCommonData.teacherSignatureFileID}`,

                    presidentFullName = 'พิมพ์ลักษณ์ ชัยจิตติประเสริฐ',
                    presidentAcademicYear = '2567',
                    // todo: for dev
                    presidentSignatureFileID = 'qKJuVKTH9UPkTlfX'
                )

                successCodeToResponse('CERTIFICATE PCP 2024', 'CERTIFICATE-GENERATE-SUCCESS', allData.userData.studentID, allData.projectData.projectID, 'CERTIFICATE PCP 2024')


                res.writeHead(200, {
                    'Content-Length': Buffer.byteLength(pdfStream),
                    'Content-Type': 'application/pdf',
                    'Content-disposition': `attachment;filename=Certificate-PCP-${search.certificateID}.pdf`,
                }).end(pdfStream);


                break;
            case 'STF_2024_TH':
                pdfStream = await pdfService.generateSTFPdf(
                    `${allData.userData.firstNameTH} ${allData.userData.lastNameTH}`,
                    `${allData.STFpositionDetail?.positionData?.positionName}`,

                    `${allData.projectData.projectNameTH}`,
                    `${allData.projectData.projectNickNameTH}`,
                    allData.projectData.eventDateStart,
                    allData.certCommonData.certPCPCreatedDate,

                    `${allData.projectData.users.firstNameTH} ${allData.projectData.users.lastNameTH}`,
                    projectOwnerSignatureFileID = null,

                    `${allData.certCommonData.teacherNameSignatureTH}`,
                    `${allData.certCommonData.teacherPositionSignatureTH}`,
                    advisorNameSignatureFileID = null,

                    presidentFullName = 'พิมพ์ลักษณ์ ชัยจิตติประเสริฐ',
                    presidentAcademicYear = '2567',
                    presidentSignatureFileID = 'qKJuVKTH9UPkTlfX'
                )

                successCodeToResponse('CERTIFICATE STAFF', 'CERTIFICATE-GENERATE-SUCCESS', allData.userData.studentID, allData.projectData.projectID, 'CERTIFICATE STAFF')

                res.writeHead(200, {
                    'Content-Length': Buffer.byteLength(pdfStream),
                    'Content-Type': 'application/pdf',
                    'Content-disposition': `attachment;filename=Certificate-STF-${search.certificateID}.pdf`,
                }).end(pdfStream);


                break;
            // backward compat
            case 'PCP':
                pdfStream = await pdfService.generatePCPPdf(
                    `${allData.userData.firstNameTH} ${allData.userData.lastNameTH}`,
                    `${allData.projectData.projectNameTH}`,
                    `${allData.projectData.projectNickNameTH}`,
                    allData.projectData.eventDateStart,
                    allData.certCommonData.certPCPCreatedDate,

                    `${allData.projectData.users.firstNameTH} ${allData.projectData.users.lastNameTH}`,
                    `${allData.certCommonData.projectOwnerSignatureFileID}`,

                    `${allData.certCommonData.teacherNameSignatureTH}`,
                    `${allData.certCommonData.teacherPositionSignatureTH}`,
                    `${allData.certCommonData.teacherSignatureFileID}`,

                    presidentFullName = 'พิมพ์ลักษณ์ ชัยจิตติประเสริฐ',
                    presidentAcademicYear = '2567',
                    // todo: for dev
                    presidentSignatureFileID = 'qKJuVKTH9UPkTlfX'
                )

                successCodeToResponse('CERTIFICATE PCP 2024', 'CERTIFICATE-GENERATE-SUCCESS', allData.userData.studentID, allData.projectData.projectID, 'CERTIFICATE PCP 2024')


                res.writeHead(200, {
                    'Content-Length': Buffer.byteLength(pdfStream),
                    'Content-Type': 'application/pdf',
                    'Content-disposition': `attachment;filename=Certificate-PCP-${search.certificateID}.pdf`,
                }).end(pdfStream);


                break;
            // backward compat
            case 'STF':
                pdfStream = await pdfService.generateSTFPdf(
                    `${allData.userData.firstNameTH} ${allData.userData.lastNameTH}`,
                    `${allData.STFpositionDetail?.positionData?.positionName}`,

                    `${allData.projectData.projectNameTH}`,
                    `${allData.projectData.projectNickNameTH}`,
                    allData.projectData.eventDateStart,
                    allData.certCommonData.certPCPCreatedDate,

                    `${allData.projectData.users.firstNameTH} ${allData.projectData.users.lastNameTH}`,
                    `${allData.certCommonData.projectOwnerSignatureFileID}`,

                    `${allData.certCommonData.teacherNameSignatureTH}`,
                    `${allData.certCommonData.teacherPositionSignatureTH}`,
                    `${allData.certCommonData.teacherSignatureFileID}`,

                    presidentFullName = 'พิมพ์ลักษณ์ ชัยจิตติประเสริฐ',
                    presidentAcademicYear = '2567',
                    // todo: for dev
                    presidentSignatureFileID = 'qKJuVKTH9UPkTlfX'
                )

                successCodeToResponse('CERTIFICATE STAFF', 'CERTIFICATE-GENERATE-SUCCESS', allData.userData.studentID, allData.projectData.projectID, 'CERTIFICATE STAFF')

                res.writeHead(200, {
                    'Content-Length': Buffer.byteLength(pdfStream),
                    'Content-Type': 'application/pdf',
                    'Content-disposition': `attachment;filename=Certificate-STF-${search.certificateID}.pdf`,
                }).end(pdfStream);


                break;
            // backward compat
            case 'PCP_TH':
                pdfStream = await pdfService.generatePCPPdf(
                    `${allData.userData.firstNameTH} ${allData.userData.lastNameTH}`,
                    `${allData.projectData.projectNameTH}`,
                    `${allData.projectData.projectNickNameTH}`,
                    allData.projectData.eventDateStart,
                    allData.certCommonData.certPCPCreatedDate,

                    `${allData.projectData.users.firstNameTH} ${allData.projectData.users.lastNameTH}`,
                    `${allData.certCommonData.projectOwnerSignatureFileID}`,

                    `${allData.certCommonData.teacherNameSignatureTH}`,
                    `${allData.certCommonData.teacherPositionSignatureTH}`,
                    `${allData.certCommonData.teacherSignatureFileID}`,

                    presidentFullName = 'พิมพ์ลักษณ์ ชัยจิตติประเสริฐ',
                    presidentAcademicYear = '2567',
                    // todo: for dev
                    presidentSignatureFileID = 'qKJuVKTH9UPkTlfX'
                )

                successCodeToResponse('CERTIFICATE PCP 2024', 'CERTIFICATE-GENERATE-SUCCESS', allData.userData.studentID, allData.projectData.projectID, 'CERTIFICATE PCP 2024')


                res.writeHead(200, {
                    'Content-Length': Buffer.byteLength(pdfStream),
                    'Content-Type': 'application/pdf',
                    'Content-disposition': `attachment;filename=Certificate-PCP-${search.certificateID}.pdf`,
                }).end(pdfStream);


                break;
            // backward compat
            case 'STF_TH':
                pdfStream = await pdfService.generateSTFPdf(
                    `${allData.userData.firstNameTH} ${allData.userData.lastNameTH}`,
                    `${allData.STFpositionDetail?.positionData?.positionName}`,

                    `${allData.projectData.projectNameTH}`,
                    `${allData.projectData.projectNickNameTH}`,
                    allData.projectData.eventDateStart,
                    allData.certCommonData.certPCPCreatedDate,

                    `${allData.projectData.users.firstNameTH} ${allData.projectData.users.lastNameTH}`,
                    `${allData.certCommonData.projectOwnerSignatureFileID}`,

                    `${allData.certCommonData.teacherNameSignatureTH}`,
                    `${allData.certCommonData.teacherPositionSignatureTH}`,
                    `${allData.certCommonData.teacherSignatureFileID}`,

                    presidentFullName = 'พิมพ์ลักษณ์ ชัยจิตติประเสริฐ',
                    presidentAcademicYear = '2567',
                    // todo: for dev
                    presidentSignatureFileID = 'qKJuVKTH9UPkTlfX'
                )

                successCodeToResponse('CERTIFICATE STAFF', 'CERTIFICATE-GENERATE-SUCCESS', allData.userData.studentID, allData.projectData.projectID, 'CERTIFICATE STAFF')

                res.writeHead(200, {
                    'Content-Length': Buffer.byteLength(pdfStream),
                    'Content-Type': 'application/pdf',
                    'Content-disposition': `attachment;filename=Certificate-STF-${search.certificateID}.pdf`,
                }).end(pdfStream);


                break;

            case 'CMSO_2024_TH':
                pdfStream = await pdfService.generateCMSO2024Pdf(
                    `${allData.userData.firstNameTH} ${allData.userData.lastNameTH}`,
                    `${allData.STFpositionDetail?.positionData?.positionName}`,

                    `${allData.projectData.projectNameTH}`,
                    `${allData.projectData.projectNickNameTH}`,
                    allData.projectData.eventDateStart,
                    allData.certCommonData.certPCPCreatedDate,

                    projectOwnerFullName = '',
                    projectOwnerSignatureFileID = null,

                    advisorName = '',
                    advisorTitle = '',
                    advisorNameSignatureFileID = null,

                    presidentFullName = 'วิริทธิ์พล ดวงจันทร์',
                    presidentAcademicYear = '2568',
                    presidentSignatureFileID = 'qKJuVKTH9UPkTlfX')

                successCodeToResponse('CERTIFICATE CMSO2024', 'CERTIFICATE-GENERATE-SUCCESS', allData.userData.studentID, allData.projectData.projectID, 'CERTIFICATE CMSO2024')


                res.writeHead(200, {
                    'Content-Length': Buffer.byteLength(pdfStream),
                    'Content-Type': 'application/pdf',
                    'Content-disposition': `attachment;filename=Certificate-PCP-${search.certificateID}.pdf`,
                }).end(pdfStream);


                break;

            case 'PCP_2025_TH':
                pdfStream = await pdfService.generatePCP2025THPdf(
                    `${allData.userData.firstNameTH} ${allData.userData.lastNameTH}`,
                    `${allData.projectData.projectNameTH}`,
                    `${allData.projectData.projectNickNameTH}`,
                    allData.projectData.eventDateStart,
                    allData.certCommonData.certPCPCreatedDate,

                    `${allData.projectData.users.firstNameTH} ${allData.projectData.users.lastNameTH}`,
                    `${allData.certCommonData.projectOwnerSignatureFileID}`,

                    `${allData.certCommonData.teacherNameSignatureTH}`,
                    `${allData.certCommonData.teacherPositionSignatureTH}`,
                    `${allData.certCommonData.teacherSignatureFileID}`,

                    presidentFullName = 'วิริทธิ์พล ดวงจันทร์',
                    presidentAcademicYear = '2568',
                    presidentSignatureFileID = 'qKJuVKTH9UPkTlfX'
                )

                successCodeToResponse('CERTIFICATE PCP 2025', 'CERTIFICATE-GENERATE-SUCCESS', allData.userData.studentID, allData.projectData.projectID, 'CERTIFICATE PCP 2025')


                res.writeHead(200, {
                    'Content-Length': Buffer.byteLength(pdfStream),
                    'Content-Type': 'application/pdf',
                    'Content-disposition': `attachment;filename=Certificate-PCP-2025-${search.certificateID}.pdf`,
                }).end(pdfStream);

                break;

            case 'STF_2025_TH':

                break;

            default:
                break;
        }



    } catch (error) {
        console.log('downloadCertCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'downloadCertCon'))
    }
}

const downloadCertConTest = async (req, res) => {
    try {

        // const { studentID = 'NO-STD-ID' } = await req?.userData
        // const { projectID } = req.params

        // to download, user need to have certID
        // const search = await searchCertificateByProjectIDStudentID(projectID, studentID)
        // const allData = await getInfoFromCertNo(search.certificateID)
        const dateNow = new Date()

        //     `${allData.userData.firstNameTH} ${allData.userData.lastNameTH}`,
        // `${allData.projectData.projectNameTH}`,
        //     `${allData.projectData.projectNickNameTH}`,
        //     allData.projectData.eventDateStart,
        //     allData.certCommonData.certPCPCreatedDate,
        //     `${allData.projectData.users.firstNameTH} ${allData.projectData.users.lastNameTH}`,
        //     `${allData.certCommonData.teacherNameSignatureTH}`,
        //     `${allData.certCommonData.teacherPositionSignatureTH}`

        const pdfStream = await pdfService.generatePCPPdfTest(
            `อันนา จุลกทัพพะ วทัญญุตา`,
            `โครงการเตรียมความพร้อมสำหรับการสอบ Timed-Station Examination (TSE) ของกระบวนวิชาระบบโครงกระดูกและกล้ามเนือในมนุษย์ สำาหรับนักศึกษาแพทย์ชันปีที 2 มหาวิทยาลัยเชียงใหม่ ประจำาปีการศึกษา 1/2567 (Pre-TSE 2567)`,
            `Pre-TSE 2567`,
            dateNow,
            dateNow,
            `กมุทพร อยู่บ้านแพว รัตนโกมล`,
            `จีระนันท์ คุณาชีวะ`,
            `จีระนันท์ คุณาชีวะ`
        )

        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(pdfStream),
            'Content-Type': 'application/pdf',
            'Content-disposition': `attachment;filename=Certificate-PCP-TEST-CERT.pdf`,
        }).end(pdfStream);


    } catch (error) {
        console.log('downloadCertConTest', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'downloadCertConTest'))
    }
}


module.exports = {
    // pdfPCPController,
    // pdfSTFController,
    downloadCertCon,
    downloadCertConTest
}