require('dotenv').config()

const helloWorld = (name) => {

    if (name === 'admin') {
        throw { code: 'INTERNAL-ERROR', desc: "name admin not allowed" }
    }

    return {
        name: name,
        text: `Hello ${name}`
    }

}

module.exports = {
    helloWorld
}