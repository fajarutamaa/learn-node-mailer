const router = require('express').Router()
const morgan = require('morgan')
const authRoute = require('./auth/auth.route')
const userRoute = require('./user.route')
const activationRoute = require('./activation.route')

router.use(morgan('dev'))

router.use('/auth', authRoute)
router.use('/users', userRoute)
router.use('/activation', activationRoute)

module.exports = router