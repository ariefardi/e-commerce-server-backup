var express = require('express');
var router = express.Router();
const Controller = require(`../controllers/controller-user`)

/* GET users listing. */
router.get('/', Controller.getPost);

router.post('/signup',Controller.signUp)
router.post('/login',Controller.login)

module.exports = router;
  