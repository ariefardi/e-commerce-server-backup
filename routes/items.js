const express = require('express')
const router = express.Router()
const itemController = require('../controllers/controller-item')

router.get('/',itemController.getItem)
router.post('/',itemController.postItem)
router.delete('/delete/:id',itemController.deleteItem)
module.exports = router