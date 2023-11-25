const router = require('express').Router()
const { Register, Login} = require('../../controllers/auth/auth.controller')
const { CheckRegister } = require('../../middleware/middleware')

router.post('/register', CheckRegister, Register)

module.exports = router