const express = require('express')
const router = express.Router()
const { ActivateAccount } = require('../controllers/activation.controller')

router.get('/:id', ActivateAccount)

module.exports = router