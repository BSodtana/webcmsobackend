const accountSuccess = require("./success_text/accountSuccess");
const commonSuccess = require("./success_text/commonSuccess");
const demoSuccess = require("./success_text/demoSuccess");
const projectSuccess = require("./success_text/projectSuccess");

const fullSuccess = Object.assign(commonSuccess, demoSuccess, accountSuccess, projectSuccess)


const successCodeToResponse = (data = {}, successCode, desc = '') => {
    console.log('[Success]', successCode, desc);

    return {
        status: "success",
        payload: data,
        description: fullSuccess[successCode] || fullSuccess['SUCCESS']
    }

}

module.exports = {
    successCodeToResponse
}
