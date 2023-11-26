const { ResponseTemplate } = require('../helpers/resp.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient


async function ListUsers(req, res) {
    const { name, email, password } = req.query

    const payload = {}

    if (name || email || password) {
        payload.name = name,
            payload.email = email,
            payload.password = password
    }

    try {
        const users = await prisma.users.findMany({
            where: payload,
            select: {
                name: true,
                dob: true,
                age: true,
                profile_picture: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true
            }, orderBy: {
                name: 'asc'
            }
        })

        let response = ResponseTemplate(users, 'success', null, 200)
        return res.status(200).json(response)
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500)
        return res.status(500).json(response)
    }
}

async function ViewProfile(req, res) {

    const { id } = req.params

    try {
        const checkName = await prisma.users.findUnique({ where: id })

        if (!checkName) {
            return res.status(404).json({
                message: 'not found',
                status: 404
            })
        }

        const viewProfile = await prisma.users.findUnique({
            where: id,
            select: {
                name: true,
                profile_picture: true,
                dob: true,
                age: true,
                createdAt: true,
                updatedAt: true
            }
        })
        let response = ResponseTemplate(viewProfile, 'success', null, 200)
        return res.status(200).json(response)
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500)
        return res.status(500).json(response)
    }
}

async function ChangePhoto(req, res) {

    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    try {
        const changePhoto = await prisma.users.update({
            where: { id: req.users.id },
            data: { profile_picture: imageUrl },
            select: {
                id: true,
                profile_picture: true,
                name: true,
                updatedAt: true
            }
        })
        let response = ResponseTemplate(changePhoto, 'success', null, 200)
        return res.status(200).json(response)
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500)
        return res.status(500).json(response)
    }
}

async function DeleteUser(req, res) {

    const { id } = req.params

    try {
        checkUser = await prisma.users.findUnique({
            where: {id}
        })

        if (!checkUser) {
            return res.status(404).json({
                message: 'not found',
                status: 404
            })
        }

        await prisma.users.delete({
            where: {id}
        })

        return res.status(200).json({
            message: 'success',
            status: 200
        })
    } catch (error) {
        console.log(error)
        let response = ResponseTemplate(null, 'internal server error', error, 500)
        return res.status(500).json(response)
    }
}



module.exports = {
    ListUsers,
    ViewProfile,
    ChangePhoto,
    DeleteUser
}