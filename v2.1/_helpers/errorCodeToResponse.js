const accountErrors = require("./error_text/accountError");
const commonErrors = require("./error_text/commonError");
const demoErrors = require('./error_text/demoError');
const projectError = require("./error_text/projectError");
const recruitmentError = require("./error_text/recruitmentError");
const organizationError = require("./error_text/organizationError");
const activityError = require("./error_text/activityError");
const uploadError = require("./error_text/uploadError");
const fileManagerError = require("./error_text/fileManagerError");
const adminManageError = require("./error_text/adminManageError");

const fullErrors = Object.assign(commonErrors, demoErrors, accountErrors, projectError, recruitmentError, organizationError, activityError, uploadError, fileManagerError, adminManageError)



const errorCodeToResponse = (errcode, desc = '', desc2 = '', desc3 = '') => {
    console.log('[Error]', errcode, desc, desc2, desc3);

    return {
        status: "failed",
        payload: { desc, desc2, desc3 },
        description: fullErrors[errcode] || fullErrors['INTERNAL-ERROR']
    }

}

module.exports = {
    errorCodeToResponse
}
