const { PrismaClient } = require('@prisma/client')
const {Notification} = require('../libs/mailer')


const prisma = new PrismaClient()

async function ActivateAccount(req, res, next) {
    const { id, token, email } = req.params

    try {

        // Check if the decoded token matches the provided token
        if (id !== id) {
            return res.status(400).json({
                message: 'Invalid activation account',
                status: 400,
            })
        }

        // Update the user's is_verified status in the database
        await prisma.users.update({
            where: {
                id: id,
            },
            data: {
                is_verified: true,
            },
        })

        await Notification(email)

        return res.status(200).json({
            message: 'Account activated successfully',
            status: 200,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { ActivateAccount }
