const express = require('express');
const signupHandler = require('../lib/controllers/signupHandler');
const loginHandler = require('../lib/controllers/loginHandler');
const dashDataHandler = require('../lib/controllers/dashDataHandler');
const requestHandlers = require('./requestHandlers');

const router = express.Router();


router.post('/signup', signupHandler);

router.get('/login', loginHandler);
router.post('/lostitem', requestHandlers.postLostItem);
router.post('/founditem', requestHandlers.postFoundItem);

router.get('/status', requestHandlers.getStatus);

// router.post('/messages', requestHandlers.postMessages);
// router.get('/messages', requestHandlers.getMessages);

// router.get('/matches', requestHandlers.getMatches);

router.get('/dashdata', dashDataHandler);

module.exports.router = router;
