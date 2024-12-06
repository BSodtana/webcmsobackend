const { errorCodeToResponse } = require("../../../../_helpers/errorCodeToResponse");
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

        // if PCP -> gen PCP
        if (search.certUserType === 'PCP') {
            const pdfStream = await pdfService.generatePCPPdf(
                `${allData.userData.firstNameTH} ${allData.userData.lastNameTH}`,
                `${allData.projectData.projectNameTH}`,
                `${allData.projectData.projectNickNameTH}`,
                allData.projectData.eventDateStart,
                allData.certCommonData.certPCPCreatedDate,
                `${allData.projectData.users.firstNameTH} ${allData.projectData.users.lastNameTH}`,
                `${allData.certCommonData.teacherNameSignatureTH}`,
                `${allData.certCommonData.teacherPositionSignatureTH}`
            )

            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(pdfStream),
                'Content-Type': 'application/pdf',
                'Content-disposition': `attachment;filename=Certificate-PCP-${search.certificateID}.pdf`,
            }).end(pdfStream);

        } else {
            const pdfStream = await pdfService.generateSTFPdf(
                `${allData.userData.firstNameTH} ${allData.userData.lastNameTH}`,
                `${allData.STFpositionDetail?.positionData?.positionName}`,
                `${allData.projectData.projectNameTH}`,
                `${allData.projectData.projectNickNameTH}`,
                allData.projectData.eventDateStart,
                allData.certCommonData.certPCPCreatedDate,
                `${allData.projectData.users.firstNameTH} ${allData.projectData.users.lastNameTH}`,
                `${allData.certCommonData.teacherNameSignatureTH}`,
                `${allData.certCommonData.teacherPositionSignatureTH}`
            )

            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(pdfStream),
                'Content-Type': 'application/pdf',
                'Content-disposition': `attachment;filename=Certificate-STF-${search.certificateID}.pdf`,
            }).end(pdfStream);
        }



    } catch (error) {
        console.log('downloadCertCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'downloadCertCon'))
    }
}


module.exports = {
    // pdfPCPController,
    // pdfSTFController,
    downloadCertCon
}