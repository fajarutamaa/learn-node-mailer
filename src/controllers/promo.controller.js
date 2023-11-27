const { PrismaClient } = require('@prisma/client')
const { now } = require('moment')
const { SendPromo } = require('../libs/mailer')

const prisma = new PrismaClient()

const SendPromo = async (req, res) => {

    const { dob } = req.params

    try {

        const checkDob = await prisma.users.findMany({
            where: { dob }
        })

        if (checkDob == new Date(now)) {
            await cron.schedule('15 00 * * *',  function() {
                SendPromo(email)
              })
        }

    } catch (error) {

    }

}