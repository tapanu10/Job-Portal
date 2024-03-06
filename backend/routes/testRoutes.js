const express = require('express');
const testPostController = require('../controllers/testController.js');
const userAuth = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/test-post',userAuth, testPostController);

module.exports = router;