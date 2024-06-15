const { errorCodeToResponse } = require("../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../_helpers/successCodeToResponse")
const accountServices = require("./accountServices")

const helloWorldController = async (req, res) => {
    try {

        const { name } = req.body
        console.log('asdasd', name)

        // if (!name) {
        //     res.status(400).json(errorCodeToResponse('HELLOWORLD-ERROR-NONAME', 'ADMIN Test'))
        // } else {
        // }

        const results = await accountServices.helloWorld(name)
        res.status(200).json(successCodeToResponse(results, 'HELLOWORLD-SUCCESS', 'ADMIN test'))


    } catch (error) {
        console.log('aa', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'helloWorldController'))
    }
}

module.exports = {
    helloWorldController
}