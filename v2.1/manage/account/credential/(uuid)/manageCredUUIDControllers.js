const { errorCodeToResponse } = require('../../../../_helpers/errorCodeToResponse')
const { successCodeToResponse } = require('../../../../_helpers/successCodeToResponse')

// adminCredentialServices
const manageCredUUIDServices = require('./manageCredUUIDServices')

const adminGetDataFromUUIDController = async (req, res) => {
    try {

        const { uuid: adminUUID, studentID: adminID } = await req?.userData
        const { uuid } = req?.params

        const results = await manageCredUUIDServices.adminGetDataFromUUID(uuid)
        res.status(200).json(successCodeToResponse(results, 'ADMIN-MANAGE-CREDENTIAL-GET-DATA-FROM-UUID-SUCCESS', `admin-${adminUUID}`, results?.studentID))


    } catch (error) {
        console.log('adminGetDataFromUUIDController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'adminGetDataFromUUIDController'))
    }
}

const adminDeleteCredentaialDataFromUUIDController = async (req, res) => {
    try {

        const { uuid: adminUUID, studentID: adminID } = await req?.userData
        const { uuid } = req?.params

        const results = await manageCredUUIDServices.adminDeleteCredentialDataFromUUID(uuid)
        res.status(200).json(successCodeToResponse(results, 'ADMIN-MANAGE-CREDENTIAL-DELETE-DATA-FROM-UUID-SUCCESS', `admin-${adminUUID}`, results))


    } catch (error) {
        console.log('adminDeleteCredentaialDataFromUUIDController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'adminDeleteCredentaialDataFromUUIDController'))
    }
}


module.exports = {
    adminGetDataFromUUIDController,
    adminDeleteCredentaialDataFromUUIDController,
}