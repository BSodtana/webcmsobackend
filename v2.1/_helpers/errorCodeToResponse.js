const accountErrors = require("./error_text/accountError");
const commonErrors = require("./error_text/commonError");

const fullErrors = Object.assign(commonErrors, accountErrors)



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
