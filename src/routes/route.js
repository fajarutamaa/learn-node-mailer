const router = require('express').Router()
const morgan = require('morgan')
const authRoute = require('./auth/auth.route')

router.use(morgan('dev'))

router.use('/auth', authRoute)


module.exports = router