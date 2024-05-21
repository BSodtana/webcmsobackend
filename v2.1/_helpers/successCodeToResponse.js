const accountSuccess = require("./success_text/accountSuccess");
const commonSuccess = require("./success_text/commonSuccess")

const fullSuccess = Object.assign(commonSuccess, accountSuccess)


const successCodeToResponse = (data = {}, successCode, desc = '') => {
    console.log('ss', fullSuccess)
    console.log('[Success]', successCode, desc);
    console.log('desc', fullSuccess[successCode] || fullSuccess['SUCCESS'])

    return {
        status: "success",
        payload: data,
        description: fullSuccess[successCode] || fullSuccess['SUCCESS']
    }

}

module.exports = {
    successCodeToResponse
}
