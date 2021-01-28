const express = require('express');
const router = express.Router();

const { userController } = require('../../controllers');

router.post('/signin', userController.signin);
router.post('/signup', userController.signup);
router.post('/signout', userController.signout);
router.get('/info', userController.info);

module.exports = router;
