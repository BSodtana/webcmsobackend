const { rateLimit } = require("express-rate-limit")
const { errorCodeToResponse } = require("../_helpers/errorCodeToResponse")

const rateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    limit: 4, // Limit each IP to 4 requests per `window` (here, per 1 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    message: async (req, res) => {
        return errorCodeToResponse("RATE-LIMITED", "server")
    }
})

module.exports = { rateLimiter }