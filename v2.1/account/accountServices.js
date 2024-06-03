const prisma = require('../prisma')

require('dotenv').config()

const helloWorld = async (name) => {

    const data = await prisma.users.update({
        where: {
            studentID: '660710000'
        },
        data: {
            firstNameTH: name
        }
    })
    console.log('data', data)

    return {
        name: name,
        text: `Hello ${name}`,
        data: data
    }

}

module.exports = {
    helloWorld
}