const accountErrors = require("./error_text/accountError");
const commonErrors = require("./error_text/commonError");
const demoErrors = require('./error_text/demoError');
const projectError = require("./error_text/projectError");
const recruitmentError = require("./error_text/recruitmentError");
const organizationError = require("./error_text/organizationError");

const fullErrors = Object.assign(commonErrors, demoErrors, accountErrors, projectError, recruitmentError, organizationError)



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
