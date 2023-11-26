const { ComparePassword, HashPassword, HashToken } = require('../../helpers/pass.helper')
const { ResponseTemplate } = require('../../helpers/resp.helper')
const { PrismaClient } = require('@prisma/client')
const { UserActivation } = require('../../libs/mailer')

const prisma = new PrismaClient

const jwt = require('jsonwebtoken')

async function Register(req, res, next) {

    const { name, email, password, dob, age, is_verified } = req.body

    const hashPass = await HashPassword(password)

    const payload = {
        name,
        email,
        password: hashPass,
        dob: new Date(dob),
        age: parseInt(age),
        is_verified
    }

    try {

        const checkEmail = await prisma.users.findUnique({
            where: {
                email
            }
        })

        if (checkEmail) {
            return res.status(400).json({
                message: 'email already used',
                status: 400
            })
        }

        const user = await prisma.users.create({
            data: {
                ...payload
            },
        })

        const activationLink = `${req.protocol}://${req.get('host')}/api/v1/activation/${user.id}`

        if (user) {
            if (!user.is_verified) {
                await UserActivation(user.email, activationLink)
            }
        }

        return res.status(200).json({
            message: 'success',
            status: 200
        })

    } catch (error) {
        next(error)
    }
}

async function Login(req, res, next) {
    const { email, password } = req.body

    try {

        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            let response = ResponseTemplate(null, 'bad request', 'invalid email or password', 400)
            res.status(400).json(response)
            return
        }

        if(!user.is_verified){
            let response = ResponseTemplate(null, 'account not verified', 400)
            res.status(400).json(response)
            return
        }

        let checkPassword = await ComparePassword(password, user.password)

        if (!checkPassword) {
            let response = ResponseTemplate(null, 'bad request', 'invalid email or password', 400)
            res.status(400).json(response)
            return
        }

        let token = jwt.sign(user, process.env.JWT_SECRET_KEY)

        return res.status(200).json({
            token: token,
            message: 'success',
            status: 200
        })
    } catch (error) {
        next(error)
    }
}



module.exports = { Register, Login }