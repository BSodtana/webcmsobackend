const accountErrors = require("./error_text/accountError");
const commonErrors = require("./error_text/commonError");
const demoErrors = require('./error_text/demoError')

const fullErrors = Object.assign(commonErrors, demoErrors, accountErrors)



const errorCodeToResponse = (errcode, desc = '') => {
    console.log('[Error]', errcode, desc);

    return {
        status: "failed",
        payload: {},
        description: fullErrors[errcode] || fullErrors['INTERNAL-ERROR']
    }

}

module.exports = {
    errorCodeToResponse
}
