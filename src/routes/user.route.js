const router = require('express').Router()
const { ListUsers, ViewProfile, ChangePhoto, DeleteUser } = require('../controllers/user.controller')
const storage = require('../libs/multer')
const { Authenticate } = require('../middleware/restrict')

router.get('/', ListUsers)
router.get('/:id', ViewProfile)
router.delete('/delete/:id', DeleteUser)
router.post('/change-photo', Authenticate, storage.image.single('image'), ChangePhoto)

module.exports = router