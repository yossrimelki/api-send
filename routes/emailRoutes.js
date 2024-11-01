const express = require('express');
const {sendReclamation} = require('../controllers/emailController');
const router = express.Router();

// Define routes for email sending
router.post('/sendr', sendReclamation);


module.exports = router;
