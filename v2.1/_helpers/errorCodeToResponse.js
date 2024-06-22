const accountErrors = require("./error_text/accountError");
const commonErrors = require("./error_text/commonError");
const demoErrors = require('./error_text/demoError');
const projectError = require("./error_text/projectError");

const fullErrors = Object.assign(commonErrors, demoErrors, accountErrors, projectError)



const errorCodeToResponse = (errcode, desc = '', desc2 = '') => {
    console.log('[Error]', errcode, desc, desc2);

    return {
        status: "failed",
        payload: {},
        description: fullErrors[errcode] || fullErrors['INTERNAL-ERROR']
    }

}

module.exports = {
    errorCodeToResponse
}
